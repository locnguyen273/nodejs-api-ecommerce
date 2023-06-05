const { default: mongoose } = require("mongoose");

mongoose.set("strictQuery", false);
const dbConnect = () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");
    return connect;
  } catch (error) {
    console.log("Database error");
  }
};

module.exports = dbConnect;
