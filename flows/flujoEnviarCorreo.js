const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");
const mailer = require("./mailer");

const flujoEnviarCorreo = addKeyword(EVENTS.ACTION)
.addAnswer('Estamos enviando tu correo...', null, async (ctx, { state, flowDynamic, fallBack, endFlow }) => {

    const correo = state.getMyState()?.email

    if(correo){
      await mailer.enviarSaludo(correo)
      await flowDynamic([{body: `Tu correo fue enviado correctamente! revisa tu bandeja de entrada`}])
      console.log('correo enviado')
    }
    // Verificar si los datos son correctos y actuar en consecuencia
    await state.update({ currentIntention: '', answers: []})
    return endFlow()
  });

module.exports = flujoEnviarCorreo