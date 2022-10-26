let customModals;
let modalBackButton;
let modalRestartButton;
let numberModal = 0;

const initializeModalConstants = () => {
  numberModal += 1;
  customModals = document.querySelector('.customModals');
};

const getFormatedHtmlModal = (modalHtml) => {
  const backButtonClass = 'buttonsSection__button--back';
  const newModalHtml = modalHtml
    .replace('class="customModalContainer"', `class="customModalContainer customModalContainer--${numberModal}"`)
    .replace(backButtonClass, `${backButtonClass} ${backButtonClass}--${numberModal}`);

  return newModalHtml;
};

const setNewModal = (newModalHtml) => {
  customModals.innerHTML = `${newModalHtml}${customModals.innerHTML}`;
  customModals.classList.add('customModals--active');
  modalBackButton = document.querySelector('.buttonsSection__button--back');
  modalRestartButton = document.querySelector('.buttonsSection__button--reload');
};

const getStarsHtml = () => {
  const userData = getUserData();
  const { totalGoodAnswers } = userData?.decisionMaking;
  const totalDecisionMaking = config.decisionMaking?.length;

  let startsHtml = '';

  for (let currentStar = 1; currentStar <= totalDecisionMaking; currentStar += 1) {
    const isAnActiveStar = (totalGoodAnswers >= currentStar);
    const starImageName = (isAnActiveStar) ? 'star-active.png' : 'star-inactive.png';

    startsHtml += `
      <div class="customModalStarPictureContainer">
        <img alt="incorrectAnswerPicture" src="/assets/images/${starImageName}" class="customModalStarPicture"  />
      </div>
    `;
  }

  return startsHtml;
};

const showModal = (modalHtml) => {
  const modalHtmlFormated = getFormatedHtmlModal(modalHtml);
  setNewModal(modalHtmlFormated);
};

const closeModal = () => {
  const currentModal = document.querySelector(`.customModalContainer--${numberModal}`);
  currentModal?.remove();
  customModals?.classList.remove('customModals--active');
};

const modalButtonContinueClick = () => {
  closeModal();
  const { ovaCompleted } = getCurrentDecisionMaking();
  if (ovaCompleted) return loadAnswersCompleted();

  loadDecisionMaking2Html();
};

const closeModalAndLoadDecisionMaking = () => {
  closeModal();
  loadDecisionMaking2Html();
};