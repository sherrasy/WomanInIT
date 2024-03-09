const input = document.querySelector(".form-questions .nickname"); // Получаем элемент ввода ника
const textarea = document.querySelector(".form-questions .textarea"); // Получаем элемент ввода текста вопроса
const button = document.querySelector(".form-questions button"); // Получаем кнопку добавления
const reviewsList = document.querySelector(
	".container_questions_and_fears .list_questions"
); // Получаем элемент списка вопросов (div)

let Questions = []; // Создаем пустой массив для хранения вопросов

// Загрузка вопросов из Local Storage при загрузке страницы
if (window.localStorage.getItem("Questions")) {
	Questions = JSON.parse(window.localStorage.getItem("Questions"));
}

// Функция сохранения вопросов в Local Storage
function saveQuestionsToLocalStorage() {
	window.localStorage.setItem("Questions", JSON.stringify(Questions));
}

// Функция добавления вопроса в список
function addQuestion() {
	const inputWhitespace = input.value.trim();
	let isValid = true;
	const nickname = input.value.replace(/</g, "‹").replace(/>/g, "›"); // Получаем значение из поля ввода ника и сохраняем его в переменной nickname
	const questionText = textarea.value.trim(); // Получаем значение из поля ввода вопроса и сохраняем его в переменной questionText
	let questionObj = {}; // Создаем пустой объект для хранения ника и текста вопроса
	if (!input.checkValidity() || inputWhitespace === "" || questionText === "") {
		// Если текущий элемент ввода не проходит валидацию
		input.classList.add("error"); // Добавляем класс ошибки для этого элемента
		input.nextElementSibling.textContent =
			input.validationMessage || "Пожалуйста, введите имя."; // Отображаем сообщение об ошибке или об ошибке пустой задачи
		textarea.classList.add("error"); // Добавляем класс ошибки для этого элемента
		textarea.nextElementSibling.textContent =
			textarea.validationMessage || "Пожалуйста, заполните поле."; // Отображаем сообщение об ошибке или об ошибке пустой задачи
		isValid = false;
	}
	if (isValid) {
		input.nextElementSibling.textContent = "";
		textarea.nextElementSibling.textContent = "";
		input.classList.remove("error");
		textarea.classList.remove("error");
		questionObj.nickname = nickname; // Записываем в объект ник
		questionObj.questionText = questionText; // Записываем в объект текст вопроса
		Questions.push(questionObj); // Добавляем объект в массив
		input.value = ""; // Очищаем поле ввода ника
		textarea.value = ""; // Очищаем поле ввода текста вопроса
		updateQuestionsList(); // Обновляем список вопросов
		saveQuestionsToLocalStorage();
	}
}

// Функция обновления списка вопросов
function updateQuestionsList() {
	reviewsList.innerHTML = ""; // Очищаем список вопросов

	// Создаем карточки для каждого вопроса
	for (let i = 0; i < Questions.length; i++) {
		const newArticle = document.createElement("article"); // Создаем новый элемент article
		newArticle.classList.add("question_card"); // Добавляем класс в новый article
		const newDiv = document.createElement("div");
		newDiv.classList.add("question_card__content");
		const newPNickname = document.createElement("p");
		newPNickname.classList.add("question_nickname");
		const newPText = document.createElement("p");
		newPText.classList.add("question_text");

		const newQuestionObj = Questions[i];
		const newQuestionNickname = newQuestionObj["nickname"];
		const newQuestionText = newQuestionObj.questionText;
		newPNickname.textContent = newQuestionNickname; // Добавляем в значение p ник по ключу nickname из объекта в массиве
		newPText.textContent = newQuestionText; // Добавляем в значение p текст вопроса по ключу questionText из объекта в массиве

		newDiv.append(newPNickname); // Добавляем элемент в новый div
		newDiv.append(newPText); // Добавляем элемент в новый div
		newArticle.append(newDiv); // Добавляем div в новый article
		reviewsList.append(newArticle); // Добавляем новый article в список вопросов
	}

	// Прокручиваем контейнер вниз, чтобы отобразить последние добавленные вопросы
	reviewsList.scrollTop = reviewsList.scrollHeight;
}

// Обработчик клика на кнопку добавления вопроса
button.addEventListener("click", addQuestion);

// Инициализация списка вопросов при загрузке страницы
updateQuestionsList();
