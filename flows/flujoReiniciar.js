const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoReiniciar = addKeyword(EVENTS.ACTION)
    .addAnswer(['🔙 REINICIANDO SESIÓN...'], null, async (ctx, ctxFn) => {
        await delay(2000)
        await ctxFn.state.update({botOn: 'true', currentIntention: '', intenciones: [], answers: [], retry:0})
        await ctxFn.flowDynamic([{body: `*Sesión reiniciada correctamente*`}])
        return ctxFn.endFlow()
    })

module.exports = flujoReiniciar