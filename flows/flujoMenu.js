const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoMenu = addKeyword(EVENTS.ACTION)
    .addAnswer(`- *Menú Principal* -
Elige una de las siguientes opciones:

📞 Llamada - Si deseas agendar o reagendar una llamada rápida
👩‍💼 Agente - Si prefieres hablar con un asesor humano
📋 Menu - Para volver a este menú en cualquier momento
📜 Guía - Si quieres el link de Notion para nuestra Guía 
- Demo smartbot - Si quieres probar un chat con inteligencia artificial
*Reiniciar* - para reiniciar el bot`, null, async (ctx, ctxFn) => {
        await ctxFn.state.update({answers: []})
        
        return ctxFn.endFlow()

    })

module.exports = flujoMenu