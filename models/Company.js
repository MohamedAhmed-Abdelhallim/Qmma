const {Sequelize , DataTypes , Model} = require('sequelize')
const connectionConfig = require('../configuration/config')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)
// const sequelize = new Sequelize("QmmaTechv3" , "ali" , "foo" , {
//     dialect : 'mssql',
//     host : 'localhost',
//     logging : false
// })

const Company = sequelize.define("company" , {
    CompanyID : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ParentCompanyID  : DataTypes.INTEGER,
    NameArabic : DataTypes.STRING(300),
    NameEnglish : DataTypes.STRING(300),
    CountryID : DataTypes.INTEGER,
    City : DataTypes.STRING(300),
    Phone : DataTypes.STRING(300),
    InactivityTimeOut : DataTypes.INTEGER,
    TimeZone :  DataTypes.STRING(300),
    ProfileAttachmentID : DataTypes.INTEGER,
    WorkCategoryID : DataTypes.INTEGER,
    WorkDescription : DataTypes.TEXT,
    WorkDescriptionDetails : DataTypes.TEXT,
    Address :  DataTypes.STRING(300),
    On : DataTypes.BOOLEAN,
    Provider : DataTypes.STRING(300),
    IncomingReportWebhook : DataTypes.STRING(300),
    RedirectReportToCustomer :  DataTypes.STRING(300),
    Website : DataTypes.STRING(300),
    Mail : DataTypes.STRING(300),
    WebhookTypeID : DataTypes.INTEGER,
    RedirectToCustomer : DataTypes.BOOLEAN,
    IncomingMessageWebhook :  DataTypes.STRING(50),
    CreationDate : DataTypes.DATE(3) ,
    UpdateDate : DataTypes.DATE(3) ,
    CreatedByUserID : DataTypes.INTEGER,
    UpdatedByUserID : DataTypes.INTEGER,
    StatusID : DataTypes.INTEGER,
})



Company.sync()
    .then(() => console.log("company table synced"))
    .catch((err) =>console.log('table are not created') )

module.exports = Company