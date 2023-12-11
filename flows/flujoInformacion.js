const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoInformacion = addKeyword(EVENTS.ACTION)
    .addAnswer('💬 Te platico, nosotros vendemos chatbots personalizados para WhatsApp, diseñados para satisfacer tus necesidades específicas')
    .addAnswer('😃 Me encantaría conocer más sobre tu negocio. Cuéntame un poco de lo que buscas?', null, async (ctx, ctxFn) => {
        const intenciones = await ctxFn.state.getMyState()?.intenciones || [];
        const intencionRepetida = intenciones.find((intencion) => (intencion === 'informacion'));
        if(!intencionRepetida) {
                intenciones.push('informacion')
                await ctxFn.state.update({intenciones})
        }
        return ctxFn.endFlow()

    })

module.exports = flujoInformacion