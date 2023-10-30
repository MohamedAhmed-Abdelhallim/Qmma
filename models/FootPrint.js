const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const FootPrint = sequelize.define('FootPrint', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TbleID: DataTypes.INTEGER,
    RecordID: DataTypes.INTEGER,
    RecordStatusID: DataTypes.INTEGER,
    RecordActionTypeID: DataTypes.INTEGER,
    Description: DataTypes.TEXT,
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
    Browser: DataTypes.STRING(100),
    IPaddress: DataTypes.STRING(100)
})

Company.hasOne(FootPrint, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(FootPrint, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(FootPrint, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(FootPrint, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

FootPrint.sync()
    .then(() => console.log("FootPrint table Synced"))
    .catch(err => console.log('error while syncing FootPrint table ' + err))

module.exports = FootPrint