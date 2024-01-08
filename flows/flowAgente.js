const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flujoCancelar = require("./flujoCancelar");

/**
 * Esto se ejeuta cunado la persona escruibe "AGENTE"
 */
const flowAgente = addKeyword(EVENTS.ACTION)
.addAction(async (ctx, {provider}) => {
    const nanoid = await import('nanoid')
    const ID_GROUP = nanoid.nanoid(5)
    const refProvider = await provider.getInstance()
    await refProvider.sendMessage('2295278419', {text: `Tienes un mensaje pendiente de este número ${ctx.from}`})
  })
  .addAnswer('Ya estas en lista para que te atienda un asesor enseguida! Gracias', null, async (ctx, ctxFn) => {
    return ctxFn.gotoFlow(flujoCancelar)
 })

module.exports = flowAgente;
