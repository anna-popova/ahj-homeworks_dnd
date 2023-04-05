//!извлечение из LocalStorage
function restoreBoardFromLocalStorage() {
  const boardState = JSON.parse(localStorage.getItem('boardState'));

  if (boardState) {
    const columnsContainer = document.querySelector('.board');
    columnsContainer.innerHTML = '';

    boardState.forEach(column => {
      const columnId = column.id;
      const columnTitle = column.title;
      const cards = column.cards;

      const columnTemplate = `
        <div class="column" draggable="true" data-column-id="${columnId}">
          <div class="column-header">
            <h2>${columnTitle}</h2>
            <a href="#" class="delete-column-link delete-icon">&times;</a>
          </div>
          <ul class="column-cards">
            ${cards.map(card => `
              <li class="card" draggable="true" data-card-id="${card.id}">
                <input type="checkbox" id="delete-card" />
                <label for="delete-card" class="delete-icon">&#x2715;</label>
                <p>${card.content}</p>
              </li>
            `).join('')}
            <li class="add-card-link">
              <a href="#">+ Add another card</a>
              <div class="add-card-section visually-hidden">
                <textarea class="textarea" rows="3"></textarea>
                <div class="add-card-actions">
                  <button class="add-card-btn btn btn-success">Add card</button>
                  <button class="cancel-card-btn btn btn-danger">Cancel</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      `;

      columnsContainer.insertAdjacentHTML('beforeend', columnTemplate);
    });
  }
}

window.onload = function () {
  restoreBoardFromLocalStorage();
}

//!добавление новой карточки
const addCardLink = document.querySelectorAll('.add-card-link');
console.log(addCardLink);
const addCardSection = document.querySelectorAll('.add-card-section');
console.log(addCardSection);

addCardLink.forEach((link, index) => {
  link.addEventListener('click', () => {
    addCardSection[index].classList.remove('visually-hidden');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const addCardButtons = document.querySelectorAll('.add-card-button');
  const cancelCardButtons = document.querySelectorAll('.cancel-card-button');

  addCardButtons.forEach(button => {
    button.addEventListener('click', handleAddCardButtonClick);
  });

  cancelCardButtons.forEach(button => {
    button.addEventListener('click', handleCancelCardButtonClick);
  });
});

function handleAddCardButtonClick(event) {
  const addCardSection = event.target.parentElement;
  const textarea = addCardSection.querySelector('.textarea');
  const cardContent = textarea.value.trim();
  const column = event.target.closest('.column');
  const columnCardsList = column.querySelector('.column-cards');

  if (cardContent) {
    const cardId = getRandomId();
    const cardTemplate = `
      <div class="card" draggable="true" data-card-id="${cardId}">
        <input type="checkbox" id="delete-card" />
        <label for="delete-card" class="delete-icon">&#x2715;</label>
        <p>${cardContent}</p>
      </div>
    `;

    columnCardsList.insertAdjacentHTML('beforeend', cardTemplate);

    updateLocalStorage();

    textarea.value = '';
    addCardSection.classList.add('visually-hidden');
  }
}

//!функция для создания рандомного id карточки
function getRandomId() {
  return Math.floor(Math.random() * 1000000);
}

//!функция для нажатия на кнопку cancel-card-button
function handleCancelCardButtonClick(event) {
  const addCardSection = event.target.parentElement;
  const textarea = addCardSection.querySelector('.textarea');

  textarea.value = '';
  addCardSection.classList.add('visually-hidden');
}

//!добавление и обновление LocalStorage
function updateLocalStorage() {
  const columns = document.querySelectorAll('.column');

  const boardState = [];

  columns.forEach(column => {
    const columnId = column.dataset.columnId;
    const columnTitle = column.querySelector('h2').textContent.trim();

    const cards = [];

    column.querySelectorAll('.card').forEach(card => {
      const cardId = card.dataset.cardId;
      console.log(cardId);
      const cardContent = card.querySelector('p').textContent.trim();
      console.log(cardContent);

      cards.push({
        id: cardId,
        content: cardContent
      });
    });

    boardState.push({
      id: columnId,
      title: columnTitle,
      cards: cards
    });
  });

  localStorage.setItem('boardState', JSON.stringify(boardState));
}
