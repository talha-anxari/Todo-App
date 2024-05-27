const addBtn = document.querySelector(`#add_btn`),
      newTaskInput = document.querySelector(`#wrapper input`),
      tasksContainer = document.querySelector(`#tasks`),
      countValue = document.querySelector(`.count_value`),
      error = document.querySelector(`#error`);

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = 'none';
    if(!taskName){
        setTimeout(() => {
            error.style.display = 'block';
        }, 200);
        return;
    }

    const task = `<div class="task">
    <input type="checkbox" class="task_check">
    <span class="task_name">${taskName}</span>
    <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
    <button class="delete"><i class="fa-solid fa-trash"></i></button>
</div>`
tasksContainer.insertAdjacentHTML('beforeend', task);

const deleteButton = document.querySelectorAll(`.delete`);
deleteButton.forEach(button =>{
    button.onclick = () => {
        button.parentNode.remove();
        taskCount -= 1;
        displayCount(taskCount);
    };
});

const editButton = document.querySelectorAll(`.edit`);
editButton.forEach((editBtn) => {
    editBtn.onclick = (e) => {
        let targetElement = e.target;
        if(!(e.target.className == 'edit')){
            targetElement = e.target.parentElement;
        }
        newTaskInput.value = targetElement.previousElementSibling?.innerText;
        targetElement.parentNode.remove();
        taskCount -= 1;
        displayCount(taskCount);
    };
});
const taskCheck = document.querySelectorAll(`.task_check`);
taskCheck.forEach((checkBox) => {
    checkBox.onchange = () => {
        checkBox.nextElementSibling.classList.toggle('completed');
        if(checkBox.checked){
            taskCount -= 1;
        }else{
            taskCount += 1;
        }
        displayCount(taskCount);
    };
});
taskCount += 1;
displayCount(taskCount);
newTaskInput.value = '';
};

addBtn.addEventListener('click', addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = '';
}

