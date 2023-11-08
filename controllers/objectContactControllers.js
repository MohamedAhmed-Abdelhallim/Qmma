const ObjectContact = require('../models/ObjectContacts')
const LookUpTable = require('../models/LookUpTable')
const LookUpData = require('../models/LookUpData')
const { getObjectTypeID } = require('../helpers/getObjectTypeID')

const create = async (req, res) => {
    try {
        const { LookupTableID } = await LookUpTable.findOne({
            where: {
                LookupTableNameEnglish: 'ObjectType'
            },
            attributes: ['LookupTableID']
        });
        // console.log('lookuptable =>' +LookupTableID );

        //find all lookupdata that is associated with contact
        const objectTypes = await LookUpData.findAll({
            where: {
                LookupTableID: LookupTableID
            },
            attributes: ['LookupDataNameEnglish', 'LookupDataID']
        })
        //find which object type is to be created
        let objectTypeID;
        const { contact, objectType, objectID } = req.body
        objectTypes.every(obj => {
            if (obj.LookupDataNameEnglish === objectType) {
                objectTypeID = obj.LookupDataID
                return false;
            }
            return true;
        })

        let ObjectContactEL = {
            ObjectTypeID: objectTypeID,
            ObjectID: objectID,
        }

        const contactTypes = await LookUpTable.findAll({
            where: {
                LookupTableNameEnglish: 'Contact'
            },
            attributes: ['LookupTableNameEnglish'],
            include: {
                model: LookUpData,
                attributes: ['LookupDataNameEnglish', 'LookupDataID']
            }
        })

        if (Array.isArray(contact)) {
            contact.every(contact => {
                let type = Object.keys(contact)
                ObjectContactEL.Value = contact[type]
                contactTypes.every(async CT => {
                    //iterate over all contact types till get matching type and get it's id ,, then insert a record into ObjectContact table
                    if (CT.LookUpDatum.LookupDataNameEnglish == type) {
                        ObjectContactEL.LookupDataID = CT.LookUpDatum.LookupDataID
                        await ObjectContact.create(ObjectContactEL);
                        return false;
                    }
                    return true;
                })
                return true;
            })
        } else throw { errorMessage: "Not valid format", errorCode: 3 }

        res.status(200).json({ message: 'contact added' })
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else res.sendStatus(500)
    }
}

const findContact = async (req, res) => {
    try {
        const { objectID } = req.body
        const objectTypeID = await getObjectTypeID(req)
        const contacts = await ObjectContact.findAll({
            where: {
                ObjectTypeID: objectTypeID,
                ObjectID: objectID
            },
            attributes: ['Value', 'LookupDataID']
        })
        let contactResults = []
        for (let i = 0; i < contacts.length; i++) {
            let contacEL = {}
            let contactType = await LookUpData.findOne({
                where: {
                    LookupDataID: contacts[i].LookupDataID
                },
                attributes: ['LookupDataNameEnglish']
            })
            contacEL[contactType.LookupDataNameEnglish] = contacts[i].Value
            contactResults.push(contacEL)
            console.log('contact => ' + JSON.stringify(contactResults))
        }
        res.status(200).json(contactResults)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }
}


const errorHandler = (error) => {
    if (error.hasOwnProperty('name') && error.name === 'SequelizeForeignKeyConstraintError')
        return 'Validation Error ,, one or more of the data dont exist'
    else if (error.hasOwnProperty('name') && error.name === 'SequelizeValidationError') {
        let ValidationErrorItem = error.errors[0]
        if (ValidationErrorItem.validatorKey === 'is_null') {
            return `${ValidationErrorItem.path} cannot be empty`
        }
    } else if (error.hasOwnProperty('name') && error.name === 'SequelizeUniqueConstraintError') {
        return `${error.errors[0].value} is already exist`
    } else if (error.errorCode === 3) {
        return error.errorMessage
    }
    console.log(error)
}

module.exports = {
    create,
    findContact,
    // findAll,
    // remove
}