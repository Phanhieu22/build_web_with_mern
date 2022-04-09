require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const cors = require("cors");

// kết nối với db mongoose
const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mernproject.8ipni.mongodb.net/mernProject?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connect to data base connected");
  } catch (error) {
    console.log(error.message);
  }
};
connectDb();
// thiết lập server
app.use(express.json());
app.use(cors());

// routers
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

app.listen(PORT, () => {
  console.log("server start on port " + PORT);
});
