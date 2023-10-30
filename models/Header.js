const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const LookUpData = require('./LookUpData')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const Header = sequelize.define("Header" , {
    HeaderID :{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    HeaderText : DataTypes.STRING(300),
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

Company.hasOne(Header, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(Header, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(Header, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(Header, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

LookUpData.hasOne(Header, {
    foreignKey: {
        name: "HeaderTypeID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

 
Header.sync()
.then(() => console.log("Header table Synced"))
.catch(err => console.log('error while syncing Header table ' + err))

module.exports = Header