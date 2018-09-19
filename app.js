/*What we need

ui vars

event listeners






*/























//Define UI vars
const form      = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-tasks');
const filter    = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners();

//Function for above
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);
    
}


//Add task function
function addTask(e){

    if(taskInput.value === ''){
        alert('Add a task dude!');
        e.preventDefault();

        } else {
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to the li
        li.appendChild(link);

        //Append li to the ul
        taskList.appendChild(li);

        //Store in local storage
        storeItem(taskInput.value);

        //Clear input
        taskInput.value = '';

        e.preventDefault();
        }
}

//Remove task function
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
        //Remove from Local storage
        removeFromLS(e.target.parentElement.parentElement);
        }
    }
    
}

//Clear tasks function
function clearTasks(){
    if (confirm('Do you really want to remove all your tasks?')){
        //way 1
        // taskList.innerHtml = '';

        //way 2 [faster(not by much)]
        while(taskList.firstChild){         //tests if there is still any first child of the <ul>
            taskList.removeChild(taskList.firstChild);
        }
    }
    //Clear local storage
    clearLS();
}

//Filter tasks function
function filterTasks(e){
    //value from filter input in lower case (so that it will match the condition of if)
    const text = e.target.value.toLowerCase();          

    //iteration through all .collection-item(s) in lower case (to match our const=text)
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        //checks if there is an item that matches const text value
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';   //block = it shows
        } else {
            task.style.display = 'none';    //none = it hides
        }
    })
}

//Add to local storage
function storeItem(task){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Get tasks from Local Storage
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to the li
        li.appendChild(link);

        //Append li to the ul
        taskList.appendChild(li);
    })
}


//Remove from local storage
function removeFromLS(taskItem){                        //taskItem is equal to a whole <li> element
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if (taskItem.textContent === task){
            tasks.splice(index, 1)          //splice (z którego miejsca, ile rzeczy, co w zamian)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));   //because local storage needs to be new after changes
}

//Clear local storage
function clearLS(){
    localStorage.clear();
}




//--------------------------------------------------
/*PODSUMOWANIE
.toLowerCase()
.toUpperCase()

.indexOf()                      :sprawdza index elementu w zbiorze; -1 oznacza, że nie istnieje
    .indexOf(item) = -1         :item nie istnieje w zbiorze
    .indexOf(item) < -1         :item istnieje w zbiorze
    .indexOf(item) != -1        :item istnieje w zbiorze

.style.display = 'block'        :pokazuje element
.style.display = 'none'         :ukrywa element

.firstChild                     :pierwszy child jakiegoś elementu

.textContent                    :dokładne odzwierciedlenie tekstu w jakimś elemencie (włącznie z udziwnieniami ale bez tagów)
.innerText                      :odzwierciedlenie tekstu z elementu bez żadnych dodatkowych spacji czy innych pierdół, zwykły tekst
.innerHTML                      :tekst z elementu wraz z tagami html i całym ekwipażem

DOMContentLoaded                :event, gdy cały DOM się załaduje

*/