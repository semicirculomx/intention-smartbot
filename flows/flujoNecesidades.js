const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flujoNecesidades = addKeyword(EVENTS.ACTION)
    .addAnswer([`Nosotros ayudamos a *automatizar tareas* y brindar un *mejor servicio* a tus clientes usando *chatbots* de WhatsApp.`])
.addAnswer([`Algunas funcionalidades que podrías considerar son:

*Gestión de Pedidos 📦*:
Responder preguntas frecuentes sobre tus servicios y productos.

*Marketing y Promociones 🎯*:
Recopilar información de clientes potenciales para generar leads.

*Atención al Cliente 💬*:
Programar citas`])
    .addAnswer([`Puedo regresar al *menú de opciones* si me lo pides 🙂.
¿O dime cómo te puedo *ayudar* 😃 ?`], null, async (ctx, ctxFn) => {
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
