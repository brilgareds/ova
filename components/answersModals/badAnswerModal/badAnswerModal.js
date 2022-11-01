let modalHtml;
let modalBackButton;
let modalRestartButton;
let modalBadAnswerHtml;

const getBadAnswerModal = async () => {
  const url = '/components/answersModals/badAnswerModal/badAnswerModal.html';
  modalBadAnswerHtml = await htmlFetch({ url });

  return modalBadAnswerHtml;
};

const initializeBadAnswerModalEvents = () => {
  modalBackButton?.addEventListener('click', closeModalAndLoadDecisionMaking);
  modalRestartButton?.addEventListener('click', closeModal);
};

const initializeBadAnswerConstanst = () => {
  modalRestartButton = document.querySelector('.badAnswerReloadButton');
  modalBackButton = document.querySelector('.badAnswerBackButton');
};

const loadBadAnswerModal = () => {
  initializeModalConstants();
  showModal(modalBadAnswerHtml);
  initializeBadAnswerConstanst();
  initializeBadAnswerModalEvents();
};