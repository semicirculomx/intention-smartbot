const nodemailer = require('nodemailer');
const saludoTemplate = require('../email-templates/saludo');
  
module.exports = { enviarSaludo: async function(to) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'mail.semicirculo.com',
        port: 465,
        auth: {
          user: 'srvr@semicirculo.com',
          pass: 'semicirculo.2023',
        },
	secure: true,
      });
      const mailOptions = {
        from: '"Semicirculo Digital, asistente@semicirculo.com"',
        to: to,
        subject: '¡Gracias por contactarnos!',
        html: saludoTemplate,
      };
      const info =  await transporter.sendMail(mailOptions);
	return info
      console.log('Correo enviado:', info.response);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
}
