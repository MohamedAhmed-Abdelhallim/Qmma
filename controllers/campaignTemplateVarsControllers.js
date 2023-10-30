const CampaignTemplateVar = require('../models/CampaignTemplateVars')

const create = async(req,res)=>{
    try {
        const campaignTemplateVar =  await CampaignTemplateVar.create(req.body)
        res.status(200).send(campaignTemplateVar) 
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
        const  campaignTemplateVar= await CampaignTemplateVar.findByPk(req.params.campaignTemplateVarID)
        if(campaignTemplateVar) res.status(200).send(campaignTemplateVar)
        else res.status(400).send("requested campaignTemplateVar is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const campaignTemplateVars = await CampaignTemplateVar.findAll()
        res.status(200).send(campaignTemplateVars)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.campaignTemplateVarID) throw 3
        const campaignTemplateVar = await CampaignTemplateVar.destroy({
            where : {
                RecordID : req.body.campaignTemplateVarID
            }
        })
        if(campaignTemplateVar) res.status(200).send('campaignTemplateVar deleted')
        else res.status(400).send("the requested campaignTemplateVar is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("campaignTemplateVar is not defined")
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