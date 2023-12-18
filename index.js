import dotenv from "dotenv";
import { app } from "./app";

dotenv.config({
  path: "./.env",
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
