const Company = require('../models/Company')

const create = async (req, res) => {
    const company = req.body
    await Company.create(company)
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log('error while creating a new company ' + err)
            res.status(400)
        })
}

const find = async (req, res) => {
    await Company.findByPk(req.params.companyID)
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log('error while finding company' + err)
            res.status(400)
        })
}

const findAll = async (req, res) => {
    await Company.findAll()
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log('error while getting all  companies ' + err)
            res.status(400)
        })
}

const remove = async (req, res) => {
    await Company.destroy({
        where: {
            CompanyID: req.params.companyID
        }
    }).then(data => res.sendStatus(200).send(data))
        .catch(err => {
            console.log('error while deleting a company ' + err)
            res.status(400)
        })
}

module.exports = {
    create,
    find,
    findAll,
    remove
}