const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoPrecios = addKeyword(EVENTS.ACTION)
    .addAnswer('💼 Los tipos y precios de chatbots varían según las funciones y características que necesites')
    .addAnswer(['Depende mucho del nivel de requerimientos que quiera resolver para su caso en específico'])
    .addAnswer(['Tenemos soluciones desde *$899 al mes*'], null, async (ctx, ctxFn) => {
        const intenciones = await ctxFn.state.getMyState()?.intenciones || [];
        const intencionRepetida = intenciones.find((intencion) => (intencion === 'precios'));
        if(!intencionRepetida) {
            intenciones.push('precios')
            await ctxFn.state.update({intenciones})
        }
        await ctxFn.state.update({answers: []})
        return ctxFn.endFlow()


    })

module.exports = flujoPrecios