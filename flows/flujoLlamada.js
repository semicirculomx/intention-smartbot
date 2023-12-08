const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");
const flujoEnviarCorreo = require("./flujoEnviarCorreo");
const flujoNull = require("./flujoNull");

let nombre
let correo

const agendar = addKeyword(EVENTS.ACTION)
.addAnswer('Quieres confirmar horario? (SI/NO)',{capture: true}, async (ctx, { state, flowDynamic, fallBack, endFlow, gotoFlow }) => {
    // Verificar si los datos son correctos y actuar en consecuencia
    const respuesta = ctx.body.toLowerCase().trim();

    if (respuesta === "Si" || respuesta === "SI" || respuesta === "si" || respuesta === "Sí") {
      // Los datos son correctos, finalizar el flujo
      await flowDynamic([{body: `Estamos agendando la llamada para ti 📞. En un momento recibirás un correo electrónico con los detalles en tu Google Calendar. 📧
      `}]);
      return gotoFlow(flujoEnviarCorreo)
    } else if (respuesta === "No" || respuesta === "NO" || respuesta === "no") {
      // Los datos no son correctos, reiniciar el flujo
      await state.update({ horario: null });
      await flowDynamic([{body: `Lamento la confusión. Comencemos de nuevo.`}]);
      return gotoFlow(flujoLlamada)
    } else if (ctx.body === 'Cancelar') {
      return gotoFlow(flujoNull)
    } else {
      // Respuesta no válida, pedir una respuesta válida
      await flowDynamic([{body: `Por favor, responde con 'sí' o 'no' o responde Cancelar para volver al menu`}]);
      return fallBack()

    }
  });

const confirmacion = addKeyword(EVENTS.ACTION)
.addAnswer('Responde (SI/NO)',{capture: true}, async (ctx, { state, flowDynamic, fallBack, endFlow, gotoFlow }) => {
    // Verificar si los datos son correctos y actuar en consecuencia
    const respuesta = ctx.body.toLowerCase().trim();

    if (respuesta === "Si" || respuesta === "SI" || respuesta === "si" || respuesta === "Sí") {
      // Los datos son correctos, finalizar el flujo
      await flowDynamic([{body: `Perfecto, ya registré tus datos ✅`}, {body: `Enseguida te muestro los *horarios disponibles* para que elijas el que más te convenga`}]);
      return gotoFlow(flujoLlamada)
    } else if (respuesta === "No" || respuesta === "NO" || respuesta === "no") {
      // Los datos no son correctos, reiniciar el flujo
      await state.update({ name: null, email: null });
      await flowDynamic([{body: `Lamento la confusión. Comencemos de nuevo. Por favor, proporciona tu nombre.`}]);
      return gotoFlow(flujoLlamada)
    } else if (ctx.body === 'Cancelar') {
      return gotoFlow(flujoNull)
    } else {
      // Respuesta no válida, pedir una respuesta válida
      await flowDynamic([{body: `Por favor, responde con 'sí' o 'no'`}]);
      return fallBack()

    }
  });

const formularioNombre = addKeyword(EVENTS.ACTION)
  .addAnswer('Por favor, ¿puedes proporcionarme tu nombre?', {capture: true}, async (ctx, { state, flowDynamic, gotoFlow }) => {
    // Recopilar y guardar el nombre proporcionado por el usuario
    nombre = ctx.body;
    await state.update({ name: ctx.body });

    // Preguntar por el correo electrónico
    await flowDynamic([{body: `Gracias, ${ctx.body}`}]);
    return gotoFlow(formularioEmail)

  })

  
  const formularioEmail = addKeyword(EVENTS.ACTION)
  .addAnswer('¿Puedes proporcionarme tu correo electrónico?', {capture: true}, async (ctx, { state, flowDynamic, gotoFlow }) => {
    // Recopilar y guardar el correo electrónico proporcionado por el usuario
    correo = ctx.body;
    await state.update({ email: ctx.body });

    // Confirmar los datos proporcionados por el usuario
    await flowDynamic([{body: `Gracias! Estan bien asi tus datos?

*Nombre*: ${nombre}
*Correo*: ${correo}

Para *confirmar*:`

  }])
  return gotoFlow(confirmacion)

  })

const horarios = addKeyword(EVENTS.ACTION)
.addAnswer(`Selecciona un horario disponible para la llamada 📅 :
    
*1.*🕘 Mañana - 10:00 AM
*2.*🕐 Mediodía - 12:00 PM
*3.*🕕 Tarde - 3:00 PM
*4.*🕕 Noche - 6:00 PM`,
 {capture: true}, async (ctx, ctxFn) => {
  const seleccion = ctx.body
  const name = ctxFn.state.getMyState()?.name
  const email = ctxFn.state.getMyState()?.email
  if(seleccion && name && email) {
    await ctxFn.flowDynamic([{body: `Excelente ${name}, este es el horario que seleccionaste:
📅 *${seleccion}*!`}]);
    return ctxFn.gotoFlow(agendar)
  }
  })

const flujoLlamada = addKeyword(EVENTS.ACTION)
.addAnswer(`...`, null, async (ctx, ctxFn) => {
      const name = ctxFn.state.getMyState()?.name
      const email = ctxFn.state.getMyState()?.email
        if(!name || !email) {
          await ctxFn.flowDynamic([{body: `¡Perfecto! 📅 Para agendar una llamada, necesito algunos detalles`}]);
         return ctxFn.gotoFlow(formularioNombre)
        } else {
          await delay(1000)
          return ctxFn.gotoFlow(formularioEmail)
        }
    },  [formularioNombre, formularioEmail, horarios, confirmacion, agendar])


module.exports = flujoLlamada