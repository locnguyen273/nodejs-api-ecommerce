const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

//import routes
const blogCategoryRouter = require("./routes/blogCategoryRoute");
const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const couponRouter = require("./routes/couponRoute");
const enquireRouter = require("./routes/enquiryRoute");
const productCategoryRouter = require("./routes/productCategoryRoute");
const productRouter = require("./routes/productRoute");
const uploadRouter = require("./routes/uploadRoute");

const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/product-category", productCategoryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blog-category", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enquireRouter);
app.use("/api/upload", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
