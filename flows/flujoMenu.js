const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoMenu = addKeyword(EVENTS.ACTION)
    .addAnswer('Elige una de estas opciones')
    .addAnswer(`→ Nuestros Servicios 📊 - Escribe *servicios*
→ Más sobre nosotros 🌐- Escribe *información*
→ Ver Demo 🎥 - Escribe *demo*
→ Guía de Chatbots 📚 - Escribe *guía*
→ Agendar Llamada 📅 - Escribe *agendar*
→ Hablar con Asesor 👤 -Escribe *asesor*`, null, async (ctx, ctxFn) => {
        await ctxFn.state.update({answers: []})
        
        return ctxFn.endFlow()

    })

module.exports = flujoMenu
