const LookUpData = require('../models/LookUpData')
const LookUpTable = require('../models/LookUpTable')

const getObjectTypeID = async (req)=>{
    const { LookupTableID } = await LookUpTable.findOne({
        where : {
            LookupTableNameEnglish : 'ObjectType'
        },
        attributes : ['LookupTableID']
    });
   // console.log('lookuptable =>' +LookupTableID );

    //find all lookupdata that is associated with contact
    const objectTypes = await LookUpData.findAll({
        where : {
            LookupTableID : LookupTableID
        },
        attributes : ['LookupDataNameEnglish' , 'LookupDataID']
    })

   // console.log('object types => ' +JSON.stringify(objectTypes) );

    //find which object type is to be created
    let objectTypeID;
    const {objectType} = req.body
    objectTypes.every(obj =>{
        if(obj.LookupDataNameEnglish === objectType) {
            objectTypeID = obj.LookupDataID
            return false;
        }
        return true;
    })

    return objectTypeID
}


module.exports = {getObjectTypeID}