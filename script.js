let currentView = 'all'; // can be 'all', 'completed', or 'pending'

function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const taskList = document.getElementById('task-list');

  const li = document.createElement('li');

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = taskText;

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'task-buttons';

  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✅';
  completeBtn.className = 'complete-btn';
  completeBtn.addEventListener('click', function () {
    li.classList.toggle('completed');
    applyView(); // refresh the view
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', function () {
    taskList.removeChild(li);
  });

  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(buttonContainer);

  taskList.appendChild(li);
  input.value = '';
  applyView(); // update view
}

function toggleView() {
  if (currentView === 'all') {
    currentView = 'completed';
  } else if (currentView === 'completed') {
    currentView = 'pending';
  } else {
    currentView = 'all';
  }
  document.getElementById('toggle-view-btn').textContent = 'View: ' + capitalize(currentView);
  applyView();
}

function applyView() {
  const tasks = document.querySelectorAll('#task-list li');
  tasks.forEach(task => {
    const isCompleted = task.classList.contains('completed');

    if (currentView === 'all') {
      task.style.display = 'flex';
    } else if (currentView === 'completed') {
      task.style.display = isCompleted ? 'flex' : 'none';
    } else if (currentView === 'pending') {
      task.style.display = !isCompleted ? 'flex' : 'none';
    }
  });
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
