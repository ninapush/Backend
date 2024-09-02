const User = require('../../models/User');
const get = async (req, res) => {
    try {
        const {id} = req.user;
        const Users = await User.findById(id).select("-password");
        delete Users.password
        res.send(Users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.user;
        const { fullName } = req.body;
        const updateData = {fullName};
        if(req.file){
            updateData.profileImage = req.file ? "/public/"+req.file.filename : "";
        }
        const user = await User.findByIdAndUpdate(id, updateData);
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    get, update
}