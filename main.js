document.getElementById('form').addEventListener('submit', saveTask);

function saveTask(e) {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;

  let task = {
    title,
    author
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('form').reset();
  e.preventDefault();
}

function deleteTask(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let author = tasks[i].author;

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
