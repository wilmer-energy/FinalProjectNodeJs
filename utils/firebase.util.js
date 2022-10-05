const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

// Model
const { ProductImg } = require("../models/productImgs.model");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// Storage service
const storage = getStorage(firebaseApp);

let dataImgs = [];


const uploadProductImgs = async (imgs, productId) => {
  // Map async -> Async operations with arrays
  const imgsPromises = imgs.map(async (img) => {
    // Create firebase reference
    const [originalName, ext] = img.originalname.split("."); // -> [pug, jpg]

    const filename = `products/${productId}/${originalName}-${Date.now()}.${ext}`;
    const imgRef = ref(storage, filename);

    // Upload image to Firebase
    const result = await uploadBytes(imgRef, img.buffer);

    dataImgs.push(
      await ProductImg.create({
        productId,
        imgUrl: result.metadata.fullPath,
      })
    );

    return result;
  });

   await Promise.all(imgsPromises);
   return dataImgs
};

const getProductImgsUrls = async (posts) => {
  // Loop through posts to get to the postImgs
  const postsWithImgsPromises = posts.map(async (post) => {
    // Get imgs URLs
    const postImgsPromises = post.postImgs.map(async (postImg) => {
      const imgRef = ref(storage, postImg.imgUrl);
      const imgUrl = await getDownloadURL(imgRef);

      postImg.imgUrl = imgUrl;
      return postImg;
    });

    // Resolve imgs urls
    const postImgs = await Promise.all(postImgsPromises);

    // Update old postImgs array with new array
    post.postImgs = postImgs;
    return post;
  });

  return await Promise.all(postsWithImgsPromises);
};

module.exports = { storage, uploadProductImgs, getProductImgsUrls};
//, getPostsImgsUrls