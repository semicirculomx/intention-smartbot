const {addKeyword, EVENTS} = require("@bot-whatsapp/bot");
const delay = require("../utils");

const flowStarter = addKeyword('-CHATBOT-')
.addAction(async (ctx, {state, provider}) => {
        console.log('starter')
        await state.update({ botOn: 'false' })
        const jid = ctx.key.remoteJid;
        const refProvider = await provider.getInstance();
      
        await refProvider.presenceSubscribe(jid);
        await refProvider.sendPresenceUpdate("composing", jid);
        await delay(3500);      

})
.addAnswer(
  '¡Hola! 👋 Soy un Bot Asistente de Semicirculo, gracias por contactarnos!')
.addAnswer([
  'Cuéntame en qué puedo ayudarte? 😃',
],null, async (ctx, { provider, endFlow }) => {
        const jid = ctx.key.remoteJid;
       const refProvider = await provider.getInstance();
        await refProvider.sendPresenceUpdate("paused", jid);
        return endFlow()

 })

 module.exports = flowStarter