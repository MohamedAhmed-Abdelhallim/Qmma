const Campaign = require('../models/Campaigns')

const create = async(req,res)=>{
    try {
        const campaign =  await Campaign.create(req.body)
        res.status(200).send(campaign) 
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
        const  campaign= await Campaign.findByPk(req.params.campaignID)
        if(campaign) res.status(200).send(campaign)
        else res.status(400).send("requested campaign is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const campaigns = await Campaign.findAll()
        res.status(200).send(campaigns)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.campaignID) throw 3
        const campaign = await Campaign.destroy({
            where : {
                CampaignID : req.body.campaignID
            }
        })
        if(campaign) res.status(200).send('campaign deleted')
        else res.status(400).send("the requested campaign is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("campaign is not defined")
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