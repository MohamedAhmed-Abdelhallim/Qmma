const LookUpData = require('../models/LookUpData')

const create = async (req, res) => {
    await LookUpData.create(req.body)
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log('error while creating a lookupdata : ' + err)
            res.sendStatus(500)
        })
}

const find = async (req, res) => {
    await LookUpData.findByPk(req.params['lookupdataID'])
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log(err)
            res.status(500).send('error')
        })
}

const findAll = async (req, res) => {
    await LookUpData.findAll()
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log(err)
            res.status(500).send('error')
        })
}

const remove = async (req, res) => {
    await LookUpData.destroy({
        where: {
            LookupDataID: req.params['lookupdataID']
        }
    })
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.log(err)
            res.status(500).send('error')
        })
}

module.exports = {
    create,
    find,
    findAll,
    remove
}