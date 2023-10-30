const { Sequelize, DataTypes } = require('sequelize')
const Company = require('./Company')
const User = require('./User')
const sequelize = new Sequelize("QmmaTechv2", "ali", "foo", {
    dialect: 'mssql',
    host: 'localhost',
    logging: false
})

const Workspace = sequelize.define('Workspace', {
    WorkspaceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NameArabic: DataTypes.STRING(300),
    NameEnglish: DataTypes.STRING(300),
    NumberOfContacts: DataTypes.INTEGER,
    NumberOfUsers: DataTypes.INTEGER,
    EnableContactLimit: DataTypes.BOOLEAN,
    ContactLimit: DataTypes.INTEGER,
    PlatformBrandName: DataTypes.STRING(300),
    BrandColor: DataTypes.STRING(300),
    EnableHelpButtons: DataTypes.STRING(300),
    CustomDomain: DataTypes.STRING(300),
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
    PhoneNumber: DataTypes.STRING(50),
    ApiAuthenticationStatusID: DataTypes.INTEGER,
    ApiStatusID: DataTypes.INTEGER,
    ServiceTypeID: DataTypes.INTEGER,
    SpecialityID: DataTypes.INTEGER,
}, {
    timestamps: false
})

Company.hasOne(Workspace, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(Workspace, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(Workspace, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.sync()
    .then(() => console.log("Workspace table Synced"))
    .catch(err => console.log('error while syncing Workspace table ' + err))

module.exports = Workspace

