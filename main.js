class BookCollection {
  #index;

  tasks;

  getTasks() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const tasksView = document.getElementById('tasks');
    tasksView.innerHTML = '';
    for (let i = 0; i < this.tasks.length; i += 1) {
      const { title } = this.tasks[i];
      const { author } = this.tasks[i];

      tasksView.innerHTML += `
      <div class="book-card" id = "${title}">
          <p class="book-title">${title}</p>
          <p> By </p>
          <p class="book-author">${author}</p>
          <button type="button" class="book-btn" onclick="books.deleteTask('${title}')">Remove</button>
          <hr>
      </div>`;
    }
  }

  saveTask() {
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

    this.getTasks();
    document.getElementById('form').reset();
  }

  deleteTask(title) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (let i = 0; i < tasks.length; i += 1) {
      if (this.tasks[i].title === title) {
        tasks.splice(i, 1);
      }
    }
    document.getElementById(title).remove();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

const books = new BookCollection();
books.getTasks();
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  books.saveTask();
});
