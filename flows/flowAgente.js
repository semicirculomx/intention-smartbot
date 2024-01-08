const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flujoCancelar = require("./flujoCancelar");

/**
 * Esto se ejeuta cunado la persona escruibe "AGENTE"
 */
const flowAgente = addKeyword(EVENTS.ACTION)
.addAction(async (ctx, {provider}) => {
  
    const refProvider = await provider.getInstance()
    await refProvider.sendMessage('5212295278419@s.whatsapp.net', {text: `Tienes un mensaje pendiente de este número ${ctx.from}`})
  })
  .addAnswer('Ya estas en lista para que te atienda un asesor enseguida! Gracias', null, async (ctx, ctxFn) => {
    await ctxFn.state.update({currentIntention: 'agente', answers: []})
    return ctxFn.endFlow()

 })

module.exports = flowAgente;
