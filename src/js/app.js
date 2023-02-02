const container = document.querySelector('.container');
const addCardLinks = Array.from(container.querySelectorAll('.add-card-link'));
//console.log(addCardLinks);
const lists = Array.from(container.querySelectorAll('.list'));
//console.log(lists);

const allCards = [];

const todoCards = [];
const progressCards = [];
const doneCards = [];

//!Серверную часть и загрузку также реализовывать не нужно, храните всё в памяти
function save(arr) {
	localStorage.editorData = JSON.stringify({
		arr,
	});
}

function restore() {
	const json = localStorage.editorData;

	if (!json) {
		return;
	}

	const data = JSON.parse(json);

	//console.log(data.arr);
  const todoCardsLength = data.arr[0].todoCards.length;
	//console.log(todoCardsLength);
  const progressCardsLength = data.arr[0].progressCards.length;
  //console.log(progressCardsLength);
  const doneCardsLength = data.arr[0].doneCards.length;
  //console.log(doneCardsLength);

  //TODO: stop here.

	for (let i = 0; i < todoCardsLength; i++) {
    //console.log(data.arr[0].todoCards[i].text);

    const todoCardList = document.querySelector('.todo-card-list');

    addNewCard(data.arr[0].todoCards[i].text, todoCardList);

    todoCards.push({
      text: data.arr[0].todoCards[i].text,
    })
  }

  for (let i = 0; i < progressCardsLength; i++) {
    //console.log(data.arr[0].progressCards[i].text);

    const progressCardList = document.querySelector('.progress-card-list');

    addNewCard(data.arr[0].progressCards[i].text, progressCardList);

    progressCards.push({
      text: data.arr[0].progressCards[i].text,
    })
  }

  for (let i = 0; i < doneCardsLength; i++) {
    //console.log(data.arr[0].doneCards[i].text);

    const doneCardList = document.querySelector('.done-card-list');

    addNewCard(data.arr[0].doneCards[i].text, doneCardList);

    doneCards.push({
      text: data.arr[0].doneCards[i].text,
    })
  }
}

window.onload = function() {
	//console.log(doneCards);
	restore();
};

//!добавляем новую карточку в список
for (const link of addCardLinks) {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const parentList = link.closest('.list');
    console.log(parentList);
    const cardList = parentList.querySelector('.card-list');
    //console.log(cardList);
    const textarea = parentList.querySelector('.textarea');

    const addCardAction = parentList.querySelector('.add-card-action');
    addCardAction.classList.remove('visually-hidden');

    const cancelCardButton = parentList.querySelector('.cancel-card-button');

    cancelCardButton.addEventListener('click', () => {
      addCardAction.classList.add('visually-hidden');
      textarea.value = '';
    });

    const addCardButton = parentList.querySelector('.add-card-button');

    addCardButton.addEventListener('click', () => {
      if (textarea.value !== '') {
        const postText = textarea.value;
        //console.log(postText);

        addNewCard(postText, cardList);

        addCardsToArray(parentList, postText);

        save(allCards);

        textarea.value = '';

        addCardAction.classList.add('visually-hidden');
      };
    });
  });
}

allCards.push({
  todoCards: todoCards,
  progressCards: progressCards,
  doneCards: doneCards,
})

//console.log(allCards);

function addNewCard(text, parentList) {
  const li = document.createElement('li');
  li.className = 'card';
  li.innerHTML = `<p>${text}</p>
                  <button class="delete-button" type="button"></button>`;
  parentList.prepend(li);
}

function addCardsToArray(list, text) {
  if (list.classList.contains('todo-list')) {
    todoCards.push({
      text,
    })
  } else if (list.classList.contains('progress-list')) {
    progressCards.push({
      text,
    })
  } else {
    doneCards.push({
      text,
    })
  }

  // console.log(todoCards);
  // console.log(progressCards);
  // console.log(doneCards);
}

