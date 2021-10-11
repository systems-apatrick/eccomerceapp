import cloudinary from "cloudinary";
const connectCloudinary = async () => {
  try {
    const conn = await cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    console.log(conn);
    console.log(`Conectado a Cloudinary:  ${conn}`.cyan.underline);
    return cloudinary;
  } catch (error) {
    console.error(
      `Error en conexion: a Cloudinary: ${error.message}`.red.underline.bold
    );
    process.exit(1);
  }
};

export default connectCloudinary;
