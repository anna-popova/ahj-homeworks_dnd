const container = document.querySelector(".container");
const addCardLinks = Array.from(container.querySelectorAll(".add-card-link"));
//console.log(addCardLinks);
const lists = Array.from(container.querySelectorAll(".list"));
//console.log(lists);

const allCards = [];

const todoCards = [];
const progressCards = [];
const doneCards = [];

//!Хранение в localStorage
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

  const todoCardsLength = data.arr[0].length;
  //console.log(todoCardsLength);
  const progressCardsLength = data.arr[1].length;
  //console.log(progressCardsLength);
  const doneCardsLength = data.arr[2].length;
  //console.log(doneCardsLength);

  for (let i = 0; i < todoCardsLength; i++) {
    //console.log(data.arr[0][i].text);
    const todoCardList = document.querySelector(".todo-card-list");

    addNewCard(data.arr[0][i].text, todoCardList, data.arr[0][i].id);

    todoCards.push({
      text: data.arr[0][i].text,
      id: data.arr[0][i].id,
    });
  }

  for (let i = 0; i < progressCardsLength; i++) {
    const progressCardList = document.querySelector(".progress-card-list");

    addNewCard(data.arr[1][i].text, progressCardList, data.arr[1][i].id);

    progressCards.push({
      text: data.arr[1][i].text,
      id: data.arr[1][i].id,
    });
  }

  for (let i = 0; i < doneCardsLength; i++) {
    const doneCardList = document.querySelector(".done-card-list");

    addNewCard(data.arr[2][i].text, doneCardList, data.arr[2][i].id);

    doneCards.push({
      text: data.arr[2][i].text,
      id: data.arr[2][i].id
    });
  }
}

window.onload = function () {
  //console.log(doneCards);
  restore();

  const cards = Array.from(document.querySelectorAll(".card"));
  //console.log(cards);

  //!удаляем карточку
  for (const card of cards) {
    card.addEventListener('mouseover', () => {
      console.log(card);
      console.log(card.id);

      const id = card.id;

      const deleteButton = card.querySelector('.delete-button');
      deleteButton.classList.add('active');

      deleteButton.addEventListener('click', () => {
        //TODO stop here. удалить карточку из массива, который сохраняется в localStorage
        card.remove();
      })

      card.addEventListener('mouseout', () => {
        deleteButton.classList.remove('active');
      })
    })
  }
};

//!добавляем новую карточку
for (const link of addCardLinks) {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const parentList = link.closest(".list");
    //console.log(parentList);
    const cardList = parentList.querySelector(".card-list");
    //console.log(cardList);
    const textarea = parentList.querySelector(".textarea");

    const addCardAction = parentList.querySelector(".add-card-action");
    addCardAction.classList.remove("visually-hidden");

    const cancelCardButton = parentList.querySelector(".cancel-card-button");

    cancelCardButton.addEventListener("click", () => {
      addCardAction.classList.add("visually-hidden");
      textarea.value = "";
    });

    const addCardButton = parentList.querySelector(".add-card-button");

    addCardButton.addEventListener("click", () => {
      if (textarea.value !== "") {
        const postText = textarea.value;
        //console.log(postText);

        const newId = getUniqueID();

        addNewCard(postText, cardList, newId);

        addCardsToArray(parentList, postText, newId);

        save(allCards);

        textarea.value = "";

        addCardAction.classList.add("visually-hidden");
      }
    });
  });
}

allCards.push(todoCards, progressCards, doneCards);
//console.log(allCards);

function addNewCard(text, parentList, id) {
  const li = document.createElement("li");
  li.className = "card";
  li.id = id;
  li.innerHTML = `<p>${text}</p>
                  <button class="delete-button" type="button"></button>`;
  parentList.prepend(li);
}

function addCardsToArray(list, text, id) {
  if (list.classList.contains("todo-list")) {
    todoCards.push({
      text,
      id,
    });
  } else if (list.classList.contains("progress-list")) {
    progressCards.push({
      text,
      id,
    });
  } else {
    doneCards.push({
      text,
      id,
    });
  }

  console.log(todoCards);
  console.log(progressCards);
  console.log(doneCards);
}

function getUniqueID() {
  for (let i = 0; i < 5; i++)
    return Date.now() + (Math.random() * 100000).toFixed();
}
