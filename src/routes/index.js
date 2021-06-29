const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
   res.render('ini/index');
   
});

router.get('/Informacion',(req,res)=>{
   res.render('ini/Informacion');
   
});


module.exports=router;