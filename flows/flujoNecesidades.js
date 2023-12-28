const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flujoNecesidades = addKeyword(EVENTS.ACTION)
    .addAnswer([`🚀 Podemos crear exactamente lo que necesitas:

*Gestión de Pedidos 📦:* Automatización desde recepción hasta seguimiento 
*Atención al Cliente 💬:* Chatbot para soporte eficiente 
*Marketing y Promociones 🎯:* Potencia tus campañas `])
    .addAnswer(['Si tienes otra consulta o quieres ver más opciones, escribe *Menú* para regresar al menú principal. 🙂'], null, async (ctx, ctxFn) => {
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
