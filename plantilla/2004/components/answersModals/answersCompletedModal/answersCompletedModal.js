let answersCompletedHtml;
let answersCompletedText;
let answersCompletedButton;
let answersCompletedPictureContainer;

const getAnswersCompletedHtml = async () => {
  const url = 'components/answersModals/answersCompletedModal/answersCompletedModal.html';
  answersCompletedHtml = await htmlFetch({ url });

  return answersCompletedHtml;
};

const initializeAnswersCompletedConstants = () => {
  answersCompletedButton = document.querySelector('.answersCompletedConfirmButton');
  answersCompletedText = document.querySelector('.customModalContentContainer');
  answersCompletedPictureContainer = document.querySelector('.customModalPictureContainer');
};

const initializeAnswersCompletedEvents = () => {
  answersCompletedButton?.addEventListener('click', (e) => {
    closeModal();
    loadGoodAnswerModal(e); // closeModalAndLoadDecisionMaking
  });
};

const initializeAnswersCompletedData = () => {
  const { lastValidConfigDecision, lastValidIndex } = getCurrentDecisionMaking();

  if (answersCompletedPictureContainer) {
    answersCompletedPictureContainer.innerHTML = `
      <img alt="goodAnswerPicture" class="customModalPicture" src="assets/images/answersCompleted_${lastValidIndex+1}.png" />
    `;
  }

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