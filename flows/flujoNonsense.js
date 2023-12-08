const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");


const flujoNonsense = addKeyword(EVENTS.ACTION)
    .addAnswer('Flujo necesidades!', null, async (ctx, ctxFn) => {
      const lastFlow = ctxFn.state.getMyState()?.lastFlow
        await delay(2000)
        console.log('NECESIDADES')
        console.log(lastFlow)
        return ctxFn.endFlow()

    })

module.exports = flujoNonsense