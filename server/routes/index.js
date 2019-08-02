const express = require('express')
const router = express.Router()
const {Pool,Query} = require('pg')
const path = require('path')
var config=require('../../config.json')


const connectionString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+":"+config.postgres.port+"/"+config.postgres.database
pool= new Pool({
  connectionString:connectionString
})
 router.post('/post/student',(req,res,next) =>{
  pool.connect((err,client,release) =>{
    
    let query= `INSERT INTO public.api (id,fname,lname,mail,number) VALUES ('${req.body.id}','${req.body.fname}','${req.body.lname}','${req.body.email}','${req.body.number}')`;
    console.log(query)
     client.query(query,(err,result) =>{
         if(err){
           throw err;
         }
        release();
       if(result && result.rows){
  
         res.send(result)
         
       }
     })
     nodemailer.createTestAccount((err,account)=>{
      const bodyMsg = `
      <h3>Tally New request</h3>
         <ul>
             <li>First Name: ${req.body.fname}</li>
             <li>Last Name: ${req.body.lname}</li>
             <li>Email: ${req.body.email}</li>
             <li>Mobile Number: ${req.body.number}</li>
            
         </ul>
      `


      let transporter = nodemailer.createTransport({
       host: 'smtp.ionos.com',
       port: 25,
       secure: false, 
       auth: {
           user: process.env.EMAIL,
           pass: process.env.PASSWORD
       },
       tls:{
         rejectUnauthorized:false
       }
     });
  
    
     let mailOptions = {
         from: '"Contact us " <xyz@visertechnosys.com>', 
         to: 'vineet@visertechnosys.com', 
         subject: 'New report', 
         text: 'New Tally Course request', 
         html: bodyMsg 
     };
  
     
     transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
             return console.log(error);
         }
         console.log('Message sent: %s', info.messageId);   
         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
     });
   })
 })
})

router.get('/get/student', (req, res, next) => {
  const results = [];
 
  pool.connect((err, client) => {
    if(err) {
  
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    const query = client.query(new Query(`SELECT * FROM student`));
   
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
  
      return res.json(results);
    });
  });
});

  

   router.get('/', (req, res, next) => {
     res.sendFile(path.join(
        __dirname, '..', 'public','index.html'));
    });

  module.exports = router;