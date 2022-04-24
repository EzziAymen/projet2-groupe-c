const express = require ('express');
const res = require('express/lib/response');
const nodemon = require('nodemon');
const app = express();
const NodeRSA = require('node-rsa');
var   nodemailer = require("nodemailer");
var bodyParser = require ("body-parser");
var superagent = require('superagent');
var peers = require("./peers");
const { json } = require('body-parser');


const PORT = process.env.PORT || 5000;

/***************************************************************************
 * Middlware
 ***************************************************************************/


app.use(express.static('publique'));
app.use(express.json());
app.use (bodyParser.json());



/*************************************************************
 * Encryptage et Decryptage
**************************************************************/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

let dbSecretKey = "";

resDecrypt = (message, key) => {
     keyPrivate = new NodeRSA(key);
     decrypt = keyPrivate.decrypt(message, 'utf8');
    return decrypt
}

rsaKeys = () => {
    const keys = new NodeRSA({b: 1024});
    const publicKey = keys.exportKey('public');
    const privateKey = keys.exportKey('private');
    return {
        
        publicKey: publicKey,
        privateKey: privateKey
    }
}


app.get('/keys', (req, res) => {
    const rsa = rsaKeys();
    dbSecretKey = rsa.privateKey
    res.status(201).json({
        package: rsa.publicKey
    })
})

app.put('/Envoyer', (req, res) => {
    const body = req.body;
    console.log(body.data);
    console.log(resDecrypt(body.data, dbSecretKey));
})

/**********************************************
 * Getletters
***********************************************/

var letters = {};
app.get("/getLetters", (req,res) => res.json( Object.values( letters ) ));

app.post("/addLetter", bodyParser.text(), (req,res) => {
  letters[req.body] = req.body;
  res.end();
} );


/******************************
 * FormData
*******************************/

app.get('/', (req, res)=>{   
    res.sendFile(__dirname +'/publique/courriel.html')
})

app.post('/',(req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          clientId: "000000000000-xxx.apps.googleusercontent.com",
          clientSecret: "XxxxxXXxX0xxxxxxxx0XXxX0",
        },
      });

    
    const mailOptions = {
        form: req.body.email,
        to: 'exemple@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
            
        }else{
            console.log('Envoyer: '+ info.response);
            res.send('success')
        }
    })
})

/***********************************************************************
 * Url Serveur (5000)
 ***********************************************************************/

app.listen(PORT, ()=>{
console.log(`serveur fonctionne sur le port ${PORT}`)
})




