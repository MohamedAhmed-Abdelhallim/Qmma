const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const Role = sequelize.define("Role", {
    RoleID :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    RoleName : {
        type : DataTypes.STRING(300),
        allowNull : false,
        unique : true
    },
    RoleTypeID : DataTypes.INTEGER,
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
})

Company.hasOne(Role, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(Role, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(Role, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(Role, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

Role.sync()
    .then(() => console.log("Role table Synced"))
    .catch(err => console.log('error while syncing Role table ' + err))

module.exports = Role
