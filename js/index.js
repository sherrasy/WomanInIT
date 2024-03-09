const resumeForm = document.querySelector('.resume_form');
const resumeButton = resumeForm.querySelector('button[type=submit]');
const notesForm = document.querySelector('.notes_form');
const addNotesButton = notesForm.querySelector('button[type=submit]');
const deleteNotesButton = resumeForm.querySelector('');

const setResumeFormSubmit = () => {
  const resumeData = new FormData(resumeForm);
  const resumeInfo = {
    features:resumeData.getAll('features'),
    avatar : resumeData.get('avatar'),
    description : resumeData.get('description'),
  }
  console.log(resumeInfo)
  localStorage.setItem('resumeInfo', JSON.stringify(resumeInfo));    
};

resumeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setResumeFormSubmit();
});


const setNotesFormSubmit = () => {
    const resumeData = new FormData(resumeForm);
    const resumeInfo = {
      features:resumeData.getAll('features'),
      avatar : resumeData.get('avatar'),
      description : resumeData.get('description'),
    }
    console.log(resumeInfo)
    localStorage.setItem('resumeInfo', JSON.stringify(resumeInfo));    
  };
  

addNotesButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setResumeFormSubmit();
});
