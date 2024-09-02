const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const bcryptjs = require('bcryptjs');
const jwt = require("jwt-simple");
const saltRounds = 12;
const JWT_SECRET = process.env.JWT_SECRET

const registration = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        let encryptedPassword = await bcryptjs.hash(password, saltRounds);
        const user = new User({
            email,
            password: encryptedPassword,
            fullName
        });
        const newUser = await user.save();
        let payload = {
            id: newUser.id,
            timestamp: new Date()
        };
        let token = jwt.encode(payload, JWT_SECRET);
        await UserSession.create({userId: user.id, token, status: 'active'});
        res.send({token});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send({message: 'Invalid email or password'});
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send({message: 'Invalid email or password'});
        }
        let payload = {
            id: user.id,
            timestamp: new Date()
        };
        let token = jwt.encode(payload, JWT_SECRET);
        await UserSession.create({userId: user.id, token, status: 'active'});
        res.send({message: 'Login success', token});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const signOut = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const userSession = await UserSession.findOne({token, status: 'active'});
        if(!userSession){
            return res.status(401).send({message: 'Unauthorized'});
        }
        await UserSession.findByIdAndUpdate(token, {status: 'inactive'});
        res.send({message: 'Sign out success'});
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const checkEmail = async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.json({ exists: true });
      }
      return res.json({ exists: false });
    } catch (error) {
      return res.status(500).json({ message: 'Error checking email: ' + error.message });
    }
  };

module.exports = { registration, login, signOut, checkEmail };