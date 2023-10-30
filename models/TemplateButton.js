const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const Template = require('./Template')
const LookUpData = require('./LookUpData')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const TemplateButton = sequelize.define("TemplateButton" , {
    ButtonID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    ButtonText : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    Order : DataTypes.INTEGER,
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

Company.hasOne(TemplateButton, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(TemplateButton, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(TemplateButton, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(TemplateButton, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

Template.hasOne(TemplateButton, {
    foreignKey: {
        name: "TemplateID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

LookUpData.hasOne(TemplateButton, {
    foreignKey: {
        name: "ActionTypeID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})



 
TemplateButton.sync()
.then(() => console.log("TemplateButton table Synced"))
.catch(err => console.log('error while syncing TemplateButton table ' + err))

module.exports = TemplateButton