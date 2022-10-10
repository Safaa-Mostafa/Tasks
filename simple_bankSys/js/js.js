const   addUserForm         = document.querySelector('#addUserForm')
        allUsersForm        = document.querySelector('#allUsersForm')
        Users_in            = document.querySelector('#Users_in')
        userName            = document.querySelector('#userName'),
        userBalance         = document.querySelector('#userBalance'),
        addUser             = document.querySelector('#addUser')
        addBalanace         = document.querySelector('#addBalanace'),
        withdrawBalanace    = document.querySelector('#withdraw'),
        tBody               = document.querySelector('#usersList'),        
        usersArray          = fetchUsersFromLocalStorage('usersArray') ? fetchUsersFromLocalStorage('usersArray') : []
/* Methods */
//Add to Local
const addUsersToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

//Fetch from Local
function fetchUsersFromLocalStorage(data){
    let stringData    = localStorage.getItem(data)
    if(stringData){
         usersArray = JSON.parse(stringData)
         return usersArray
    }
    
}
//Create table row
const createUsersRow = (user) => {
  console.log(user)
    return       `<tr>
                    <th scope="row">${user.id}</th>
                        <td>${user.nameValue}</td>
                        
                        <td>
                            <input type="submit" value="Add" class="btn btn-success" id= "addBalanace" onclick="addUsersBalance(${user.balanceValue}, ${user.id})">
                            <input type="submit" value="Withdraw" class="btn btn-primary" onclick="withdrawUserBalance(${user.balanceValue}, ${user.id})">
                            <input type="submit" value="Show" id="Show" class="btn btn-warning" onclick=show(${user.id})>
                    </td>
                </tr>`
}
//Adding Balanace
const addUsersBalance = (balanceValue, id) => {
    let num    = window.prompt('Please Add Your Balance')

    if ( Number(num)>=100 && Number(num)<=  5000  ) {
        balanceValue   += Number(num)

        usersArray = usersArray.map( user => {
            if (user.id === id) {
                user.balanceValue = balanceValue
                user.transactions.push({type:"Add Balance",amount:Number(num)})

                return user
            } else{
                return user
            }            
        }) 
        addUsersToLocalStorage('usersArray', usersArray)
        createTableWithFetchedUsers()

    } else {
        input = window.alert('your balance should be more than 100 and less than or equal 5000 ')
        console.log(balanceValue += Number(num))
        
    }
}
//show data
let show = (user) => {
for(let i=0;i<usersArray.length;i++){
    if(usersArray[i].id===user){
        localStorage.setItem('data_client', JSON.stringify(usersArray[i]))
        break;
    }
}
window.location.replace("client.html");
}
//Withdrawing Balance
const withdrawUserBalance = (balanceValue, id) => {
    
    let num    = window.prompt('Please Add Your Balance')

    if ( Number(num)>=100 && Number(num)<= balanceValue  ) {
        balanceValue   -= Number(num)

        usersArray = usersArray.map( user => {
            if (user.id === id) {
                user.balanceValue = balanceValue            
                 user.transactions.push({type:"With Draw",amount:Number(num)})

                 return user

            } else{
                return user
            }            
        
        }) 
        addUsersToLocalStorage('usersArray', usersArray)
        createTableWithFetchedUsers()

    } else {
        input = window.alert('your balance should be more than 100 and less than or equal balance  ')
        console.log(balanceValue -= Number(num))
        
    }
}

 
//Create Dynamic Rows
function createTableWithFetchedUsers() {
    tBody.innerHTML =''
    let fetchedUsers = fetchUsersFromLocalStorage('usersArray')
    fetchedUsers.map(user=> tBody.innerHTML += createUsersRow(user) )
}

/**Event Handlers */

//Home page Adding user
if (addUserForm) {
        addUser.addEventListener('click', function (e) {
            e.preventDefault()
            let id              = Date.now(),
                nameValue       = userName.value,
                balanceValue    = userBalance.value
                
                userObject = {id, nameValue, balanceValue,
                    
                    transactions: [{type:"Balance",amount:balanceValue}]
                }
            if ( balanceValue >= 0 ) {
                usersArray.push(userObject )
                addUsersToLocalStorage( 'usersArray', usersArray )
                setTimeout( () => window.location.replace("addUser.html"), 500 )
            }         
    })
}
if (allUsersForm) {
    console.log(usersArray)
   createTableWithFetchedUsers()
}
if(Users_in){
   let data=fetchUsersFromLocalStorage('data_client');
    console.log(data)
const tBody_client= document.querySelector('#usersclient')
tBody_client.innerHTML =`<tr>
<th>${data.id}</th>
<td>${data.nameValue}</td>
<td>${data.balanceValue}</td>
</tr>`
const tBody_transactions= document.querySelector('#users_transactions')
let trans=data.transactions;
trans.map(sub_trans=>{
    tBody_transactions.innerHTML+=`<tr>
    <td>${sub_trans.type}</td>
    <td>${sub_trans.amount}</td>
    
    </tr>`

})

}
