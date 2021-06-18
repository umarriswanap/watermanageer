const firebase = require('firebase');

module.exports.get_login = (req,res) => {
    res.render('userlogin');
    //console.log(firebase.auth().currentUser.uid)
}

module.exports.get_register = (req,res) => {
    res.render('userreg')
}

module.exports.signout = (req,res) =>{
  firebase.auth().signOut().then(()=>{
    res.redirect('/userlogin');
  })
}

//post register = creates a new user
module.exports.post_register = (req,res) => {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    firebase.firestore().collection('users').doc(userCredential.user.email).get().then((docSnap)=>{
      if(docSnap.exists){
        firebase.firestore().collection('users').doc(userCredential.user.email)
        .update({
          job_count:firebase.firestore.FieldValue.increment(1)
        })
      }
      else{
          firebase.firestore().collection('users').doc(userCredential.user.email).set({email:userCredential.user.email,userType:0,username:req.body.username,active:0,rtype:'new job',job_count:0,phone:req.body.phone});
      }
    })
  })
    res.redirect('/waterreg');
}




//post login = logs in with email and password
module.exports.post_login = async (req,res) => {
firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((userCredential)=>{
  firebase.firestore().collection('users').doc(userCredential.user.email).get().then((val)=>{
    res.redirect('/waterreg')
  })

    })
    
  }

  module.exports.displayUserView =async (req,res) => {
    const val1=await firebase.auth().currentUser.email;
    await firebase.firestore().collection('users').doc(val1).get().then(async(val3)=>{
      if(val3.data().email!=null){
          await firebase.firestore().collection('waterregistration').where('email','==',val1).get().then(async(val2)=>{
            res.render('userview',{val2,val3})
            console.log(val2.data().number)
          })
      }
    });
}









module.exports.post_forgotpassword=(req,res)=>{
  var auth=firebase.auth()
  var email=req.body.email
  if(email!=""){
    auth.sendPasswordResetEmail(email).then(function(){
   console.log('email has send to the mail account')
    }).catch(function(error){
      console.log(error)
    })
  }else{
   console.log("please type your email first!!!")
  }
  
}
module.exports.get_forgotpassword=(req,res)=>{
  res.render('forgot_password')
}


module.exports.waterreg=(req,res)=>{
  res.render('reg')
}
module.exports.postwaterreg=async (req,res)=>{
  const currentuser = await firebase.auth().currentUser
  await firebase.firestore().collection('waterregistration').add({address:req.body.address,number:req.body.number,email:currentuser.email,waterused:req.body.waterused,state:req.body.state,pin:req.body.pin})
  .then((data)=>{
    res.redirect('/userview');
 })
    

}

