const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const wpApiCall = require('./aiengine')
const flujoCancelar = require('./flujoCancelar')


const  flujoWpIA = addKeyword(EVENTS.ACTION)
.addAnswer('...', null , async (ctx, ctxFn) => {
    let userPrompt = ctxFn.state.getMyState()?.answers || []
    const intenciones = await ctxFn.state.getMyState()?.intenciones || [];
    const intencionRepetida = intenciones.filter((intencion) => (intencion === 'demos'));
    const telefono = ctx.key.remoteJid;  

    if(intencionRepetida && intencionRepetida.length < 8 ) {
            intenciones.push('demos')
            await ctxFn.state.update({intenciones, answers: [], currentIntention: 'wpIAdemo'})
            if(intencionRepetida.length === 1) {
                userPrompt[0] = 'Hola! mucho gusto, busco asistencia'
            }
            const message = await wpApiCall(userPrompt[0], 'chatbot-m8k6dx', `${telefono}`)
            await ctxFn.flowDynamic([{body: `${message.data}`}])

            return ctxFn.endFlow();
        } else {
            return ctxFn.gotoFlow(flujoCancelar)
        }
   
})

module.exports = flujoWpIA