const nodemailer = require('nodemailer');
const saludoTemplate = require('../email-templates/saludo');
  
module.exports = { enviarSaludo: async function(to) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'mail.semicirculo.com',
        port: 465,
        auth: {
          user: 'asistente@semicirculo.com',
          pass: 'asistentesemicirculo.2023',
        },
      });
      const mailOptions = {
        from: 'Semicirculo Digital',
        to: to,
        subject: '¡Gracias por contactarnos!',
        html: saludoTemplate,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.response);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
}