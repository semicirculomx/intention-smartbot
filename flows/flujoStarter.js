const {addKeyword, EVENTS} = require("@bot-whatsapp/bot");
const delay = require("../utils");

const flowStarter = addKeyword(EVENTS.ACTION)
.addAction(async (ctx, {state, provider}) => {
        console.log('starter')
        const intenciones = await state.getMyState()?.intenciones || [];
        const intencionRepetida = intenciones.find((intencion) => (intencion === 'bienvenida'));
        if(!intencionRepetida) {
                intenciones.push('bienvenida')
                await state.update({intenciones})
        }
        await state.update({answers: []})
})
.addAnswer(`¡Hola! 👋 Soy un Bot Asistente de Semicirculo, gracias por contactarnos!`)
.addAnswer([
  'Dime, en qué te puedo ayudar? 😃',
])

 module.exports = flowStarter
