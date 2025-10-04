const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search');
const counter = document.getElementById('counter');

let tasks = [];

function renderTasks(filter = '') {
  taskList.innerHTML = '';
  const filteredTasks = tasks.filter(t => t.text.toLowerCase().includes(filter.toLowerCase()));

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    
    li.querySelector('.edit').addEventListener('click', () => {
      const newText = prompt('Edit task:', task.text);
      if(newText !== null && newText.trim() !== ''){
        tasks[index].text = newText.trim();
        renderTasks(searchInput.value);
      }
    });

    li.querySelector('.delete').addEventListener('click', () => {
      if(confirm('Are you sure you want to delete this task?')){
        tasks.splice(index,1);
        renderTasks(searchInput.value);
      }
    });

    taskList.appendChild(li);
  });

 
  counter.textContent = `Tasks: ${filteredTasks.length}`;
}


taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if(text !== ''){
    tasks.push({ text });
    taskInput.value = '';
    renderTasks(searchInput.value);
  }
});


searchInput.addEventListener('input', e => {
  renderTasks(e.target.value);
});

renderTasks();
