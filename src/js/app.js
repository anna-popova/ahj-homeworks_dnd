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

	console.log(data.arr);
	console.log(data.arr.length);

  //TODO: stop here. Достать данные из массива из LocalStogare и добавить их на страницу

	// for (let i = 0; i < data.arr.length; i++) {
	// 	//console.log(data.arr[i]);

	// 	const li = document.createElement('li');
	// 	li.classList.add('post');
	// 	li.innerHTML = `
	// 	<div class="post-header">
	// 		<span class="date">${data.arr[i].day}.${data.arr[i].month}.${data.arr[i].year}</span>
	// 		<span class="time">${data.arr[i].hours}:${data.arr[i].minutes}</span>
	// 	</div>
	// 	<p>${data.arr[i].text}</p>
	// 	<span class="geolocation">[${data.arr[i].latitude}, ${data.arr[i].longitude}]</span>
	// 	`;

	// 	postsList.prepend(li);

	// 	doneCards.push(data.arr[i]);
	// }
}

window.onload = function() {
	console.log(doneCards);
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
      };
    });
  });
}

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

  allCards.push({
    todoCards: todoCards,
    progressCards: progressCards,
    doneCards: doneCards,
  })

  //console.log(allCards);
}

