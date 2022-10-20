let modalHtml;
let customModals;
let modalBackButton;
let modalRestartButton;
let numberModal = 0;

const initializeModalConstants = () => {
  numberModal += 1;
  customModals = document.querySelector('.customModals');
};

const getFormatedHtmlModal = () => {
  const backButtonClass = 'buttonsSection__button--back';
  const newModalHtml = modalHtml
    .replace('class="customModalContainer"', `class="customModalContainer customModalContainer--${numberModal}"`)
    .replace(backButtonClass, `${backButtonClass} ${backButtonClass}--${numberModal}`);

  return newModalHtml;
};

const setNewModal = (newModalHtml) => {
  customModals.innerHTML = `${newModalHtml}${customModals.innerHTML}`;
  customModals.classList.add('customModals--active');
  modalBackButton = document.querySelector('.buttonsSection__button--back');
  modalRestartButton = document.querySelector('.buttonsSection__button--reload');
};

const showModal = () => {
  const newModalHtml = getFormatedHtmlModal();
  setNewModal(newModalHtml);
};

const closeModal = () => {
  const currentModal = document.querySelector(`.customModalContainer--${numberModal}`);
  currentModal?.remove();
  customModals.classList.remove('customModals--active');
};

const initializeModalEvents = () => {
  modalBackButton?.addEventListener('click', closeModal);
  modalRestartButton?.addEventListener('click', restartOva);
};

const loadBadAnswerModal = () => {
  initializeModalConstants();
  showModal();
  initializeModalEvents();
};

const getBadAnswerModal = async () => {
  const url = '/components/badAnswerModal/badAnswerModal.html';
  modalHtml = await htmlFetch({ url });

  return modalHtml;
};