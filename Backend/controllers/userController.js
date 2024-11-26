const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')





module.exports.signup = async (req, res) => {
    console.log(req.body);
    try {
        const isExist = await userModel.findOne({ email: req.body.email });
        console.log(isExist);

        if (!isExist) {
            const adduser = new userModel(req.body)
            await adduser.save()
            res.status(200).json({ message: "user added", adduser })
        } else {
            res.status(409).json({ message: "user already exist" })
        }

    } catch (error) {
        res.status(409).json({ message: "user cannot added" })

    }

}



module.exports.login = async (req, res) => {
    try {
        const isExist = await userModel.findOne({ email: req.body.email });
        if (!isExist) {
            res.status(409).json({ message: "user not found" })

        } else {
            const isMatch = await bcrypt.compare(req.body.password, isExist.password)
            if (isMatch) {
                const token = jwt.sign({ id: isExist.id, role: isExist.role, username: isExist.username }, process.env.SECRET_KEY, { expiresIn: "1hr" });
                res.cookie('accessToken', token, { httponly: true, maxAge: 3600000 })
                res.status(200).json({ message: "invalid password" })
            }
        }


    } catch (error) {
        res.status(405).json({ message: "login failed" })

    }
}




module.exports.getAllUser = async (req, res, next) => {
    try {
        const users = await userModel.find();
        if (!users) {
            return res.status(404).json({ message: "Users not found" });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        return next(err);
    }
};





module.exports.protected = async (req, res) => {
    try {
        res.status(400).json({ message: `this is protected route ${req.user.username}` })

    } catch (error) {
        res.status(405).json({ message: "acces denied", Error: error })

    }
}