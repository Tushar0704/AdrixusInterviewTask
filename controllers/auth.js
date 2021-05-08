const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
    //res.send("Register Route");
    const {firstname, lastname, email, password} = req.body;

    try{
        const user = await User.create({
            firstname,
            lastname,
            email, 
            password,
        });

        sendToken(user, 201, res);
    }catch(error){
        next(error);
    }
};

exports.login = async (req, res, next) => {
    //res.send("Login Route");
    const {email, password} = req.body;

    if(!email || !password){
       // res.status(400).json({success: false, error: "Please provide username and password"});
       return next(new ErrorResponse("Please provide username and password", 400));
    }

    try {
        const user = await User.findOne({email}).select("+password");
        if(!user){
            //res.status(401).json({success: false, error: "Invalid credentails"});
            return next(new ErrorResponse("Invalid credentails", 401));
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            //res.status(401).json({success: false, error: "Invalid Credentails"});
            return next(new ErrorResponse("Invalid credentails", 401));
        }
        sendToken(user, 200, res);
        /*res.status(200).json({
            success: true,
            token: "bh2kb4bklb",
        });*/
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({success: true, token});
};