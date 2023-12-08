const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");
const flujoClasificar = require("./flujoClasificar");
const flujoWpIA = require("./flujoWpIA");
let inactivityTimer
 

const flowPrincipal = addKeyword(EVENTS.WELCOME)
.addAction(async (ctx, { provider, endFlow, state, gotoFlow }) => {
  try {
    console.log('flow_principal')
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
  
    const text = ctx.body;
    const currentState = await state.getMyState();
    let ans = currentState?.answers ?? []
    const botOn = currentState?.botOn ?? []
  
    const combinedArray = [...ans, text];
    if (combinedArray.length > 2) {
      combinedArray.shift(); 
    }
    await state.update({ answers: combinedArray });
    console.log(combinedArray)
    if(currentState && currentState?.currentIntention === 'wpIAdemo') {
        return gotoFlow(flujoWpIA)
      
  }
    // Establece un nuevo temporizador de inactividad
    inactivityTimer = setTimeout(() => {
      // Realiza una acción de inactividad después del tiempo especificado (3 minutos)
      return gotoFlow(flujoClasificar);
      // gotoFlow(handleInactivity);
    }, 20 * 1000);
  
   if (botOn === 'false') {
    return endFlow()
  } else {
    await state.update({ botOn: 'false' })
  
    const jid = ctx.key.remoteJid;
    const refProvider = await provider.getInstance();
    //await delay(20000);
  
    await refProvider.presenceSubscribe(jid);
    await refProvider.sendPresenceUpdate("composing", jid);
  
    await delay(2000);
  }
  
 
  } catch (error) {
    console.log(error)
  }
 
})
.addAnswer(
  '¡Hola! 👋 Soy Jorge de Semicirculo, gracias por contactarnos!')
.addAnswer([
  '💻✨ Somos una *agencia de desarrollo de software* y creamos soluciones digitales para *Ecommerce*, *Startups* o *Negocios online*',
])
.addAnswer([
  `Hacemos:

🤖 *Chatbots super inteligentes*
🛍️ *Tiendas en línea*
🚀 *Aplicaciones web y más*` ,
  '',
])
.addAnswer([
  '😃 Cuéntame en qué puedo ayudarte? Estoy aquí para responder a tus preguntas',
],null, async (ctx, { provider, state, endFlow }) => {
        const jid = ctx.key.remoteJid;
        const refProvider = await provider.getInstance();
        await refProvider.sendPresenceUpdate("paused", jid);

        console.log('bienvenida')
        return endFlow()

 })
//  import OpenAI from "openai";

//  const openai = new OpenAI({
//    apiKey: process.env.OPENAI_API_KEY,
//  });
 
//  const response = await openai.completions.create({
//    model: "gpt-3.5-turbo-instruct",
//    prompt: "Clasificación Rápida de Intenciones en Mensajes\n\nObjetivo: Analiza mensajes y asigna una intención de la lista proporcionada.\n\nIntenciones:\n*solo usar estas intenciones\n-personal: Mensajes sobre informacion personal.\n-informacion: parece que busca saber más del servicio\n-pago: interes en contratar el servicio y pagar.\n-precios: esta preguntando sobre costos y precios.\n-llamada: interes en realizar llamada rápida\n-nonsense: palabras sin sentido o irrelevantes.\n-demos: pide ver demostraciones o demos.\n-menú: quiere regresar al menu de opciones\n-agente: quiere hablar con humano.\n-necesidades: esta hablando de los servicios que necesita\n.............................................\nInstrucciones de Respuesta:\n-Un array de strings de una palabra.\n-Máximo 25 tokens por respuesta.\n\nEjemplo:\nMensaje: Lo ocupo para serivico al cliente, soporte tecnico, ventas enviar requisitos\nRespuesta: \"necesidades\"\nMensaje: \"Juan\"\nRespuesta: \"personal\"\nMensaje: \"Claro igual si me puede decir de costos aproximado\"\nRespuesta: \"precios\"\n...............................................\nArraymensajes:[Entre más rápido sea un cierre de venta mejor,\nOK comienzan con $6000 como mínimo anual,\nDe ahí es ver que tan complejo sería el bot]\nRespuesta: ",
//    temperature: 0.3,
//    max_tokens: 256,
//    top_p: 1,
//    frequency_penalty: 0,
//    presence_penalty: 0,
//    stop: ["Respuesta:"],
//  });

module.exports = flowPrincipal;