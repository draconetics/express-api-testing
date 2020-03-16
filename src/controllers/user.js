const User = require('../models/user');
const Car = require('../models/car');
module.exports = {
    index: async function(req, res, next){
        console.log("getting users.")
        const users = await User.find({});
        res.status(200).json(users);
    },

    newUser: async(req, res , next)=>{
        const newUser = new User(req.body);
        //console.log(newUser);
        const user = await newUser.save();
        res.status(200).json(user);

    },
    getUser: async function(req, res, next) {
        const {userId} = req.params;
        const user = await User.findById(userId);;
        res.status(200).json(user);
    },
    replaceUser: async(req, res, next)=>{
        const {userId} = req.params;
        const newUser = req.body;
        const oldUser = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true}); 
    },
    updateUser: async(req, res, next) => {
        const {userId} = req.params;
        const newUser = req.body;
        const oldUser = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true}); 
    },

    deleteUser: async(req, res, next) => {
        const {userId} = req.params;
        const message = await User.findByIdAndRemove(userId);
        res.status(200).json({success: true, message: message});
    },

    getUserCars: async(req, res, next) => {
        const {userId} = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user.cars);
    },
    newUserCar: async(req, res, next) => {
        const {userId} = req.params;
        const newCar = new Car(req.body);
        const user = await User.findById(userId);
        newCar.seller = user;
        await newCar.save();
        user.cars.push(newCar);
        await user.save();
        res.status(201).json(newCar);
    }
}