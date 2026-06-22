const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bookRoutes = require("./src/routes/bookRoutes");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
async function startServer() { try { const { MongoMemoryServer } = require("mongodb-memory-server"); const mongoServer = await MongoMemoryServer.create(); const localUri = mongoServer.getUri(); await mongoose.connect(localUri); console.log("Local MongoDB Server Started Automatically!"); } catch (err) { console.log("DB Error: ", err); } app.use("/api/books", bookRoutes); app.get("/", (req, res) => res.json({ message: "Library DB Connected API is online." })); app.listen(PORT, () => console.log(`Server running smoothly on port ` + PORT)); }
startServer();
