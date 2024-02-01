import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userAuthRouter } from "./routes/authRoutes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/userauth", userAuthRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `[server]: Server is running at http://localhost:${
      process.env.PORT || 3000
    }`
  );
});
