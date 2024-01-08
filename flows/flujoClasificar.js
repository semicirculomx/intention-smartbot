const { addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const axios  = require('axios');
const flowDistribuidor = require('./flowDistribuidor');
require("dotenv").config()

const flujoClasificar = addKeyword(EVENTS.ACTION)
.addAction(async (ctx, ctxFn) => {
    try {
        let apiResponse;
        const number = ctx.key.remoteJid
    const refProvider = await ctxFn.provider.getInstance()
        const currentState = await ctxFn.state.getMyState()
        // Paso 1: Obtener el array de mensajes del estado
        const mensajes = currentState?.answers || [];
        console.log(currentState?.currentIntention)
        if (mensajes.length === 0) {
            console.log("No hay mensajes para clasificar.");
            return;
        }

        let onWhatsapp = await refProvider.onWhatsApp(number)
        if(onWhatsapp) {
                    // Paso 2: Recuperar el prompt principal desde un archivo
                const fs = require('fs').promises;
                let promptPrincipal;
                try {
                    promptPrincipal = await fs.readFile('/home/jorzarios/intention-smartbot/prompts/clasificacion.txt', 'utf8');
                } catch (err) {
                    console.error("Error al leer el archivo de prompt:", err);
                    return;
                }

                // Paso 3: Preparar el prompt completo
                const promptCompleto = mensajes.reduce((acc, mensaje, index) => {
                    return `${acc}${mensaje.text},`;
                }, promptPrincipal);

                // Paso 4: Llamada a la API de OpenAI
                const respuesta = await axios.post('https://api.openai.com/v1/completions', {
                    
                    model: 'gpt-3.5-turbo-instruct',
                    prompt: `${promptCompleto}
                    Respuesta: `,
                    temperature: 0.3,
                    max_tokens: 25,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    stop: ["Respuesta:"]
                }, {
                    headers: {
                        'Authorization': `Bearer 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` // Tu clave API
                    }
                });
                // Paso 5: Procesar y mostrar la respuesta
                apiResponse = respuesta.data.choices[0].text.trim();
        } else {
            apiResponse = 'bienvenida'
        }
        
        await ctxFn.state.update({currentIntention: apiResponse})
        console.log("Respuesta de la API:", apiResponse);
        return ctxFn.gotoFlow(flowDistribuidor)
        // console.log("prompt completo", promptCompleto);
        // Procesamiento adicional según necesidades (p.ej., actualizar el estado, UI, etc.)

    } catch (error) {
        console.error('Error en flujoClasificar:', error);
    }
});
    /*
    obten del state el array de mensajes del state, recupera el prompt principal extrayendo el texto dentro del archivo './prompts/clasificacion.txt',convierte en texto el array de mensajes y adicinalos al texto del prompt para crear uno solo, haz una llamada a la api de openai usando axios y maneja la respuesta
   
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
    */
  

  module.exports = flujoClasificar
