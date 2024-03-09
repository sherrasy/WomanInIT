const resumeForm = document.querySelector('.resume_form');
const resumeButton = resumeForm.querySelector('button[type=submit]');
const notesForm = document.querySelector('.notes_form');
const addNotesButton = notesForm.querySelector('button[type=submit]');
const deleteNotesButton = document.querySelector('#delete-notes');
const userName = document.querySelector('#username');
const notesList = document.querySelector('.notes_block__list');
const getName = () => {
  let name = prompt('Как к вам обращаться?');
  if (name == null || name == '') {
    name = 'Неопознанная леди';
  }
  localStorage.setItem('username', name);
};

const setResumeFormSubmit = () => {
  const resumeData = new FormData(resumeForm);
  const resumeInfo = {
    features: resumeData.getAll('features'),
    avatar: resumeData.get('avatar'),
    description: resumeData.get('description'),
  };
  console.log(resumeInfo);
  localStorage.setItem('resumeInfo', JSON.stringify(resumeInfo));
};

resumeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setResumeFormSubmit();
});

const setNotesFormSubmit = () => {
  const newLi = document.createElement('li');
  const text = document.createElement('span');
  const notesData = new FormData(notesForm);
  const note = notesData.get('note');
  text.append(note);
  notesList.appendChild(newLi).append(text);
  const notes = []
  notesList.querySelectorAll('li').forEach((item, i) => {
    notes.push({ id: i, text: item.innerText });
  });
  localStorage.setItem('notes', JSON.stringify(notes));
};

addNotesButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setNotesFormSubmit();
});

