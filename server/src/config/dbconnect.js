const { default: mongoose } = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn.connection.readyState === 1) {
      console.log("db conn success");
    } else {
      console.log("fail to conn");
    }
  } catch (error) {
    console.log("db connection is failed ");
    throw new Error(error);
  }
};

module.exports = dbConnect;
