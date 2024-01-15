const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const axios = require('axios')


const flujoBloqueo = addKeyword(EVENTS.ACTION).addAnswer('que numero quieres bloquear?', {capture: true}).addAction(async (ctx, {endFlow, state, globalState, flowDynamic}) => {
  const currentGlobalState = await globalState.getMyState();
  let blackList = currentGlobalState?.blackList ?? []
  let postedNumber;
  let auth = currentGlobalState.jwt
  try {
    postedNumber = await axios({
      method: "post",
      url: "https://semicirculo.com/wp-json/wp/v2/numero-bloqueado",
      data: {
        title: ctx.body,
        status: "publish",
        acf: {numero: ctx.body}
      },
      headers: {
      Authorization: `Bearer ${auth}`,
      }
    })
  } catch (error) {
    await flowDynamic([{body: `Ocurrio un error al bloquear el número ${error.data}`}])
    console.log(error)
  }
  if(postedNumber) {
    await globalState.update({blackList: [...blackList, ctx.body]})
    await flowDynamic([{body: `El número ha sido bloqueado correctamente`}])
  }
  return endFlow()
})

module.exports = flujoBloqueo