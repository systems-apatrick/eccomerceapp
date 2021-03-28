import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/user.js'
import prodcuts from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/database.js'

dotenv.config()
connectDB()
const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = prodcuts.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts)
    console.log(`Imporatacion de datos  correctamente`.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`Error ${error}`.red.inverse)
    process.exit(1)
  }
}

const destroytData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log(`Eliminación de datos correctamente`.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`Error ${error.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroytData()
} else {
  importData()
}
