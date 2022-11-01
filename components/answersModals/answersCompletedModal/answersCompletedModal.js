let answersCompletedHtml;
let answersCompletedButton;

const getAnswersCompletedHtml = async () => {
  const url = '/components/answersModals/answersCompletedModal/answersCompletedModal.html';
  answersCompletedHtml = await htmlFetch({ url });

  return answersCompletedHtml;
};

const initializeAnswersCompletedConstants = () => {
  answersCompletedButton = document.querySelector('.answersCompletedConfirmButton');
};

const initializeAnswersCompletedEvents = () => {
  answersCompletedButton?.addEventListener('click', closeModalAndLoadDecisionMaking);
};

const loadAnswersCompleted = () => {
  initializeModalConstants();
  showModal(answersCompletedHtml);
  initializeAnswersCompletedConstants();
  initializeAnswersCompletedEvents();
};