const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flujoNecesidades = addKeyword(EVENTS.ACTION)
    .addAnswer([`Podemos crear exactamente lo que necesitas 🚀

*Gestión de Pedidos 📦* - Automatización desde recepción hasta seguimiento 
*Atención al Cliente 💬* - Chatbot para soporte eficiente 
*Marketing y Promociones 🎯* - Impulsa tus ventas `])
    .addAnswer(['¿Quieres que te envie el menú de información? ¿O te gustaría agendar una llamada rápida? 🙂'], null, async (ctx, ctxFn) => {
      const intenciones = await ctxFn.state.getMyState()?.intenciones || [];
      const intencionRepetida = await intenciones.find((intencion) => (intencion === 'servicios'));
      if(!intencionRepetida) {
              intenciones.push('servicios')
              await ctxFn.state.update({intenciones})
      }
      await ctxFn.state.update({answers: []})
      return ctxFn.endFlow()

    })

module.exports = flujoNecesidades
