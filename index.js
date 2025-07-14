let listArray = []
let inputEl = document.getElementById("input-el")
let addList = document.getElementById("add-list")
let listItems = document.getElementById("list-items")



addList.addEventListener("click", function() {
    if(inputEl.value.trim() !== "") {
        listArray.push(inputEl.value)
        saveToLocalStorage()
        inputEl.value = ""
        renderList()
    } 
})

inputEl.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        addList.click()
    }
})

// save to local storage

function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(listArray))
}

const storedTasks = localStorage.getItem("todoList")
if(storedTasks) {
    listArray = JSON.parse(storedTasks)
    renderList()
}


function renderList() {
    listItems.innerHTML = ""

    listArray.forEach((item,index) => {
        const todoDiv = document.createElement("div")

        todoDiv.classList.add("todo-item")

        const taskText = document.createElement("span")

        taskText.innerHTML = item

        const checkbox = document.createElement("input")

        checkbox.type = "checkbox"
        checkbox.addEventListener("change", function() {
            taskText.style.textDecoration = this.checked ? "line-through" : "none"
        })

        // Edit btn

        const editBtn = document.createElement("button")
        editBtn.textContent = "Edit"
        editBtn.classList.add("edit-btn")

        editBtn.addEventListener("click", function() {
            if(editBtn.textContent === "Edit") {
                const editInput = document.createElement("input")
                editInput.type = "text"
                editInput.value = taskText.textContent
                todoDiv.replaceChild(editInput, taskText)
                editBtn.textContent = "Save"
            }else {
                const updatedValue = todoDiv.querySelector("input[type='text']").value.trim()
                if(updatedValue !== "") {
                    listArray[index] = updatedValue
                    saveToLocalStorage()
                    renderList()
                } else {
                    alert("Task cannot be empty.")
                }
            }
        })

        // Delete btn

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "x"
        deleteBtn.classList.add("delete-btn")
        deleteBtn.addEventListener("click", function() {
            listArray.splice(index, 1)
            saveToLocalStorage()
            renderList()
        })

        todoDiv.appendChild(checkbox)
        todoDiv.appendChild(taskText)
        todoDiv.appendChild(editBtn)
        todoDiv.appendChild(deleteBtn)
        listItems.appendChild(todoDiv)

    })
    
}
