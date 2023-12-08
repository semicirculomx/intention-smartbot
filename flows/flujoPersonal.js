const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');

let nombre
let correo
const flujoConfirmacion = addKeyword(EVENTS.ACTION)
.addAnswer('Responde (SI/NO)',{capture: true}, async (ctx, { state, flowDynamic, fallBack, endFlow }) => {
    // Verificar si los datos son correctos y actuar en consecuencia
    const respuesta = ctx.body.toLowerCase().trim();

    if (respuesta === "Si" || respuesta === "SI" || respuesta === "si" || respuesta === "Sí") {
      // Los datos son correctos, finalizar el flujo
      await flowDynamic([{body: `Perfecto, hemos registrado tus datos. ¿En qué más puedo ayudarte?`}]);
      await state.update({ lastFlow: null });
      await state.update({ botOn: 'true' });
      return endFlow()
    } else if (respuesta === "No" || respuesta === "NO" || respuesta === "no") {
      // Los datos no son correctos, reiniciar el flujo
      await state.update({ nombre: null, correo: null });
      await flowDynamic([{body: `Lamento la confusión. Comencemos de nuevo. Por favor, proporciona tu nombre.`}]);
      return gotoFlow(flujoPersonal)
    } else {
      // Respuesta no válida, pedir una respuesta válida
      await flowDynamic([{body: `Por favor, responde con 'sí' o 'no'`}]);
      return gotoFlow(flujoPersonal)

    }
  });
const flujoPersonal = addKeyword(EVENTS.ACTION)
  .addAnswer('Por favor, ¿puedes proporcionarme tu nombre?', {capture: true}, async (ctx, { state, flowDynamic }) => {
    // Recopilar y guardar el nombre proporcionado por el usuario
    nombre = ctx.body;
    await state.update({ nombre: ctx.body });

    // Preguntar por el correo electrónico
    await flowDynamic([{body: `Gracias,${ctx.body}`}]);
  })
  .addAnswer('¿Puedes proporcionarme tu correo electrónico?', {capture: true}, async (ctx, { state, flowDynamic, gotoFlow }) => {
    // Recopilar y guardar el correo electrónico proporcionado por el usuario
    correo = ctx.body;
    await state.update({ correo: ctx.body });

    // Confirmar los datos proporcionados por el usuario
    await flowDynamic([{body: `Gracias por proporcionar tus datos. 
Nombre: ${nombre}
Correo Electrónico: ${correo}
Para confirmar:`

  }])
  return gotoFlow(flujoConfirmacion)

  }, [flujoConfirmacion])



module.exports =  flujoPersonal;
