const bodyParser = require('body-parser');
const express=require('express');
const dbconnect = require('./config/database');
const { boTfound, errorhandler } = require('./middleware/errormid');
const app=express();
const port=3000|| process.env.PORT;
const CrmRoute = require("./Route/CrmRoute")
const dotenv=require('dotenv').config();
const cookieParser=require("cookie-parser");
const morgan = require('morgan');
dbconnect()



app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());

app.use("/api/crm",CrmRoute);




app.use(boTfound);
app.use(errorhandler)




app.listen(port,()=>{console.log(`listening port ${port}`)});
