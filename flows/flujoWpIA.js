const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const wpApiCall = require('./aiengine');
const flujoNull = require('./flujoNull');


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
                userPrompt[0].text = 'Hola! mucho gusto, busco asistencia, responde rápido y conciso'
            }
            const message = await wpApiCall(userPrompt[0].text, 'chatbot-m8k6dx', `${telefono}`)
            console.log(userPrompt)
            await ctxFn.flowDynamic([{body: `${message.data}`}])

            return ctxFn.endFlow();
        } else {
            return ctxFn.gotoFlow(flujoNull)
        }
   
})

module.exports = flujoWpIA
