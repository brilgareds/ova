let welcomeHtml;
let welcomeStartButton;

const getWelcomeHtml = async () => {
  const url = '/components/welcome/welcome.html';
  welcomeHtml = await htmlFetch({ url });

  return welcomeHtml;
};

const showWelcomePage = () => {
  mainContainer.innerHTML = welcomeHtml;
};

const initializeWelcomeConstants = () => {
  welcomeStartButton = document.querySelector('.buttonsSection__button');
};

const initializeWelcomeEvents = () => {
  welcomeStartButton?.addEventListener('click', loadOvaPresentation);
};

const loadWelcome = () => {
  showWelcomePage();
  initializeWelcomeConstants();
  initializeWelcomeEvents();
  animateMainContainer();
};
