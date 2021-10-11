import path from "path";
import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs-extra";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      public_id: `eccommerce/images/${req.file.filename}`,
    });
    const image = result.url;
    //  fsunlink(req.file.path);
    await fs.unlink(req.file.path, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log("File deleted!");
    });
    console.log("Se subio correctamente la imagen ");
    console.log(image);
    res.send(image);
  } catch (error) {
    console.log("No se pudo subir las imagen: ", error);
    res.status(404);
    // res.send(null);
    throw new Error("No se pudo  subir la imagen ");
  }
});

export default router;
