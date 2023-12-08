const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");


const flujoNecesidades = addKeyword(EVENTS.ACTION)
    .addAnswer(['Manejamos varias formas de darte solución a ese tipo de *servicios*'])
    .addAnswer(['🌟 pero dependerá de tus objetivos y necesidades específicas'])
    .addAnswer(['Te puedo dar los *precios* base que tenemos 💰'])
    .addAnswer(['¿Te interesaría o prefieres organizar una *llamada*? 📞'], null, async (ctx, ctxFn) => {
      const intenciones = await ctxFn.state.getMyState()?.intenciones || [];
      const intencionRepetida = await intenciones.find((intencion) => (intencion === 'necesidades'));
      if(!intencionRepetida) {
              intenciones.push('necesidades')
              await ctxFn.state.update({intenciones})
      }
      await ctxFn.state.update({answers: []})
      return ctxFn.endFlow()

    })

module.exports = flujoNecesidades