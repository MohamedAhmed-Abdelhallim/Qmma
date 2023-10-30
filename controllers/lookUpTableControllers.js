const lookUpTable = require('../models/LookUpTable')
const LookUpTable = require('../models/LookUpTable')

const create = async(req,res) =>{
    await LookUpTable.create(req.body)
            .then(data => res.status(200).send(data))
            .catch (err =>{
                console.log('error while creating a lookuptable : ' + err)
                res.sendStatus(400)
            })
}

const find = async(req,res) =>{
    await LookUpTable.findByPk(req.params.lookuptableID)
        .then(data => res.status(200).send(data))
        .catch(err =>{
            console.log('error while trying to find a lookupdata : ' + err)
            res.sendStatus(400)
        })
}

const findAll = async (req,res) =>{
    await lookUpTable.findAll()
            .then(data => res.status(200).send(data))
            .catch(err =>{
                console.log('error while fetching All lookuptables : ' + err)
                res.sendStatus(500)
            })
}

const remove = async(req,res) =>{
    await lookUpTable.destroy({
        where :{
            LookupTableID : req.params.lookuptableID
        }
    })
    .then(() => res.sendStatus(200))
    .catch(err =>{
        console.log('error while deleting lookupdata : ' + err)
        res.sendStatus(500)
    })
}

module.exports = {
    create,
    find,
    findAll,
    remove
}