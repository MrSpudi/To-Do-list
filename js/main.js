// находим элементы на странице

const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

const tasks = [];

// Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи
tasksList.addEventListener('click', deleteTask);

// Отмечаем задачу завершённой
tasksList.addEventListener('click', doneTask);

// if (localStorage.getItem('tasksHTML')){
// tasksList.innerHTML = localStorage.getItem('tasksHTML');
// }

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

const index = tasks.findIndex(function(task){
   // if (task.id === id){
   //    return true
   // }
   return task.id === id;
})

// Удаляем задачу из массива с задачами
tasks.splice(index, )
   parentNode.remove();

   // Проверка. Если в списке нет задач, показываем блок "Список дел"
   if (tasksList.children.length === 1) {
      emptyList.classList.remove('none');
   }
   // saveHtmlToLs();
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

   // Формируем css класс
const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

   // Формируем разметку для новой задачи

   const taskHtml = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
 <span class="${cssClass}">${newTask.text}</span>
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

   // Очищаем поле ввода и возвращаем фокус на него

   taskInput.value = '';
   taskInput.focus();

   // Проверка. Если в списке задач более 1-го элемента, скрываем блок "Список дел"
   if (tasksList.children.length > 1) {
      emptyList.classList.add('none');
   }
   // saveHtmlToLs();
}

// Функция отметки завершённой задачи
function doneTask(event) {
   if (event.target.dataset.action !== "done") return;

   const parentNode = event.target.closest('.list-group-item');
   const taskTitle = parentNode.querySelector('.task-title');
   taskTitle.classList.toggle('task-title--done')
   // saveHtmlToLs();
}

// function saveHtmlToLs(){
//    localStorage.setItem('tasksHTML', tasksList.innerHTML);
// } 