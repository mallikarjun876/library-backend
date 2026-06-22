const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bookRoutes = require("./src/routes/bookRoutes");
const authRoutes = require("./src/routes/authRoutes");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
async function startServer() { try { const { MongoMemoryServer } = require("mongodb-memory-server"); const mongoServer = await MongoMemoryServer.create(); const localUri = mongoServer.getUri(); await mongoose.connect(localUri); console.log("Secure Local Data Server Online!"); } catch (err) { console.log("DB Error: ", err); } app.use("/api/auth", authRoutes); app.use("/api/books", bookRoutes); app.get("/", (req, res) => res.json({ message: "Secure Library Management System API is live." })); app.listen(PORT, () => console.log(`Server running smoothly on port ` + PORT)); }
startServer();
