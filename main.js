function getTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for (let i = 0; i < tasks.length; i += 1) {
    const { title } = tasks[i];
    const { author } = tasks[i];

    tasksView.innerHTML += `
    <div class="book-card">
        <p class="book-title">${title}</p>
        <p class="book-author">${author}</p>
        <button type="button" class="book-btn" onclick="deleteTask('${title}')">Remove</button>
    </div>
    <hr>`;
  }
}
getTasks();

function saveTask(e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  const task = {
    title,
    author,
  };

  if (localStorage.getItem('tasks') === null) {
    const tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('form').reset();
  e.preventDefault();
}

function deleteTask(title) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].title === title) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}
deleteTask();

document.getElementById('form').addEventListener('submit', saveTask);
