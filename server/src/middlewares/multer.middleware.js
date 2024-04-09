import multer from "multer";

//This is a middleware to extract the file from the req.body
//And save into the public folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//export ing storage fuc that can take a image form the req.body
export const upload = multer({
  storage,
});
