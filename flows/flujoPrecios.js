const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoPrecios = addKeyword(EVENTS.ACTION)
    .addAnswer(`Los *precios* y *paquetes de chatbots* varían según las funciones y características que necesites 💰`)
.addAnswer([`Depende mucho del nivel de *requerimientos* que quiera resolver para tu caso en específico.

Actualmente manejamos soluciones desde *💲799mxn* hasta *💲23.999mxn* al mes`])
    .addAnswer([`Igual, si gustas podemos organizar una *llamada rápida*. O también podemos regresar al *menú de opciones*`,
`¿Dime como te puedo ayudar? 🤔`], null, async (ctx, ctxFn) => {
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