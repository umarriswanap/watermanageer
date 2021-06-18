const firebase = require('firebase');


module.exports.get_admin_login=(req,res)=>{
    res.render('adminlogin')
   }
   
module.exports.post_admin_login=async (req,res)=>{

  if(req.body.email=='admin@gmail.com'& req.body.password=='111111'){
    res.render('adminvaluechangepage')
  }
   }

  module.exports.valueset=(req,res)=>{
    res.send('value updated succesfully')
  }
   


  






