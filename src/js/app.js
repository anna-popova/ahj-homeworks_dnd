const cards = document.querySelectorAll('.card');
const addCardLinks = document.querySelectorAll('.add-card-link');

//!добавление карточки
for (const link of addCardLinks) {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const addCardSection = link.parentElement;
    //console.log(addCardSection);

    const addCardAction = addCardSection.querySelector('.add-card-action');
    const addCardText = addCardSection.querySelector('.add-card-text');
    const addCardButton = addCardSection.querySelector('.add-card-button');
    const cancelCardButton = addCardSection.querySelector('.cancel-card-button');

    addCardAction.classList.remove('visually-hidden');
    link.classList.add('visually-hidden');

    addCardButton.addEventListener('click', () => {
      //скрываем текстовое поле с кнопками
      addCardAction.classList.add('visually-hidden');
      link.classList.remove('visually-hidden');

      //создаем новый элемент
      const li = document.createElement('li');
      li.className = 'card';
      li.innerHTML = `<p>${addCardText.value}</p><button class="delete-button" type="button"></button>`;

      //вставляем новый элемент в соответствующий список
      link.before(li);

      //очищаем форму
      addCardText.value = '';
    });

    cancelCardButton.addEventListener('click', () => {
      addCardAction.classList.add('visually-hidden');
      link.classList.remove('visually-hidden');
    });
  });
};

//!удаление карточки
for (const card of cards) {
  card.addEventListener('mouseover', () => {
    const deleteButton = card.querySelector('.delete-button');
    deleteButton.classList.add('active');

    deleteButton.addEventListener('click', () => {
      card.remove();
    })
  });

  card.addEventListener("mouseout", () => {
    const deleteButton = card.querySelector('.delete-button');
    deleteButton.classList.remove('active');
  });
};

//!перемещение карточки

