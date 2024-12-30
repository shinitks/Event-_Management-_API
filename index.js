const express=require('express');
const app=express();
const fs=require('fs');
const eventsRouter=require('./Routes/eventsRouter.js');
 

app.use(express.json());

app.use('/api/events',eventsRouter);

app.all('*',(req,res,next)=>{
// res.status(404).json({
//     status:'fail',
//     message:`can't find ${req.originalUrl} on the server!`
// });
const err=new Error(`can't find ${req.originalUrl} on the server!`);
err.status='fail';
err.statusCode=404;
next(err);

});

app.use((error,req,res,next)=>{
    error.statusCode=error.statusCode||500;
    error.status=error.status||'error';
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message
    });
});

module.exports=app;