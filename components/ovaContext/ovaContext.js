let ovaContextHtml;
let ovaContextNextButton;

const getOvaContextHtml = async () => {
  const url = '/components/ovaContext/ovaContext.html';
  ovaContextHtml = await htmlFetch({ url });

  return ovaContextHtml;
};

const initializeOvaContextValues = () => {
  ovaContextNextButton = document.querySelector('.ovaContext__nextButton');
};

const initializeOvaContextEvents = () => {
  ovaContextNextButton?.addEventListener('click', loadDecisionMakingHtml)
};

const loadOvaContextHtml = () => {
  mainContainer.innerHTML = ovaContextHtml;
  mainContainer.classList.add('ovaContextBackground');

  initializeOvaContextValues();
  initializeOvaContextEvents();
};