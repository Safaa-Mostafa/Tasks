// name:safaa Mostafa Gouda Mohamed
const express =require("express")
const hbs =require("hbs")
const path=require("path");
const port =3000;
const app =express()
const layoutsLoc =path.join(__dirname,"frontend/layouts")
const publicsLoc =path.join(__dirname,"frontend/public")//statics
const viewsLoc =path.join(__dirname,"frontend/views")
app.use(express.urlencoded({extended:true}))

app.use(express.static(publicsLoc))
app.set("view engine",'hbs')
app.set('views',viewsLoc)
hbs.registerPartials(layoutsLoc);

const userRoutes = require("./routes/user.routes")
app.use(userRoutes)

app.all('*', (req,res)=>{
    res.render("err404", {
        pageTitle:"Page not found"
    })
})
app.listen(port,()=>console.log(`http://localhost:${port}`))




