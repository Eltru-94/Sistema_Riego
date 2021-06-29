const bcryp=require('bcryptjs');
const helpers={};
helpers.cifrarclave = async(password)=>{
    const salt=await bcryp.genSalt(10);
    const hash=await bcryp.hash(password,salt);
    return hash;
};

helpers.comprarclave=async(password,savedPassword)=>{
    try{
        return await bcryp.compare(password,savedPassword);
    }catch(e){
        console.log(e);
    }
 
};


module.exports=helpers;