import express from "express";
import initizalize from "./app.js"

const app = express();
const port = 3001;
initizalize(app);

app.listen(port, () => console.log(`Server is listening at port ${port}`));