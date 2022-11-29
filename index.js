const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors')

const app = express();

//catching body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

//conection data bases
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.95sfmju.mongodb.net/${process.env.DBNAME}`
mongoose.connect(uri,{
    useNewUrlParser:true,useUnifiedTopology:true
})
    .then(()=> console.log('data bases conect'))
    .catch(e=> console.log('error db',e));


//import routes
const autRouter = require('./routes/auth')

const verifyToken  = require('./routes/validate-token')
const admin = require('./routes/admin')

//routes middlewares
app.use('/api/user',autRouter);
app.use('/api/admin',verifyToken,admin)
app.get('/',(req,res)=>{
    res.json({
        status:200,
        message:'this is ok'
    })
});

//init server
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`server in port ${PORT}`);
});