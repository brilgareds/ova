let modalHtml;
let modalBackButton;
let modalRestartButton;
let modalBadAnswerHtml;
let modalBadAnswerText;

const getBadAnswerModal = async () => {
  const url = 'components/answersModals/badAnswerModal/badAnswerModal.html';
  modalBadAnswerHtml = await htmlFetch({ url });

  return modalBadAnswerHtml;
};

const initializeBadAnswerModalEvents = () => {
  modalBackButton?.addEventListener('click', closeModalAndLoadDecisionMaking);
  modalRestartButton?.addEventListener('click', restartOva);
};

const initializeBadAnswerConstanst = () => {
  modalRestartButton = document.querySelector('.badAnswerReloadButton');
  modalBackButton = document.querySelector('.badAnswerBackButton');
  modalBadAnswerText = document.querySelector('.customModalContentContainer');
  modalBadAnswerPictureContainer = document.querySelector('.customModalPictureContainer');
};

const initializeBadAnswerData = () => {
  const { lastValidIndex } = getCurrentDecisionMaking();

  if (modalBadAnswerPictureContainer) {
    modalBadAnswerPictureContainer.innerHTML = `
      <img alt="incorrectAnswerPicture" src="assets/images/incorrectAnswer_${lastValidIndex+1}_${currentOptionSelected}.png" class="customModalPicture" />
    `;
  }

  let badAnswertextHtml = '';

  config?.decisionMaking?.[lastValidIndex]?.options?.[currentOptionSelected-1]?.badAnswerText?.forEach((text) => {
    badAnswertextHtml += `<p class="customModalContent">${formatText(text)}</p>`;
  });

  modalBadAnswerText.innerHTML = badAnswertextHtml;
};

const loadBadAnswerModal = () => {
  initializeModalConstants();
  showModal(modalBadAnswerHtml);
  initializeBadAnswerConstanst();
  initializeBadAnswerData();
  initializeBadAnswerModalEvents();
};