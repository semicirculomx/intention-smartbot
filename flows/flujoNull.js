const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoNull = addKeyword(EVENTS.ACTION)
    .addAnswer('🔙 ¿Quieres volver al *menú de opciones*?')
    .addAnswer('Puedes escribir *menu* en cualquier momento o escríbeme tus dudas. Estoy aquí para ayudarte. 😊', null, async (ctx, ctxFn) => {
        await ctxFn.state.update({answers: [], currentIntention: ''})
        return ctxFn.endFlow()
    })

module.exports = flujoNull