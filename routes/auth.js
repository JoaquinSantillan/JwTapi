const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('./validate-token')

//validations
const joi = require('@hapi/joi')
const schemaRegister = joi.object({
    name: joi.string().min(6).max(25).required(),
    email:joi.string().min(6).max(25).required().email(),
    password:joi.string().min(6).max(25).required(),
    role:joi.string()
})

const schemaLogin = joi.object({
    email:joi.string().min(6).max(25).required().email(),
    password:joi.string().min(6).max(25).required()
})

//route login
router.post('/login',async(req,res)=>{
    //validate fields email and password
    const {error} = schemaLogin.validate(req.body);
    if(error){
        return res.status(400).json({
            error:error.details[0].message
        })
    }

    const user = await User.findOne({email:req.body.email})

    if(!user){
        return res.status(400).json({
            error:'credentials not valid'
        })
    }

    const validatePassword = await bcrypt.compare(req.body.password,user.password)
    if(!validatePassword){
        return res.status(400).json({
            error:'credentials not valid'
        })
    }

    //create token
    const token = jwt.sign({
        name:user.name,
        id:user._id
    },process.env.TOKEN_SECRET)

    res.header('auth-token',token).json({
        error:null,
        data:{token}
    })
})


//route register
router.post('/register',async(req,res)=>{

    //validating that the fields are not empty and that they comply with the schema
    const {error} = schemaRegister.validate(req.body)

    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    //search credentials
    const uniqueEmail = await User.findOne({email:req.body.email})
    const uniqueName = await User.findOne({name:req.body.name})
    const alReadyExistAdminRole = await User.findOne({role:req.body.role})

    //validations unique credentials

    if(alReadyExistAdminRole === 'ADMIN_ROLE'){
        return res.status(400).json({
            error: true,message:'admin role already exist sorry :<'
        })
    }

    if(uniqueEmail){
        return res.status(400).json({
            error: true,message:'email or password al ready register'
        })
    }

    if(uniqueName){
        return res.status(400).json({
            error:true,message:'email or password al ready register'
        })
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password,salt)

    //catch credentials after validate unique credentials or that they comply with the schema
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password,
        role:req.body.role
    })

    try{
        const userDb = await user.save()
        res.json({
            error:null,
            data:userDb
        })

    }catch(error){
        res.status(400).json(error).redirect('/home')
    }

})

router.get('/home',async(req,res)=>{
    res.json({
        error:null,
        message:'Home'
    })
})

module.exports = router;