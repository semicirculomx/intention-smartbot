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

      const intencionPrincipal = await determinarIntencionPrincipal(intenciones, currentIntention);
      console.log("intencionPrincipal:", intencionPrincipal);
      switch (intencionPrincipal) {
        case "servicios":
          return intenciones.includes("servicios") ? ctxFn.gotoFlow(flujoMenu) : ctxFn.gotoFlow(flujoNecesidades);
        case "informacion":
          return intenciones.includes("informacion") ? ctxFn.gotoFlow(flujoMenu) : ctxFn.gotoFlow(flujoInformacion);
        case "precios":
          return intenciones.includes("precios") ? ctxFn.gotoFlow(flujoMenu) : ctxFn.gotoFlow(flujoPrecios);
        case "llamada":
          return intenciones.includes("llamada") ? ctxFn.gotoFlow(flujoMenu) : ctxFn.gotoFlow(flujoLlamada);
        case "demos":
          return intenciones.includes("demos") ? ctxFn.gotoFlow(flujoMenu) : ctxFn.gotoFlow(flujoDemo);
        case "guia":
          return intenciones.includes("guia") ? ctxFn.gotoFlow(flujoMenu) : ctxFn.gotoFlow(flujoGuiaPdf);
        case "agente":
          return intenciones.includes("agente") ? ctxFn.gotoFlow(flujoMenu) : ctxFn.gotoFlow(flowAgente);
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
          return ctxFn.gotoFlow(flujoNull)
      }
    } catch (error) {
      console.error('Error al procesar la acción:', error);
    }
  });

module.exports = flowDistribuidor;

async function determinarIntencionPrincipal(intenciones, currentIntention) {
  // Simplificación del proceso de determinación de intenciones
  const allIntents = ["servicios", "informacion", "precios", "llamada", "demos", "guia", "agente", "menu", "reiniciar"];

  for (let intent of allIntents) {
    if (currentIntention.includes(intent)) {
      return intent;
    }
  }

  return null; // Retornar null si ninguna condición se cumple
}
