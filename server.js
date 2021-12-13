require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const path = require("path");

connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1/posts", postRoutes);

if(process.env.MODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'client/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"client","build","index.html"));
    });
}else{
    app.get("/", (req, res)=>{
        res.send("Api running");
    });
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
