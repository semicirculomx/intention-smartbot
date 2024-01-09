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
  const jid = ctx.key.remoteJid;
  const refProvider = await provider.getInstance();

  await refProvider.sendPresenceUpdate("available", jid);    
  
  if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    const text = ctx.body;
    const currentState = await state.getMyState();
    let ans = currentState?.answers ?? []
    const botOn = currentState?.botOn ?? 'true'

    if(currentState && (currentState?.currentIntention === 'agente' && ctx.body !== 'Reiniciar')) {
      return endFlow();
    } else if(ctx.body === 'Reiniciar') {
      return gotoFlow(flujoReiniciar)
    }

    const combinedArray = [...ans, {text: text, timestamp: ctx.messageTimestamp}];
    if (combinedArray.length > 3) {
      combinedArray.shift(); 
    }
    await state.update({ answers: combinedArray });
    console.log(combinedArray)
    if(currentState && currentState?.currentIntention === 'wpIAdemo') {
        return gotoFlow(flujoWpIA)
      
  }
   if(botOn === 'false'){
  //   console.log(botOn, 'false')
     return endFlow()
  } else {
    await refProvider.sendPresenceUpdate("paused", jid);
    // Establece un nuevo temporizador de inactividad
    inactivityTimer = setTimeout(() => {
      return gotoFlow(flujoClasificar);
    // Realiza una acción de inactividad después del tiempo especificado (3 minutos)
  }, 5 * 1000);
  }

})



module.exports = flowPrincipal;
