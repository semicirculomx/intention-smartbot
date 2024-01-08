const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");
const flujoMenu = require("./flujoMenu");


const flujoInformacion = addKeyword(EVENTS.ACTION)
    .addAnswer(`¿Quieres saber más sobre nosotros? 🌐 Elige una opción:

*Quiénes Somos 🤝: * Escribe *1*
*Qué Hacemos 🚀:* Escribe *2*
*Nuestros Valores ✨:* Escribe *3*

Escribe *cancelar* para regresar al menú 💬`, { capture: true }, async (ctx, ctxFn) => {
    const opts = ['1', '2', '3', 'cancelar', 'Cancelar', 'CANCELAR']

    let response = ctx.body.trim();
    const intenciones = await ctxFn.state.getMyState()?.intenciones || [];
    const intencionRepetida = intenciones.find((intencion) => (intencion === 'informacion'));
    if(!intencionRepetida) {
            intenciones.push('informacion')
            await ctxFn.state.update({intenciones})
    }
    switch(response) {
        case '1':
            // Aquí añades la lógica para la opción "Quiénes Somos"
            await ctxFn.flowDynamic([{body:`🌟 Somos especialistas en soluciones de chatbot para eCommerce, enfocados en mejorar la comunicación y automatización. Si deseas saber cómo podemos ayudar a tu negocio, escribe *servicios* o *Menú* para volver al menú principal. 🔄`}])
           await ctxFn.state.update({answers: []})
            break;
        case '2':
            // Aquí añades la lógica para la opción "Qué Hacemos"
            await ctxFn.flowDynamic([{body:`🚀 Ayudamos a negocios como el tuyo a optimizar procesos y mejorar la experiencia del cliente a través de la tecnología avanzada. ¿Quieres una demostración o más información? Responde *Demo* o *Info*. Para volver, escribe *Menú*. 🔄`}])
	    await ctxFn.state.update({answers: []})            
	    break;
        case '3':
            // Aquí añades la lógica para la opción "Nuestros Valores"
            await ctxFn.flowDynamic([{body:`🌱 Valoramos la innovación, calidad en el servicio al cliente y adaptabilidad a las necesidades de cada empresa. Si tienes preguntas específicas, responde con tu duda, o escribe *Agente* para hablar con un asesor. 🔄`}])
            
	    await ctxFn.state.update({answers: []})
	    break;
        case 'cancelar':
        case 'Cancelar':
        case 'CANCELAR':
            // Aquí manejas la opción de cancelar para volver al menú
            return gotoFlow(flujoMenu);
        default:
            // En caso de una respuesta no reconocida, puedes enviar un mensaje de error o de ayuda
		ctxFn.fallBack();
            break;
    }
})
    
module.exports = flujoInformacion
