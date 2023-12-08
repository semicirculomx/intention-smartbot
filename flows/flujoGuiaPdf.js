const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')


const flujoGuiaPdf = addKeyword(EVENTS.ACTION)
.addAnswer('Te enviaremos nuestra guia para dueños de negocios en *Notion*', null, async (ctx ,{ provider, endFlow }) => {
     const url = `https://semicirculo.notion.site/Pasos-para-un-servicio-al-cliente-excepcional-Una-gu-a-para-due-os-de-negocios-603109cd198c47dcabd261d48a922683`
     const telefono = ctx.key.remoteJid;  
    
     var guiaNotion = {
          text: 'Descargar 🔗',
          contextInfo: {
              externalAdReply: {
              title: 'Guía definitiva para dueños de negocio',
              body: 'Semicirculo digital',
              mediaType: 'IMAGE', //VIDEO - IMAGE - NONE
              showAdAttribution: false, //Mensaje a partir de un anuncio
              renderLargerThumbnail: true, 
              mediaUrl: 'https://semicirculo.com/wp-content/uploads/2023/11/Captura-de-pantalla-2023-11-01-a-las-0.10.27.png',
              thumbnailUrl: 'https://semicirculo.com/wp-content/uploads/2023/11/Captura-de-pantalla-2023-11-01-a-las-0.10.27.png', //url imagen
              sourceUrl: url
              }
          }
      };
      const abc = await provider.getInstance();    
      await ctxFn.state.update({botOn: 'true', currentIntention: '', answers: [], retry:0})
     await abc.sendMessage(telefono, guiaNotion);
      return endFlow()

})

module.exports = flujoGuiaPdf