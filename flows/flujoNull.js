const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoNull = addKeyword(EVENTS.ACTION)
    .addAnswer('🔙 ¿Quieres volver al *menú principal*?')
    .addAnswer('Puedes escribir *menu* en cualquier momento o *reiniciar* para empezar de nuevo. Estoy aquí para ayudarte. 😊', null, async (ctx, ctxFn) => {
        await ctxFn.state.update({answers: []})
        return ctxFn.endFlow()
    })

module.exports = flujoNull