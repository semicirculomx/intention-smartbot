const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");
const flujoMenu = require("./flujoMenu");


const flujoInformacion = addKeyword(EVENTS.ACTION)
    .addAnswer(`!Claro!, ¿Qué más te gustaría saber?

1️⃣ *Quiénes Somos 🤝*
2️⃣ *Qué Hacemos 🚀*
3️⃣ *Nuestros Valores ✨*

Responde con el número que corresponde o *menu* si quieres ver más opciones`, { capture: true }, async (ctx, ctxFn) => {
    const opts = ['1', '2', '3', 'menú', 'Menu', 'Menú', 'MENU', 'menu']
    const jid = ctx.key.remoteJid;
    const refProvider = await ctxFn.provider.getInstance();
  
    await refProvider.presenceSubscribe(jid);
    await refProvider.sendPresenceUpdate("composing", jid);
    await delay(1500)

    let response = ctx.body.trim();
    const intenciones = await ctxFn.state.getMyState()?.intenciones || [];
    const intencionRepetida = intenciones.find((intencion) => (intencion === 'informacion'));
    if(!intencionRepetida) {
            intenciones.push('informacion')
            await ctxFn.state.update({intenciones})
    }
    await refProvider.sendPresenceUpdate("paused", jid);
    switch(response) {
        case '1':
            // Aquí añades la lógica para la opción "Quiénes Somos"
            await ctxFn.flowDynamic([{body:`🌟 Somos especialistas en soluciones de chatbot para eCommerce, enfocados en mejorar la comunicación y automatización.

También puedes entrar a nuestro sitio web www.semicirculo.com, para más información 🙂

¿En que más te puedo ayudar 😃 ? O puedo regresar al *menú de opciones* si prefieres`}])
           await ctxFn.state.update({answers: []})
            break;
        case '2':
            // Aquí añades la lógica para la opción "Qué Hacemos"
            await ctxFn.flowDynamic([{body:`🚀 Ayudamos a negocios como el tuyo a optimizar procesos y mejorar la experiencia del cliente a través de la tecnología avanzada.

Puedo enseñarte una *demostración* o también me puedo regresar al *menú de opciones* si prefieres 😃
¿Cómo te puedo ayudar?`}])
	    await ctxFn.state.update({answers: []})            
	    break;
        case '3':
            // Aquí añades la lógica para la opción "Nuestros Valores"
            await ctxFn.flowDynamic([{body:`🌱 Valoramos la innovación, calidad en el servicio al cliente y adaptabilidad a las necesidades de cada empresa.

También puedes entrar a nuestro sitio web www.semicirculo.com, para más información 🙂

Puedo regresar al *menú de opciones* si prefieres. ¿O dime cómo te puedo ayudar 😃 ? `}])
            
	    await ctxFn.state.update({answers: []})
	    break;
        case 'menu':
        case 'menú':
        case 'Menu':
        case 'Menú':
        case 'MENU':
            // Aquí manejas la opción de cancelar para volver al menú
            return ctxFn.gotoFlow(flujoMenu);
        default:
            // En caso de una respuesta no reconocida, puedes enviar un mensaje de error o de ayuda
		ctxFn.fallBack('Responde el número que corresponde o *menu* si quieres ver más opciones');
            break;
    }
})
    
module.exports = flujoInformacion
