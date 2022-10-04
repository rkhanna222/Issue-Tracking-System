import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs  from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const sendEmail = (email, subject, payload, template) => {
console.log("sendEmail");

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      protocol: 'http',
      auth : {
      user: "huskiesneuinfo6150@gmail.com",
      pass: "Huskies@2022",
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    let options = {
        from: "huskiesneuinfo6150@gmail.com",
        to: email,
        subject:subject,
        html: compiledTemplate(payload)
      };

    // Send email
    transporter.sendMail(options, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
  
  }

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

 export default sendEmail;