const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");
const flujoEnviarCorreo = require("./flujoEnviarCorreo");
const flujoNull = require("./flujoNull");

const calendarLink = "https://calendar.app.google/pXvr5QZeaeEFjB1x9";

var calendarBtn = {
  text: 'Agendar llamada rápida 📞',
  contextInfo: {
      externalAdReply: {
      title: 'Da click para agendar una llamada de 15 min por Meets',
      body: 'Semicirculo digital',
      mediaType: 'IMAGE', //VIDEO - IMAGE - NONE
      showAdAttribution: false, //Mensaje a partir de un anuncio
      renderLargerThumbnail: false, 
      mediaUrl: 'https://semicirculo.com/wp-content/uploads/2023/12/calendar-img.png',
      thumbnailUrl: 'https://semicirculo.com/wp-content/uploads/2023/12/calendar-img.png', //url imagen
      sourceUrl: calendarLink
      }
  }
};

const confirmacion = addKeyword(EVENTS.ACTION)
.addAnswer('¿Son correctos? Para confirmar responde con *SI*, para modificarlos responde con *NO*', {capture: true}, async (ctx, { state, flowDynamic, fallBack, gotoFlow, provider }) => {
    const respuesta = ctx.body.toLowerCase().trim();
    const telefono = ctx.key.remoteJid;
    const refProvider = await provider.getInstance();    

    if (respuesta === "Si" || respuesta === "SI" || respuesta === "si" || respuesta === "Sí") {
      await flowDynamic([{body: `Listo, puedes agendar la llamada usando el siguiente enlace:`}]);
      await refProvider.sendMessage(telefono, calendarBtn);
      return gotoFlow(flujoEnviarCorreo)
    } else if (respuesta === "No" || respuesta === "NO" || respuesta === "no") {
      await state.update({ name: null, email: null });
        await flowDynamic([{body: `Entendido, comencemos de nuevo. Por favor, proporciona tu nombre.`}]);
        return gotoFlow(formularioNombre);
    } else if (ctx.body === 'Cancelar') {
        return gotoFlow(flujoNull);
    } else {
        await flowDynamic([{body: `Por favor, responde con 'sí' o 'no'.`}]);
        return fallBack();
    }
});

const formularioNombre = addKeyword(EVENTS.ACTION)
  .addAnswer('Por favor, ¿puedes proporcionarme tu nombre?', {capture: true}, async (ctx, { state, flowDynamic, gotoFlow }) => {
    let nombre = ctx.body;
    await state.update({ name: nombre });
    await flowDynamic([{body: `Gracias, ${nombre}`}]);
    return gotoFlow(formularioEmail);
  });

const formularioEmail = addKeyword(EVENTS.ACTION)
  .addAnswer('¿Cuál es tu correo electrónico?', {capture: true}, async (ctx, { state, flowDynamic, gotoFlow }) => {
    let correo = ctx.body;
    await state.update({ email: correo });

    let datos = await state.getMyState();
    await flowDynamic([{body: `Gracias! Estos son los datos que diste:

*Nombre*: ${datos.name}
*Correo*: ${datos.email}
`}]);
    return gotoFlow(confirmacion);
  });

const flujoLlamada = addKeyword(EVENTS.ACTION)
.addAnswer(`¡Perfecto! 👍🏻`, null, async (ctx, ctxFn) => {
    const datos = await ctxFn.state.getMyState();
    if (!datos.name || !datos.email) {
        await ctxFn.flowDynamic([{body: `Para agendar una llamada rápida 📅, sólo necesito algunos datos`}]);
        return ctxFn.gotoFlow(formularioNombre);
    } else {
        await ctxFn.flowDynamic([{body: `Parece que ya tenemos tus datos. Puedes agendar la llamada directamente usando el siguiente enlace: ${calendarLink}`}]);
        return ctxFn.endFlow();
    }
}, [formularioNombre, formularioEmail, confirmacion]);

module.exports = flujoLlamada;
