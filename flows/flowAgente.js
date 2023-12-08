const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flujoCancelar = require("./flujoCancelar");

/**
 * Esto se ejeuta cunado la persona escruibe "AGENTE"
 */
const flowAgente = addKeyword(EVENTS.ACTION)
  .addAnswer(
   "Estamos desviando tu conversacion a nuestro agente"
  )
  .addAction(async (ctx, {provider}) => {
    const nanoid = await import('nanoid')
    const ID_GROUP = nanoid.nanoid(5)
    const refProvider = await provider.getInstance()
    await refProvider.groupCreate(`Semicirculo_(${ID_GROUP})`,[
        `${ctx.from}@s.whatsapp.net`,
    ])
  })
  .addAnswer('Te hemos agregado a un grupo con un asesor! Gracias', null, async (ctx, ctxFn) => {
    return ctxFn.gotoFlow(flujoCancelar)
 })

module.exports = flowAgente;
