let answersCompletedHtml;
let answersCompletedButton;

const getAnswersCompletedHtml = async () => {
  const url = '/components/answersModals/answersCompletedModal/answersCompletedModal.html';
  answersCompletedHtml = await htmlFetch({ url });

  return answersCompletedHtml;
};

const initializeAnswersCompletedConstants = () => {
  answersCompletedButton = document.querySelector('.buttonsSection__button--completed');
};

const initializeAnswersCompletedEvents = () => {
  answersCompletedButton?.addEventListener('click', () => {
    closeModal();
    loadDecisionMaking2Html();
  });
};

const loadAnswersCompleted = () => {
  initializeModalConstants();
  showModal(answersCompletedHtml);
  initializeAnswersCompletedConstants();
  initializeAnswersCompletedEvents();
};