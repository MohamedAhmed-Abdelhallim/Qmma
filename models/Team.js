const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')

const sequelize = new Sequelize(connectionConfig.database, connectionConfig.username, connectionConfig.password, connectionConfig.options)

const Team = sequelize.define("Team", {
    TeamID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TeamName: {
        type : DataTypes.STRING(300),
        unique : true
    },
    TeamMail: DataTypes.STRING(300),
    ParentTeamID: DataTypes.INTEGER,
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
})

Company.hasOne(Team, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(Team, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(Team, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(Team, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

Team.sync()
    .then(() => console.log("Team table Synced"))
    .catch(err => console.log('error while syncing Team table ' + err))

module.exports = Team