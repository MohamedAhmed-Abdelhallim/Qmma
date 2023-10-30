const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const Message = sequelize.define("Message" , {
    MessageID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    MessageNameAR : {
        type : DataTypes.STRING(300),
        allowNull : false
    },
    MessageBodyTextAR : DataTypes.STRING(300),
    MessageBodyTextEN : DataTypes.STRING(300),
    MessageEndTextAr : DataTypes.STRING(300),
    MessageEndTextEN : DataTypes.STRING(300),
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

Company.hasOne(Message, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(Message, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(Message, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(Message, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})


Message.sync()
.then(() => console.log("Message table Synced"))
.catch(err => console.log('error while syncing Message table ' + err))

module.exports = Message