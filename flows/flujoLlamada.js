const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");
const flujoEnviarCorreo = require("./flujoEnviarCorreo");
const flujoNull = require("./flujoNull");

const calendarLink = "https://calendar.app.google/pXvr5QZeaeEFjB1x9";

const confirmacion = addKeyword(EVENTS.ACTION)
.addAnswer('¿Los datos son correctos? (SI/NO)', {capture: true}, async (ctx, { state, flowDynamic, fallBack, gotoFlow }) => {
    const respuesta = ctx.body.toLowerCase().trim();
    if (respuesta === "Si" || respuesta === "SI" || respuesta === "si" || respuesta === "Sí") {
      await flowDynamic([{body: `Perfecto, puedes agendar la llamada usando el siguiente enlace: ${calendarLink}`}, {body: `Una vez agendada, recibirás una confirmación por correo electrónico.`}]);
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
    await flowDynamic([{body: `Gracias, ${nombre}. Ahora, ¿cuál es tu correo electrónico?`}]);
    return gotoFlow(formularioEmail);
  });

const formularioEmail = addKeyword(EVENTS.ACTION)
  .addAnswer('¿Cuál es tu correo electrónico?', {capture: true}, async (ctx, { state, flowDynamic, gotoFlow }) => {
    let correo = ctx.body;
    await state.update({ email: correo });

    let datos = await state.getMyState();
    await flowDynamic([{body: `Gracias! Por favor confirma tus datos:

*Nombre*: ${datos.name}
*Correo*: ${datos.email}

Para *confirmar* responde con 'SI', para modificarlos responde con 'NO'`}]);
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
