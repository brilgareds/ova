let modalHtml;
let modalBadAnswerHtml;

const getBadAnswerModal = async () => {
  const url = '/components/answersModals/badAnswerModal/badAnswerModal.html';
  modalBadAnswerHtml = await htmlFetch({ url });

  return modalBadAnswerHtml;
};

const initializeBadAnswerModalEvents = () => {
  modalBackButton?.addEventListener('click', closeModal);
  modalRestartButton?.addEventListener('click', restartOva);
};

const loadBadAnswerModal = () => {
  initializeModalConstants();
  showModal(modalBadAnswerHtml);
  initializeBadAnswerModalEvents();
};