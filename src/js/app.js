import getRandomId from "../js/getRandomId";
import updateLocalStorage from "../js/updateLocalStorage";
import restoreBoardFromLocalStorage from "../js/restoreBoardFromLocalStorage";
import insertAboveTask from "./insertAboveTask";

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
              <p class="card-text">${cardContent}</p>
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

//!перетаскивание карточек
let actualElement;

columnsContainer.addEventListener('dragstart', (e) => {
  actualElement = e.target;
  //console.log(actualElement);

  actualElement.classList.add('is-dragging');

  const droppables = document.querySelectorAll('.column-cards');
  //console.log(droppables);

  droppables.forEach((zone) => {
    zone.addEventListener('dragover', (e) => {
      //console.log(e);
      e.preventDefault();

      const bottomCard = insertAboveTask(zone, e.clientY);
      //console.log(bottomCard);
      const curCard = document.querySelector('.is-dragging');

      if (!bottomCard) {
        zone.appendChild(curCard);
      } else {
        zone.insertBefore(curCard, bottomCard);
      }
    });
  });
});

columnsContainer.addEventListener('dragend', () => {
  actualElement.classList.remove('is-dragging');
});













// let actualElement;

// const onMouseOver = (e) => {
// 	//console.log(e);

// 	actualElement.style.top = e.clientY + 'px';
// 	actualElement.style.left = e.clientX + 'px';
// };

// const onMouseUp = (e) => {
// 	const mouseUpCard = e.target.closest('.card');
// 	console.log(mouseUpCard);
// 	const mouseUpColumn = e.target.closest('.column');
//   //console.log(mouseUpColumn);

//   //mouseUpColumn.insertBefore(actualElement, mouseUpCard);
//   mouseUpCard.insertAdjacentElement('afterend', actualElement);

//   actualElement.classList.remove('dragged');

//   actualElement = undefined;

//   document.documentElement.removeEventListener('mouseup', onMouseUp);
//   document.documentElement.removeEventListener('mouseover', onMouseOver);
// };

// columnsContainer.addEventListener('mousedown', (e) => {
//   if (e.target.classList.contains('card') || e.target.classList.contains('card-text')) {
//     e.preventDefault();

//     actualElement = e.target;

//     if (e.target.classList.contains('card-text')) {
//       actualElement = e.target.closest('.card');
//     }

//     //console.log(actualElement);
  
//     const width = e.target.closest('.card').offsetWidth;
  
//     actualElement.classList.add('dragged');
//     actualElement.style.width = width + 'px';
  
//     document.documentElement.addEventListener('mouseup', onMouseUp);
//     document.documentElement.addEventListener('mouseover', onMouseOver);
//   }
// });
