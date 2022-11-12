let goodAnswerHtml;
let goodAnswerStarsSection;
let goodAnswerButtonContinue;

const getGoodAnswerModal = async () => {
  const url = 'components/answersModals/goodAnswerModal/goodAnswerModal.html';
  goodAnswerHtml = await htmlFetch({ url });

  return goodAnswerHtml;
};

const initializeGoodAnswerModalEvents = () => {
  goodAnswerButtonContinue?.addEventListener('click', modalButtonContinueClick);
};

const initializeGoodAnswerModal = () => {
  goodAnswerStarsSection = document.querySelector('.customModalStarsPictureContainer');
  goodAnswerButtonContinue = document.querySelector('.buttonsSection__button--continueButton');
};

const initializeGoodAnswerModalData = () => {
  const starsHtml = getStarsHtml();

  goodAnswerStarsSection.innerHTML = starsHtml;
};

const loadGoodAnswerModal = () => {
  initializeModalConstants();
  showModal(goodAnswerHtml);
  initializeGoodAnswerModal();
  initializeGoodAnswerModalData();
  initializeGoodAnswerModalEvents();
};
