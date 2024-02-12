import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-the-champions-acb90-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsements")

const textareaEl = document.getElementById("textarea-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementsEl = document.getElementById("endorsements-el")

publishBtn.addEventListener("click", () => { 
    let textareaValue = textareaEl.value

    push(endorsementInDB, textareaValue)

    clearTextareaEl()
    //appendItemToEndorsementEl(textareaValue)
})

onValue (endorsementInDB, function(snapshot){
    if(snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())

        clearEndorsementsEl()

        for (let i = 0; i < itemArray.length; i++) {
            let currentItem = itemArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
            appendItemToEndorsementEl(currentItem)
           
        }
    }else {
        endorsementsEl.innerHTML = "No items here... yet"
    }
})
   

    

function clearEndorsementsEl(){
    endorsementsEl.innerHTML = ""
}

function clearTextareaEl() {
    textareaEl.value = ""
}
function appendItemToEndorsementEl (item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("p")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(e) {
        let exactLocationOfItemInDB = ref(database, `endorsements/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    endorsementsEl.append(newEl)
}