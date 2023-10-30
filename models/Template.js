const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const LookUpData = require('./LookUpData')
const Footer = require('./Footer')
const Header = require('./Header')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const Template = sequelize.define("Template" , {
    TemplateID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    Name : {
        type : DataTypes.STRING(300),
        allowNull : false
    },
    BodyMessage : DataTypes.TEXT,
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

Company.hasOne(Template, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(Template, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(Template, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(Template, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

LookUpData.hasOne(Template, {
    foreignKey: {
        name: "CategoryID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

LookUpData.hasOne(Template, {
    foreignKey: {
        name: "LanguageID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

LookUpData.hasOne(Template, {
    foreignKey: {
        name: "ApprovalStatusID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

LookUpData.hasOne(Template, {
    foreignKey: {
        name: "ActionTypeID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

Header.hasOne(Template, {
    foreignKey: {
        name: "HeaderID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

Footer.hasOne(Template, {
    foreignKey: {
        name: "FooterID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

 
Template.sync()
.then(() => console.log("Template table Synced"))
.catch(err => console.log('error while syncing Template table ' + err))

module.exports = Template