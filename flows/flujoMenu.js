const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoMenu = addKeyword(EVENTS.ACTION)
    .addAnswer('Elige una de estas opciones..')
    .addAnswer(`→ Nuestros Servicios 📊 - *servicios*
→ Sobre nosotros 🌐- *información*
→ Ver Demo 🎥 - *demo*
→ Guía de Chatbots 📚 - *guía*
→ Agendar Llamada 📅 - *agendar*
→ Hablar con Asesor 👤 - *asesor*`, null, async (ctx, ctxFn) => {
        await ctxFn.state.update({answers: []})
        
        return ctxFn.endFlow()

    })

module.exports = flujoMenu
