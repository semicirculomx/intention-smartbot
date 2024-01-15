const axios = require("axios")

const fetchBlockedNumbers = async (jwt) => {
    var config = {
                method: "get",
                url: "https://semicirculo.com/wp-json/wp/v2/numero-bloqueado",
                headers: {
                  Authorization: `Bearer ${jwt}`
                  }
            }
            let response = await axios(config)
    
            return response.data.map((obj) => {
              return obj.acf.numero
          })
    
    }

    module.exports = fetchBlockedNumbers