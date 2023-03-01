// находим элементы на странице

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];
if (localStorage.getItem('tasks')){
 tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task){
   renderTask(task);
});
checkEmptyList();

// Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи
tasksList.addEventListener('click', deleteTask);

// Отмечаем задачу завершённой
tasksList.addEventListener('click', doneTask);


// Функция удаления задач
function deleteTask(event) {

   // Проверяем что клик был не по кнопке "Удалить задачу"
   if (event.target.dataset.action !== "delete") {
      return
   }

   // Проверяем что клик был по кнопке "Удалить задачу"

   const parentNode = event.target.closest('.list-group-item');

// Определяем id задачи
const id = Number(parentNode.id) ;

/* Первый приём: находим индекс задачи в массиве */

// const index = tasks.findIndex(function(task){
//    return task.id === id;
// })

// Удаляем задачу из массива с задачами
// tasks.splice(index, 1)
//    

// Удаляем задачу через фильрацию массива
tasks = tasks.filter(function(task){
if (task.id === id){
return false
} else {
   return true
}
})
saveToLocalStorage();
parentNode.remove();
checkEmptyList();
}

// Функция добавления задачи
function addTask(event) {
   // Отменяет отправку формы
   event.preventDefault();

   // достаём текст задачи из поля ввода

   const taskText = taskInput.value;

   // Описываем задачу в виде обьекта
   const newTask = {
      id: Date.now(),
      text : taskText,
      done: false
   };

   // Добавляем массив в массив с задачами
   tasks.push(newTask);
   saveToLocalStorage();

   renderTask(newTask);

   // Очищаем поле ввода и возвращаем фокус на него

   taskInput.value = '';
   taskInput.focus();
   checkEmptyList();
   
}

// Функция отметки завершённой задачи
function doneTask(event) {
   // Проверяем что клик был не по кнопке "Задача выполнена"
   if (event.target.dataset.action !== "done") return;


   const parentNode = event.target.closest('.list-group-item');

   const id = Number(parentNode.id);

  const task = tasks.find(function(task){
      if (task.id === id){
         return true
      }
   });
   task.done = !task.done;
   saveToLocalStorage();
   const taskTitle = parentNode.querySelector('.task-title');
   taskTitle.classList.toggle('task-title--done')
   
}

function checkEmptyList(){
   if (tasks.length === 0){
const emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
<div class="empty-list__title">Список дел пуст</div>
</li>`
tasksList.insertAdjacentHTML('afterbegin', emptyListElement);
   }

   if(tasks.length > 0){
      const emptyListEl = document.querySelector('#emptyList');
      emptyListEl ? emptyListEl.remove() : null;
   }
}

function saveToLocalStorage(){
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task){
  // Формируем css класс
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  // Формируем разметку для новой задачи

  const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
<span class="${cssClass}">${task.text}</span>
<div class="task-item__buttons">
   <button type="button" data-action="done" class="btn-action">
      <img src="./img/tick.svg" alt="Done" width="18" height="18">
   </button>
   <button type="button" data-action="delete" class="btn-action">
      <img src="./img/cross.svg" alt="Done" width="18" height="18">
   </button>
</div>
</li>`;

  // Добавляем задачу на страницу

  tasksList.insertAdjacentHTML('beforeend', taskHtml);
}