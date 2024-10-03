import mongoose from "mongoose";

export default function connectDB() {
  const url =  process.env.DB_URL;

  try {
    mongoose.connect(url);   
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => {
    console.log(`Databasee connected:${url}`);
  });

  dbConnection.on("error", (error) => {
    console.error(`Connection error ${error}`);
  });
}
