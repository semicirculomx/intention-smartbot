const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
require("dotenv").config();

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MongoAdapter = require('@bot-whatsapp/database/mongo')

/**
 * Declaramos las conexiones de Mongo
 */

const MONGO_DB_URI = 'mongodb+srv://botwatsa:TbeIoOc8yiBA6AE8@semicirculobot.bqvbzmy.mongodb.net/?retryWrites=true&w=majority'
const MONGO_DB_NAME = 'semicirculobot'

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

/**
 * Flows
 */
const flowPrincipal = require("./flows/flowPrincipal");
const flowAgente = require("./flows/flowAgente");
const flowDistribuidor = require("./flows/flowDistribuidor");
const flujoInformacion = require("./flows/flujoInformacion");
const flujoCancelar = require("./flows/flujoCancelar");
const flujoClasificar = require('./flows/flujoClasificar');
const flujoNecesidades = require('./flows/flujoNecesidades');
const flujoPersonal = require('./flows/flujoPersonal');
const flujoPrecios = require('./flows/flujoPrecios');
const flujoMenu = require('./flows/flujoMenu');
const flujoDemo = require('./flows/flujoDemo');
const flujoNull = require('./flows/flujoNull');
const flujoLlamada = require('./flows/flujoLlamada');
const flujoEnviarCorreo = require('./flows/flujoEnviarCorreo');
const flujoReiniciar = require('./flows/flujoReiniciar');
const flujoWpIA = require('./flows/flujoWpIA');
const flujoGuiaPdf = require('./flows/flujoGuiaPdf');
const flowStarter = require('./flows/flujoStarter');

/**
 * Funcion principal
 */
const main = async () => {
    const adapterDB = new MongoAdapter({
        dbUri: MONGO_DB_URI,
        dbName: MONGO_DB_NAME,
    })

  const adapterFlow = createFlow([
    flowStarter,
    flowPrincipal,
    flowAgente,
    flowDistribuidor,
    flujoInformacion,
    flujoCancelar,
    flujoClasificar,
     flujoNecesidades, 
     flujoPersonal,
     flujoPrecios,
     flujoNull,
     flujoMenu,
     flujoDemo,
     flujoLlamada,
     flujoEnviarCorreo,
     flujoReiniciar,
     flujoWpIA,
     flujoGuiaPdf

  ]);
  
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();

