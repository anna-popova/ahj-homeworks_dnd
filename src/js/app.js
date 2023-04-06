import getRandomId from "../js/getRandomId";
import updateLocalStorage from "../js/updateLocalStorage";
import restoreBoardFromLocalStorage from "../js/restoreBoardFromLocalStorage";

window.onload = function () {
  restoreBoardFromLocalStorage();
}

const columnsContainer = document.querySelector('.board');

columnsContainer.addEventListener('click', (e) => {
  //e.target - это конкретно тот элемент, на который мы кликнули
  const clickTarget = e.target;
  //console.log(clickTarget);

  //!добавление новой карточки
  const column = clickTarget.closest('.column');
  const addCardLink = column.querySelector('.add-card-link');
  const columnCardsList = column.querySelector('.column-cards');
  const addCardSection = column.querySelector('.add-card-section');
  const textarea = column.querySelector('.textarea');
  const addCardButton = column.querySelector('.add-card-button');
  const cancelCardButton = column.querySelector('.cancel-card-button');

  if (clickTarget === addCardLink) {
    addCardSection.classList.remove('visually-hidden');

    addCardButton.addEventListener('click', () => {
      const cardContent = textarea.value.trim();

        if (cardContent) {
          const cardId = getRandomId();
          const cardTemplate = `
            <div class="card" draggable="true" data-card-id="${cardId}">
            <button type="button" class="delete-card-button">&#x2715;</button>
              <p>${cardContent}</p>
            </div>
          `;

          columnCardsList.insertAdjacentHTML('beforeend', cardTemplate);

          updateLocalStorage();

          textarea.value = '';
          addCardSection.classList.add('visually-hidden');
        }
    });

    cancelCardButton.addEventListener('click', () => {
      textarea.value = '';
      addCardSection.classList.add('visually-hidden');
    });
  }

  //!удаление карточки
  const deleteCardButtons = column.querySelectorAll('.delete-card-button');

  deleteCardButtons.forEach(button => {
    if (clickTarget === button) {
      const card = button.closest('.card');
      card.remove();

      updateLocalStorage();
    }
  })
})
