let modalHtml;
let modalBackButton;
let modalRestartButton;
let modalBadAnswerHtml;
let modalBadAnswerText;

const getBadAnswerModal = async () => {
  const url = '/components/answersModals/badAnswerModal/badAnswerModal.html';
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
};

const initializeBadAnswerData = () => {
  const { lastValidIndex } = getCurrentDecisionMaking();

  let badAnswertextHtml = '';

  config?.decisionMaking?.[lastValidIndex]?.badAnswerText?.forEach((text) => {
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