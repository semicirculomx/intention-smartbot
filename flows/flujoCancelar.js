const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

const flujoCancelar = addKeyword(EVENTS.ACTION)
.addAnswer('Tu sesión se ha cerrado ⏲️, puedes intentarlo de nuevo escribiendo un mensaje!', null, async (ctx, ctxFn) => {
    await ctxFn.state.update({botOn: 'true', currentIntention: '', intenciones: [], answers: [], retry:0})
    return ctxFn.endFlow()
  })

  module.exports = flujoCancelar