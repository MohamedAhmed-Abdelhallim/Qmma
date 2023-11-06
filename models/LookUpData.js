const {Sequelize , DataTypes} = require('sequelize')
const Company = require('./Company')
const User = require('./User')
const LookupTable = require('./LookUpTable')
const connectionConfig = require('../configuration/config')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

// const sequelize = new Sequelize("QmmaTechv2" , "ali" , "foo" , {
//     dialect : 'mssql',
//     host : 'localhost'
// })

const LookUpData = sequelize.define("LookUpData" , {
    LookupDataID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false
    },
    WorkSpaceID : DataTypes.INTEGER,
    LookupDataNameArabic : DataTypes.STRING(300),
    LookupDataNameEnglish : DataTypes.STRING(300),
    CreationDate : DataTypes.DATE,
    UpdateDate : DataTypes.DATE,
    StatusID : DataTypes.INTEGER,
    Code : DataTypes.STRING(50),
    Description : DataTypes.TEXT,
    Order : DataTypes.INTEGER
})

Company.hasOne(LookUpData , {
    foreignKey : {
        name : "CompanyID",
        allowNull : false
    },
    onDelete : "NO ACTION"
})

User.hasOne(LookUpData , {
    foreignKey :{
        name : "CreatedByUerID",
        allowNull : false
    },
    onDelete : "NO ACTION"
})

User.hasOne(LookUpData , {
    foreignKey : "UpdatedByUserD",
    onDelete : "NO ACTION"
})

LookupTable.hasOne(LookUpData , {
    foreignKey : {
        name :"LookupTableID",
        allowNull : false
    }
})

LookUpData.sync()
    .then(() => console.log("lookUpData table Synced"))
    .catch(err => console.log('error while syncing lookUpData table ' + JSON.stringify(err)))


module.exports = LookUpData