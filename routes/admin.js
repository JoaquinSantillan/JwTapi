const router = require('express').Router();
const User = require('../models/User')

router.get('/',(req,res)=>{


    res.json({
        error:null,
        data:{
            title:'mi ruta protegida',
            user:req.user
        }
    })
})

router.get('/allusers',async(req,res)=>{


        const allUsers = await User.find()
        res.status(200).json({
            error:null,
            data:{
                title:'all users',
                user:req.user,

                allUsers
            }
        })
    

})

router.delete('/delete/:id',async(req,res)=>{
    
    const datos = req.body.email
    const deleteUser = await User.findOne()
    const deleteExit = await deleteUser.deleteOne({email:datos})

    res.json({
        error:null,
        data:{
            title:'delete from admin',
            user:req.user,
            deleteExit
        }
    })
})

module.exports = router