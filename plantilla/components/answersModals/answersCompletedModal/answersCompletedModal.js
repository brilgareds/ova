let answersCompletedHtml;
let answersCompletedText;
let answersCompletedButton;

const getAnswersCompletedHtml = async () => {
  const url = '/components/answersModals/answersCompletedModal/answersCompletedModal.html';
  answersCompletedHtml = await htmlFetch({ url });

  return answersCompletedHtml;
};

const initializeAnswersCompletedConstants = () => {
  answersCompletedButton = document.querySelector('.answersCompletedConfirmButton');
  answersCompletedText = document.querySelector('.customModalContentContainer');
};

const initializeAnswersCompletedEvents = () => {
  answersCompletedButton?.addEventListener('click', closeModalAndLoadDecisionMaking);
};

const initializeAnswersCompletedData = () => {
  const { lastValidConfigDecision } = getCurrentDecisionMaking();

  let answersCompletedTextHtml = '';

  lastValidConfigDecision?.goodAnswerText?.forEach((text) => {
    answersCompletedTextHtml += `<p class="customModalContent">${formatText(text)}</p>`
  });

  answersCompletedText.innerHTML = answersCompletedTextHtml;
};

const loadAnswersCompleted = () => {
  initializeModalConstants();
  showModal(answersCompletedHtml);
  initializeAnswersCompletedConstants();
  initializeAnswersCompletedData();
  initializeAnswersCompletedEvents();
};