const UserChannel = require('../models/UserChannel')
const LookUpData = require('../models/LookUpData')

const getUserChannels = async(userID)=>{
    let userChannels = await UserChannel.findAll({
        where :{
            UserID : userID
        },
        attributes : ['LoginStatus' , 'EnabledStatus' , 'AutoAnswer', 'MaxInteractions' , 'ChannelID'],
    })
    for(let i = 0 ; i < userChannels.length ; i++){
        let {LookupDataNameEnglish} = await LookUpData.findByPk(userChannels[i].ChannelID)
        userChannels[i].ChannelID = LookupDataNameEnglish
    }
    return userChannels
}

module.exports = {
    getUserChannels
}