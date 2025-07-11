let listArray = []
let inputEl = document.getElementById("input-el")
let addList = document.getElementById("add-list")
let listItems = document.getElementById("list-items")


addList.addEventListener("click", function() {
    if(inputEl.value.trim() !== "") {
        listArray.push(inputEl.value)
        inputEl.value = ""
        renderList()
    } 
})

inputEl.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        addList.click()
    }
})



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

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "x"
        deleteBtn.classList.add("delete-btn")
        deleteBtn.addEventListener("click", function() {
            listArray.splice(index, 1)
            renderList()
        })

        todoDiv.appendChild(checkbox)
        todoDiv.appendChild(taskText)
        todoDiv.appendChild(deleteBtn)
        listItems.appendChild(todoDiv)

    })
    
}
