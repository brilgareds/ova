let goodAnswerHtml;
let goodAnswerStarsContainer;
let goodAnswerButtonContinue;

const getGoodAnswerModal = async () => {
  const url = '/components/answersModals/goodAnswerModal/goodAnswerModal.html';
  goodAnswerHtml = await htmlFetch({ url });

  return goodAnswerHtml;
};

const initializeGoodAnswerModalEvents = () => {
  goodAnswerButtonContinue?.addEventListener('click', () => {
    closeModal();
    const completed = ovaWasCompleted();
    if (completed) return loadAnswersCompleted();

    loadDecisionMaking2Html();
  });
};

const initializeGoodAnswerModal = () => {
  goodAnswerStarsContainer = document.querySelector('.customModalStartsPictureContainer');
  goodAnswerButtonContinue = document.querySelector('.buttonsSection__button--continue');
};

const initializeGoodAnswerModalData = () => {
  const userData = getUserData();
  const totalDecisionMaking = config.decisionMaking?.length;
  const decisionMakingFinished = userData.decisionMaking?.length;

  goodAnswerStarsContainer.innerHTML = `
    <img alt="incorrectAnswerPicture" src="/assets/images/stars_${decisionMakingFinished}-${totalDecisionMaking}.png" class="customModalPicture" />
  `;
};

const loadGoodAnswerModal = () => {
  initializeModalConstants();
  showModal(goodAnswerHtml);
  initializeGoodAnswerModal();
  initializeGoodAnswerModalData();
  initializeGoodAnswerModalEvents();
};
