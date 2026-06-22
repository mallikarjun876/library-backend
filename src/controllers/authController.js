const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => { try { const { username, password } = req.body; const hashedPassword = await bcrypt.hash(password, 10); const newUser = new User({ username, password: hashedPassword }); await newUser.save(); res.status(201).json({ message: "User registered successfully" }); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.login = async (req, res) => { try { const { username, password } = req.body; const user = await User.findOne({ username }); if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: "Invalid credentials" }); const token = jwt.sign({ userId: user._id }, "SUPER_SECRET_KEY", { expiresIn: "1h" }); res.status(200).json({ message: "Login successful", token }); } catch (e) { res.status(500).json({ error: e.message }); } };
