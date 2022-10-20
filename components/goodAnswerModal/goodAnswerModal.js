let goodAnswerHtml;

const getGoodAnswerModal = async () => {
  const url = '/components/goodAnswerModal/goodAnswerModal.html';
  goodAnswerHtml = await htmlFetch({ url });

  return goodAnswerHtml;
};

const showGoodAnswerModal = () => {
  mainContainer.innerHTML = goodAnswerHtml;
};

const initializeGoodAnswerModalConstants = () => {
  
};

const loadGoodAnswerModal = () => {
  showGoodAnswerModal();
  initializeGoodAnswerModalConstants();
};
