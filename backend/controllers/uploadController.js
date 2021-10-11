import asyncHandler from "express-async-handler";
// @route   GET /api/products
// @access  Public
const uploadData = (req, res) => {
  console.log("req.data");
  console.log(req.data);
  res.json({ datos: "Lego aqui " });
};

export default uploadData;
