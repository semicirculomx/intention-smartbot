const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");
const mailer = require("./mailer");

const flujoEnviarCorreo = addKeyword(EVENTS.ACTION)
.addAction(async (ctx, { state, flowDynamic, fallBack, endFlow }) => {

    const correo = state.getMyState()?.email

    if(correo){
      await mailer.enviarSaludo(correo)
      await flowDynamic([{body: `Gracias por ponerte en contacto 🙂, Revisa tu correo 📥, estamos a tu disposición para cualquier duda!`}])
      console.log('correo enviado')
    }
    // Verificar si los datos son correctos y actuar en consecuencia
    await state.update({ currentIntention: '', answers: []})
    return endFlow()
  });

module.exports = flujoEnviarCorreo
