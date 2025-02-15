const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    // Delete all existing documents in the Listing collection
    await Listing.deleteMany({});

    // Modify the initData array by adding an owner field to each object
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "67a334b7b49fc344cdca9f6a" }));

    // Insert the modified data into the database
    await Listing.insertMany(initData.data);

    console.log("Data was initialized successfully");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDB();
