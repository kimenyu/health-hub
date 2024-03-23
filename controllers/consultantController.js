const Consultant = require( '../models/consultants.js');

const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");
const emailValidator = require ("email-validator");

const dotenv = require("dotenv");

dotenv.config();

const jwtsecret = process.env.JWT_SECRET;

module.exports.createConsultant = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (!username || !email || !password) {
        return res.status(400).json({ error: "missing required parameters" });
      }
  
  
      if (!emailValidator.validate(email)) {
        return res.status(400).send({ error: "Invalid Email Address" });
      }
      const existingEmail = await prisma.admins.findUnique({
        where: {
          email: email,
        },
      });
  
      if (existingEmail) {
        return res.status(400).send({ error: "Email is already in use" });
      }
      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      //create admin user
      const newConsultant = new Consultant({
        username,
        email,
        password: hashedPassword,
      });

      const result = await newConsultant.save();
  
      
  
      return res
        .status(201)
        .json({
          msg: "Consultant created successfully",
          user: result
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

module.exports.loginConsultant = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ error: "missing required parameters" });
      }
      const consultant = await Consultant.findOne({ email });
      if (!consultant) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      const token = jwt.sign({ id: consultant._id }, jwtsecret, { expiresIn: "1h" });
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }