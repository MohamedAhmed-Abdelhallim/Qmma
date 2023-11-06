const express = require('express')
const cors = require('cors')
require('./models/index')
const userRoutes = require('./routes/userRoutes')
const companyRoutes = require('./routes/companyRoutes')
const lookUpTableRoutes = require('./routes/lookUpTableRoutes')
//const lookUpDataRoutes = require('./routes/lookUpDataRoutes')
// const skillRoutes = require('./routes/skillRoutes')
// const userSkillRoutes = require('./routes/userSkillRoutes')
// const workspaceRoutes = require('./routes/workspaceRoutes')
// const teamRoutes = require('./routes/teamRoutes')
// const userTeamRoutes = require('./routes/userTeamRoutes')
// const roleRoutes = require('./routes/roleRoutes')
// const footPrintRoutes = require('./routes/footPrintRoutes')
// const botRoutes = require('./routes/botRoutes')
// const botMenuRoutes = require('./routes/botMenuRoutes')
// const subMenuRoutes = require('./routes/subMenuRoutes')
// const messageRoutes = require('./routes/messageRoutes')
// const botMessageRoutes = require('./routes/botMessageRoutes')
// const headerRoutes = require('./routes/headerRoutes')
// const footerRoutes = require('./routes/footerRoutes')
// const templateRoutes = require('./routes/templateRoutes')
// const templateVarsRoutes = require('./routes/templateVarsRoutes')
// const templateButtonRoutes = require('./routes/templateButtonsRoutes')
// const campaignRoutes = require('./routes/campaignRoutes')
// const campaignTemplateVarRoutes = require('./routes/campaignTemplateVarRoutes')
// const campaignMessageListRoutes = require('./routes/campaignMessageListRoutes')
// const campaignResultRoutes = require('./routes/campaignResultRoutes')

const app = express()
const corsOptions = {
    //origin : "http://localhost:8081"
    origin : true,
    Credential : true
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//routes
app.use('/api/user' , userRoutes)
app.use('/api/company' , companyRoutes)
app.use('/api/lookuptable' , lookUpTableRoutes)
// app.use('/lookupdata' , lookUpDataRoutes)
// app.use('/skill' , skillRoutes)
// app.use('/userSkill' , userSkillRoutes)
// app.use('/workspace' , workspaceRoutes)
// app.use('/team' , teamRoutes)
// app.use('/userTeam' , userTeamRoutes)
// app.use('/role' , roleRoutes)
// app.use('/footPrint' , footPrintRoutes)
// app.use('/bot' , botRoutes)
// app.use('/botMenu' , botMenuRoutes)
// app.use('/subMenu' , subMenuRoutes)
// app.use('/message' , messageRoutes)
// app.use('/botMessage' , botMessageRoutes)
// app.use('/header' , headerRoutes)
// app.use('/footer' , footerRoutes)
// app.use('/template' , templateRoutes)
// app.use('/templateVars' , templateVarsRoutes)
// app.use('/templateButton' , templateButtonRoutes)
// app.use('/campaign' , campaignRoutes)
// app.use('/campaignTemplateVar' , campaignTemplateVarRoutes)
// app.use('/campaignMessageList' , campaignMessageListRoutes)
// app.use('/campaignResult' , campaignResultRoutes)

const PORT = process.env.PORT || 3002
app.listen(PORT , () =>{
    console.log('server running on port ' + PORT)
})



