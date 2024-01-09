const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoMenu = addKeyword(EVENTS.ACTION)
    .addAnswer('🤖... Elige una de estas opciones:')
    .addAnswer(`*→* Nuestros Servicios 📊
*→* Sobre nosotros 🌐
*→* Ver Demo 🎥
*→* Guía de Chatbots 📚
*→* Agendar Llamada 📅
*→* Costos y Precios 💲
*→* Hablar con Asesor 👤`, null, async (ctx, ctxFn) => {
        await ctxFn.state.update({answers: []})
        
        return ctxFn.endFlow()

    })

module.exports = flujoMenu
