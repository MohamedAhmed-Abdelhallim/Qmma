const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const Bot = require('./Bot')
const BotMenu = require('./BotMenu')
const Message = require('./Message')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const BotMessage = sequelize.define("BotMessage" , {
    BotMessageID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    Order : DataTypes.INTEGER,
    Active : DataTypes.BOOLEAN,
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

Company.hasOne(BotMessage, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(BotMessage, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(BotMessage, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(BotMessage, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

Bot.hasOne(BotMessage, {
    foreignKey: {
        name: "BotID"
    },
    onDelete: "NO ACTION"
})

BotMenu.hasOne(BotMessage, {
    foreignKey: {
        name: "Menu"
    },
    onDelete: "NO ACTION"
})

Message.hasOne(BotMessage, {
    foreignKey: {
        name: "MessageID"
    },
    onDelete: "NO ACTION"
})


BotMessage.sync()
.then(() => console.log("BotMessage table Synced"))
.catch(err => console.log('error while syncing BotMessage table ' + err))

module.exports = BotMessage