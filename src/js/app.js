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
      li.innerHTML = `${addCardText.value}<button class="delete-button" type="button"></button>`;

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
const lists = document.querySelectorAll('.list');
const card = document.querySelector('.card');
let actualElement;

const onMouseOver = (e) => {
  const closest = document.elementFromPoint(e.clientX, e.clientY);
  const { top } = closest.getBoundingClientRect();

  if (closest.classList.contains('card')) {
    if (e.pageY > window.scrollY + top + closest.offsetHeight / 2) {
      closest.closest('.list').insertBefore(actualElement, closest.nextElementSibling);
    } else {
      closest.closest('.list').insertBefore(actualElement, closest);
    }
  } else if (closest.classList.contains('list')) {
    closest.append(actualElement);
  }
};

const onMouseUp = (e) => {
  actualElement.classList.remove('gragged');

  actualElement = undefined;

  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
};

for (const list of lists) {
  list.addEventListener('mousedown', (e) => {
    e.preventDefault();

    actualElement = e.target;
    
    actualElement.classList.add('gragged');

    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
  });
};
