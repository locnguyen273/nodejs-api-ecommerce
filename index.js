const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const PORT = process.env.PORT;

//import routes
const blogCategoryRouter = require("./routes/blogCatRoute");

const app = express();
dbConnect();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodeJS API for Project",
      version: "1.0.0"
    },
    servers: [
      { url: "http://localhost:5000/" }
    ]
  },
  apis: ["./index.js"]
}

app.use(morgan("dev"));
app.use(cors({
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/blog-category", blogCategoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
