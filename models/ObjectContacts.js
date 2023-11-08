const {Sequelize , DataTypes, INTEGER } = require('sequelize')
const connectionConfig = require('../configuration/config')
const LookUpData = require('./LookUpData')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const ObjectContact = sequelize.define('ObjectContact' , {
    ObjectContactID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    ObjectID : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    Value : {
        type : DataTypes.STRING(300),
        allowNull : false
    }
})

LookUpData.hasMany(ObjectContact , {
    foreignKey : {
        name : "ObjectTypeID",
        allowNull : false
    },
    onDelete : "NO ACTION"
})

LookUpData.hasMany(ObjectContact , {
    foreignKey : {
        name : "LookupDataID",
        allowNull : false
    },
    onDelete : "NO ACTION"
})

ObjectContact.sync()
    .then(() => console.log("ObjectContact table Synced"))
    .catch(err => console.log('error while syncing ObjectContact table ' + JSON.stringify(err)))


module.exports = ObjectContact