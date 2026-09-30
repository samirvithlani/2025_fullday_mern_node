const path = require("path");
const mailer = require("nodemailer");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mailSend  = async(to,subject,text)=>{

    const transport = mailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }        
    })
    const mailOptions={
        from:process.env.EMAIL,
        to:to,
        subject:subject,
        text:text
    }

    const mailresponse = await transport.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
}
//mailSend("samir.vithlani83955@gmail.com","test mail","welcome...")
module.exports = mailSend