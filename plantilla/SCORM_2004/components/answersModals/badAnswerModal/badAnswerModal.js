let modalHtml;
let modalBackButton;
let modalRestartButton;
let modalBadAnswerHtml;
let modalBadAnswerText;
let scapeSymbolInModel;

const getBadAnswerModal = async () => {
  const url = 'components/answersModals/badAnswerModal/badAnswerModal.html';
  modalBadAnswerHtml = await htmlFetch({ url });

  return modalBadAnswerHtml;
};

const initializeBadAnswerModalEvents = () => {
  modalBackButton?.addEventListener('click', (e) => {
    nestedDecisionOptionSelected = undefined;
    closeModalAndLoadDecisionMaking(e);
  });
  modalRestartButton?.addEventListener('click', restartOva);
  scapeSymbolInModel?.addEventListener('click', () => closeModal());
};

const initializeBadAnswerConstanst = () => {
  modalRestartButton = document.querySelector('.badAnswerReloadButton');
  modalBackButton = document.querySelector('.badAnswerBackButton');
  modalBadAnswerText = document.querySelector('.customModalContentContainer');
  modalBadAnswerPictureContainer = document.querySelector('.customModalPictureContainer');
  scapeSymbolInModel = document.querySelector('.customModal__x');
};

const initializeBadAnswerData = () => {
  const { lastValidIndex } = getCurrentDecisionMaking();

  if (modalBadAnswerPictureContainer) {
    modalBadAnswerPictureContainer.innerHTML = `
      <img alt="incorrectAnswerPicture" src="assets/images/incorrectAnswer_${lastValidIndex+1}_${currentOptionSelected}.png" class="customModalPicture" />
    `;
  }

  let badAnswertextHtml = '';

  const value = (nestedDecisionOptionSelected)
    ? config?.decisionMaking?.[lastValidIndex]?.options?.[nestedDecisionOptionSelected-1]?.newDecision?.options?.[currentOptionSelected-1]?.badAnswerText
    : config?.decisionMaking?.[lastValidIndex]?.options?.[currentOptionSelected-1]?.badAnswerText;

  value?.forEach((text) => {
    badAnswertextHtml += `<p class="customModalContent">${formatText(text)}</p>`;
  });

  modalBadAnswerText.innerHTML = badAnswertextHtml;

  if (scapeSymbolInModel) {
    scapeSymbolInModel.style='display: block;';
  }
};

const loadBadAnswerModal = () => {
  initializeModalConstants();
  showModal(modalBadAnswerHtml);
  initializeBadAnswerConstanst();
  initializeBadAnswerData();
  initializeBadAnswerModalEvents();
};