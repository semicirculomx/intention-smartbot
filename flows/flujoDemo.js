const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const flujoWpIA = require("./flujoWpIA");


const flujoDemo = addKeyword(EVENTS.ACTION)
    .addAnswer('*DEMO MENU* Elige que demo probar:')
    .addAnswer('🤖 demo asesor de ventas - Escríbe *demo1*', {capture: true}, async (ctx, ctxFn) => {
      const intenciones = await ctxFn.state.getMyState()?.intenciones || [];
        const intencionRepetida = intenciones.find((intencion) => (intencion === 'demos'));
        if(!intencionRepetida) {
            intenciones.push('demos')
            await ctxFn.state.update({intenciones})
        } 
        if(ctx.body.includes('demo1')) {
          ctxFn.gotoFlow(flujoWpIA)
          
        }
        return ctxFn.endFlow()
    })

module.exports = flujoDemo