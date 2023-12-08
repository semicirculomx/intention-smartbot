const axios = require('axios')

const wpApiCall = async (answers, botId, chatId) => {
    try {
        var config = {
            method: "post",
            url: "https://semicirculo.com/wp-json/mwai/v1/simpleChatbotQuery",
            data: {
                "botId": botId,
                "prompt": answers,
                "chatId": chatId
            },
            headers: { 
                Authorization: "Bearer 123456"
            },
        
        }
        // var getwp = {
        //     method: "post",
        //     url: "https://semicirculo.com/wp-json/mo/v1/appointments",
        //     data: {
        //         id: 'HGVJGBI',
        //     },
        //     headers: { 
        //         Authorization: "Bearer 123456"
        //     },
        
        // }

        const response = await axios(config)
        return response.data
       // console.log(response.data)
    } catch (error) {
        console.log(error)

        if(error.response.data){
            console.log(error.response.data)
        }
    }
}

// wpApiCall()

module.exports = wpApiCall