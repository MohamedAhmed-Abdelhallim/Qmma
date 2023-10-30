const CampaignResult = require('../models/CampaignResults')

const create = async(req,res)=>{
    try {
        const campaignResult =  await CampaignResult.create(req.body)
        res.status(200).send(campaignResult) 
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
        const  campaignResult= await CampaignResult.findByPk(req.params.campaignResultID)
        if(campaignResult) res.status(200).send(campaignResult)
        else res.status(400).send("requested campaignResult is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const campaignResults = await CampaignResult.findAll()
        res.status(200).send(campaignResults)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.campaignResultID) throw 3
        const campaignResult = await CampaignResult.destroy({
            where : {
                RecordID : req.body.campaignResultID
            }
        })
        if(campaignResult) res.status(200).send('campaignResult deleted')
        else res.status(400).send("the requested campaignResult is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("campaignResult is not defined")
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