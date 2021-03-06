import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Conectado a MongoDB: ${conn.connection.host}`.cyan.underline);
    return { mongodb: "conectado" };
  } catch (error) {
    console.error(`Error en conexion: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
