const {addKeyword, EVENTS} = require("@bot-whatsapp/bot");
const delay = require("../utils");

const flowStarter = addKeyword(EVENTS.ACTION)
.addAction(async (ctx, {state, provider}) => {
        console.log('starter')
        await state.update({ botOn: 'false' })
})
.addAnswer(`¡Hola! 👋 Soy un Bot Asistente de Semicirculo, gracias por contactarnos!
Puedes dejar tus dudas por mensaje. O si prefieres hablar con un asesor, escribe *agente*`)
.addAnswer([
  'Dime, en qué te puedo ayudar? 😃',
])

 module.exports = flowStarter
