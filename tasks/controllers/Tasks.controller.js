const fs = require("fs")

class Task{
    static index = (req,res)=>{
        let allTasks
        try{
            allTasks = JSON.parse(fs.readFileSync('Task_data.json'))||[]
        }
        catch(e){
            allTasks = []
        }
        res.render("home", {
            pageTitle:"home page",
            allTasks,
            hasTasks : allTasks.length
        })
     
    }
    static add = (req,res)=>{
  
        res.render("add", {
            pageTitle:"add Task"
        })
    }
    static addLogic = (req,res)=>{
        const task = { id:Date.now(), ...req.query }
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('Task_data.json'))||[]
        }
        catch(e){
            allTasks = []
        }
        allTasks.push(task)
        fs.writeFileSync("Task_data.json", JSON.stringify(allTasks))
        res.redirect('/')
    }
    static addPost = (req,res)=>{ 
        res.render("addpost", {
            pageTitle:"add Task"
        })
    }
    static addPostLogic = (req,res)=>{
        const task = { id:Date.now(), ...req.body}
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('Task_data.json'))||[]
        }
        catch(e){
            allTasks = []
        }
        allTasks.push(task)
        fs.writeFileSync("Task_data.json", JSON.stringify(allTasks))
        res.redirect('/')
    }
    static single = (req,res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('Task_data.json'))||[]
        }
        catch(e){
            allTasks = []
        }
        let Task = allTasks.find(Task => Task.id == req.params.id)
        Task.status=="true"? Task.status=true: Task.status=false
        res.render("single", {
            pageTitle: "single user",
            Task
        })
    }
    static edit =(req,res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('Task_data.json'))||[]
        }
        catch(e){
            allTasks = []
        }
        let Task = allTasks.find(Task => Task.id == req.params.id)
        res.render("edit", {
            pageTitle:"edit user",
            Task
        })
    }
    static editLogic = (req, res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('Task_data.json'))||[]
        }
        catch(e){
            allTasks = []
        }
        let Task = allTasks.findIndex(task => task.id == req.params.id)
        allTasks[Task]={id:req.params.id,...req.body}
        fs.writeFileSync("Task_data.json", JSON.stringify(allTasks))
        res.redirect('/')    
    }
    static delete = (req, res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('Task_data.json'))||[]
            let taskId = allTasks.findIndex(task => task.id == req.params.id)
            if(taskId!=-1) {
                allTasks.splice(taskId, 1)
                fs.writeFileSync("Task_data.json", JSON.stringify(allTasks))
            }    
        }
        catch(e){
            allTasks = []
        }
        res.redirect('/')
    }
    static change =(req,res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('Task_data.json'))||[]
        }
        catch(e){
            allTasks = []
        }
        let Task = allTasks.findIndex(task => task.id == req.params.id)
        allTasks[Task].status=='false'?allTasks[Task].status='true':allTasks[Task].status='false'
        fs.writeFileSync('Task_data.json', JSON.stringify(allTasks))
        res.redirect('/')
    }
  
}
module.exports = Task