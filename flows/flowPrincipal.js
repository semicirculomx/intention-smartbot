const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");
const flujoClasificar = require("./flujoClasificar");
const flujoWpIA = require("./flujoWpIA");
const flowStarter = require("./flujoStarter");
const flujoReiniciar = require("./flujoReiniciar");
let inactivityTimer
 

const flowPrincipal = addKeyword(EVENTS.WELCOME)
.addAction(async (ctx, { provider, endFlow, state, gotoFlow }) => {
  console.log('flow_principal')
    
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    const text = ctx.body;
    const currentState = await state.getMyState();
    let ans = currentState?.answers ?? []
    
    if(currentState && (currentState?.currentIntention === 'agente' && ctx.body !== 'Reiniciar')) {
      return endFlow();
    } else if(ctx.body === 'Reiniciar') {
      return gotoFlow(flujoReiniciar)
    }

    const combinedArray = [...ans, {text: text, timestamp: ctx.messageTimestamp}];
    if (combinedArray.length > 3) {
      combinedArray.shift(); 
    }
    console.log(combinedArray)

    await state.update({ answers: combinedArray });
    if(currentState && currentState?.currentIntention === 'wpIAdemo') {
        return gotoFlow(flujoWpIA)
      
  }
    // Establece un nuevo temporizador de inactividad
    inactivityTimer = setTimeout(() => {
      // Realiza una acción de inactividad después del tiempo especificado (3 minutos)
      return gotoFlow(flujoClasificar);
      // gotoFlow(handleInactivity);
    }, 10 * 1000);

})



module.exports = flowPrincipal;
