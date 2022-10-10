const addForm = document.querySelector("#addForm");
let userHead = ["username", "salary","status"];
const dataWrap =document.querySelector("#dataWrap");
const single = document.querySelector("#single")
const editForm =document.querySelector("#editForm");
const userInput =document.getElementById("#user");
const createUserObject = (addForm) => {
  let infoUser = { id: Date.now() }
  userHead.forEach(head => infoUser[head] = addForm.elements[head].value);
  return infoUser;
};
const readFromStorage = (key= "user", dataType="array") => {
  let data
  try{
      data = JSON.parse(localStorage.getItem(key)) || []
      if(!Array.isArray(data) && dataType=="array") throw new Error("data is not an array")
  }
  catch(e){
      data = []
  }
  return data
}
const writeToStorage = (data,key="user") => {
  localStorage.setItem(key,JSON.stringify(data))
};

if(addForm){
addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const infoUser = createUserObject(this)
  const infouser=readFromStorage()
  infouser.push(infoUser);
  writeToStorage(infouser)
  window.location.href ="index.html";
});
}
const createMyOwnEle = (eleTag,parent,txtContent=null,classes=null)=>{
  const myNewEle =document.createElement(eleTag);
  if(classes) myNewEle.classList =classes;
  if(txtContent) myNewEle.innerText=txtContent;
  parent.appendChild(myNewEle);
  return myNewEle
}
const delUser =(userinfo,i)=>{
userinfo.splice(i,1)
  writeToStorage(userinfo)
  draw(userinfo)
}
const draw =(users)=>{
  dataWrap.innerText ="";
  if(readFromStorage().length == 0){
    let tr = createMyOwnEle("tr",dataWrap)
    let td = createMyOwnEle("td",tr,"no data found","alert alert-danger")
  }
  const userinfo = readFromStorage()
userinfo.forEach((user,i)=>{
let tr = createMyOwnEle("tr",dataWrap)
createMyOwnEle("td",tr,user.id)
createMyOwnEle("td",tr,user.username)
createMyOwnEle("td",tr,user.status)
createMyOwnEle("td",tr,user.salary)
let td=createMyOwnEle("td",tr)
  
  let delBtn = createMyOwnEle("button", td, "delete", "btn btn-danger mx-2")
  delBtn.addEventListener("click", ()=>delUser(userinfo,i))

  let editBtn = createMyOwnEle("button", td, "change", "btn btn-warning mx-2")
  editBtn.addEventListener("click",()=>{
   updateDate(userinfo,i);

  })
  let showBtn = createMyOwnEle("button", td, "show", "btn btn-success mx-2")
  showBtn.addEventListener("click", ()=> {
  Show_Single(userinfo[i])

})
})
}
if(dataWrap) {
  const userinfo=readFromStorage()
  draw();
}

if(single){
  const user = readFromStorage("userId", "object")
  console.log(user) 
  if(Array.isArray(user)) createMyOwnEle("div", single, "not", "alert alert-danger")
  else 
  if(user.id) createMyOwnEle("div", single, user.id, "alert alert-primary")
  if(user.username)createMyOwnEle("div", single, user.username, "alert alert-primary")
  if(user.status)createMyOwnEle("div", single, user.status, "alert alert-primary")
  if(user.salary)createMyOwnEle("div", single, user.salary, "alert alert-primary")

}

const updateDate =(users,i)=>{
 
    if (users[i].status === "true") {
      users[i].status = "false";
    } else {
      users[i].status = "true";
    }
    writeToStorage(users);
    draw(users);
}
const Show_Single=(user)=>{
  writeToStorage(user,"userId")
  location.href="profile.html";
}



