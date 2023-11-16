const LookUpData = require('../models/LookUpData')
const LookUpTable = require('../models/LookUpTable')

const find_ld_linked_lt = async (lookUp_table_name) => {
    try {
        const lookUpdata_v = await LookUpTable.findAll({
            where: {
                LookupTableNameEnglish : lookUp_table_name
            },
            attributes : [],
            include: {
                model: LookUpData,
                attributes: ['LookupDataNameEnglish', 'LookupDataID']
            }
        })
        //console.log(JSON.stringify(lookUpdata_v))
        let result = [];
        let tempObj ;
        for(let i = 0 ; i <lookUpdata_v.length ; i++ ){
            tempObj = {}
            tempObj.channel = lookUpdata_v[i].LookUpDatum.LookupDataNameEnglish
            tempObj.ChannelID = lookUpdata_v[i].LookUpDatum.LookupDataID
            result.push(tempObj)
        }
        return result
    } catch (error) {
        throw 'Erorr => ' + error 
    }
}

const remove_ld = async(ld_ID) =>{
    try {
        await LookUpData.destroy({
            where :{
                LookupDataID : ld_ID
            }
        })
    } catch (error) {
        console.log(`Error while trying to remove lookupdata with ID : ${ld_ID}`)
        throw 'Error => ' + error
    }
}


module.exports = {
    find_ld_linked_lt,
    remove_ld
}