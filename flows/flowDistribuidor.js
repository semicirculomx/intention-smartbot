const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const delay = require("../utils");

const flujoInformacion = require("./flujoInformacion");
const flujoPrecios = require("./flujoPrecios");
const flujoLlamada = require("./flujoLlamada");
const flujoDemo = require("./flujoDemo");
const flujoPersonal = require("./flujoPersonal");
const flowAgente = require("./flowAgente");
const flujoNonsense = require("./flujoNonsense");
const flujoMenu = require("./flujoMenu");
const flujoNecesidades = require("./flujoNecesidades");
const flujoCierre = require("./flujoCierre");
const flujoCancelar = require("./flujoCancelar");
const flujoNull = require("./flujoNull");
const flujoReiniciar = require("./flujoReiniciar");
const flujoGuiaPdf = require("./flujoGuiaPdf");

const flowDistribuidor = addKeyword(EVENTS.ACTION)
  .addAnswer('...', null, async (ctx, ctxFn) => {
    await delay(2000);

    try {
      const intenciones = await ctxFn.state.getMyState()?.intenciones || [];
      const currentIntention = await ctxFn.state.getMyState()?.currentIntention || [];
      const retry = await ctxFn.state.getMyState().retry || 0;
      const textoUsuario = ctx.body;

      // Lógica para determinar la intención principal
      const intencionPrincipal = await determinarIntencionPrincipal(intenciones, currentIntention);
      console.log("intencionPrincipal:", intencionPrincipal);
      switch (intencionPrincipal) {
        case "necesidades":
          console.log('flujoNecesidades');
          return ctxFn.gotoFlow(flujoNecesidades)
        case "informacion":
          console.log('flujoInformacion');
          return ctxFn.gotoFlow(flujoInformacion)

        case "precios":
          if (intenciones.includes("informacion")) {
            console.log('flujoPrecios');
          return ctxFn.gotoFlow(flujoPrecios)
          } else {
            console.log('Flujocancelar');
            return ctxFn.gotoFlow(flujoCancelar)
          }
        case "llamada":
           if (intenciones.includes("informacion")) {
            return ctxFn.gotoFlow(flujoLlamada)
          } else {
            return ctxFn.gotoFlow(flujoInformacion)
          }
        case "demos":
          return ctxFn.gotoFlow(flujoDemo)
        case "guia":
          return ctxFn.gotoFlow(flujoGuiaPdf)
        case "agente":
          return ctxFn.gotoFlow(flowAgente)
        case "menu":
          if (retry < 2) {
            await ctxFn.state.update({retry: (retry+1), answers:[]})
            return ctxFn.gotoFlow(flujoMenu)
          } else {
            return ctxFn.gotoFlow(flujoCancelar)
          }
        case "reiniciar":
          return ctxFn.gotoFlow(flujoReiniciar)
        default:
          console.log('flujoNull');
          return ctxFn.gotoFlow(flujoNull)
      }
    } catch (error) {
      // Manejar el error de la promesa aquí
      console.error('Error al procesar la acción:', error);
    }
  });

module.exports = flowDistribuidor;

async function determinarIntencionPrincipal(intenciones, currentIntention) {
  if (!intenciones.includes("informacion")) {
    return "informacion"; // Lanzar 'informacion' si aún no está en intenciones
  }

  if (!intenciones.includes("necesidades")) {
    return "necesidades"; // Lanzar 'necesidades' si 'informacion' está pero 'necesidades' no
  }

  if (currentIntention.includes("precios")) {
    return "precios"; // Lanzar 'precios' si 'informacion' y 'necesidades' están pero 'precios' no
  }

  if (currentIntention.includes("llamada")) {
    return "llamada"; // Lanzar 'llamada' si 'precios' está en intenciones
  }

  if (currentIntention.includes("demos")) {
    return "demos"; // Lanzar 'demos' si 'informacion' y 'necesidades' están en intenciones
  }

  if (currentIntention.includes("agente")) {
    const todasIntenciones = ["informacion", "necesidades"];
    const todasEjecutadas = todasIntenciones.every(int => intenciones.includes(int));
    if (todasEjecutadas) {
      return "agente"; // Lanzar 'agente' si todas las demás intenciones fueron ejecutadas
    }
      
  }

  if (currentIntention.includes("menu")) {
    return "menu"; // Lanzar 'menu' directamente
  }
  
  if (currentIntention.includes("guia")) {
    return "guia"; // Lanzar 'menu' directamente
  }
  
  if (currentIntention.includes("reiniciar")) {
    return "reiniciar"; // Lanzar 'menu' directamente
  }

  return null; // Retornar null si ninguna condición se cumple
}