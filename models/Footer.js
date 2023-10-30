const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const LookUpData = require('./LookUpData')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const Footer = sequelize.define("Footer" , {
    FooterID :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    FooterText : DataTypes.STRING(300),
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
    Description : DataTypes.INTEGER
},{
    timestamps : false
})

Company.hasOne(Footer, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(Footer, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(Footer, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(Footer, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

LookUpData.hasOne(Footer, {
    foreignKey: {
        name: "FooterTypeID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

 
Footer.sync()
.then(() => console.log("Footer table Synced"))
.catch(err => console.log('error while syncing Footer table ' + err))

module.exports = Footer