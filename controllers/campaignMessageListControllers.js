const CampaignMessageList = require('../models/CampaignMessageList')

const create = async(req,res)=>{
    try {
        const campaignMessageList =  await CampaignMessageList.create(req.body)
        res.status(200).send(campaignMessageList) 
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else {
            console.log(error)
            res.sendStatus(500)
        }
    }
}

const find = async (req,res) =>{
    try {
        const  campaignMessageList= await CampaignMessageList.findByPk(req.params.campaignMessageListID)
        if(campaignMessageList) res.status(200).send(campaignMessageList)
        else res.status(400).send("requested campaignMessageList is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const campaignMessageLists = await CampaignMessageList.findAll()
        res.status(200).send(campaignMessageLists)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.listID) throw 3
        const campaignMessageList = await CampaignMessageList.destroy({
            where : {
                ListID : req.body.listID
            }
        })
        if(campaignMessageList) res.status(200).send('campaignMessageList deleted')
        else res.status(400).send("the requested campaignMessageList is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("campaignMessageList is not defined")
        else res.status(500).send("Internal Server Error")
    }
}


const errorHandler = (error) => {
    if (error.hasOwnProperty('name') && error.name === 'SequelizeForeignKeyConstraintError')
        return 'Validation Error ,, one or more of the data dont exist'
    else if (error.hasOwnProperty('name') && error.name === 'SequelizeValidationError'){
            let ValidationErrorItem = error.errors[0]
            if (ValidationErrorItem.validatorKey === 'is_null'){
                return `${ValidationErrorItem.path} cannot be empty`
            }
    }else if(error.hasOwnProperty('name') && error.name === 'SequelizeUniqueConstraintError'){
            return `${error.errors[0].value} is already exist`
    }
}

module.exports = {
    create,
    find,
    findAll,
    remove
}