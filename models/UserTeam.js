const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const Team = require('./Team')

const sequelize = new Sequelize(connectionConfig.database, connectionConfig.username,
    connectionConfig.password, connectionConfig.options)

const UserTeam = sequelize.define("UserTeam", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
},{
    timestamps : false
})

Company.hasOne(UserTeam, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(UserTeam, {
    foreignKey: {
        name: "UserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

Team.hasOne(UserTeam, {
    foreignKey: {
        name: "TeamID",
        allowNull : false
    },
    onDelete: "NO ACTION"
})

User.hasOne(UserTeam, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(UserTeam, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

UserTeam.sync()
    .then(() => console.log("UserTeam table Synced"))
    .catch(err => console.log('error while syncing UserTeam table ' + err))

module.exports = UserTeam


