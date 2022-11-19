let welcomeHtml;
let welcomeStartButton;
let welcomeEnviromentName;
let welcomeDetailContainer;
let welcomeEuphorycTextContainer;

const getWelcomeHtml = async () => {
  const url = 'components/welcome/welcome.html';
  welcomeHtml = await htmlFetch({ url });

  return welcomeHtml;
};

const showWelcomePage = () => {
  mainContainer.innerHTML = welcomeHtml;
};

const initializeWelcomeConstants = () => {
  welcomeStartButton = document.querySelector('.buttonsSection__button');
  welcomeEnviromentName = document.querySelector('.enviromentName');
  welcomeDetailContainer = document.querySelector('.welcomeDetail__textContainer');
  welcomeEuphorycTextContainer = document.querySelector('.euphorycTextContainer');
};

const initializeWelcomeData = () => {
  if (welcomeEnviromentName) {
    welcomeEnviromentName.innerHTML = `
      <span class="enviromentName_1">${formatText(config.welcome.enviromentName_1)}</span>
      <span class="enviromentName_2">${formatText(config.welcome.enviromentName_2)}</span>
    `;
  }

  if (welcomeDetailContainer) {
    welcomeDetailContainer.innerHTML = `
      <p class="welcomeDetail__text">${formatText(config.welcome.invitationMessage)}</p>
    `;
  }

  if (welcomeEuphorycTextContainer) {
    welcomeEuphorycTextContainer.innerHTML = `
      <h1 class="euphorycText">${formatText(config.welcome.euphorycText)}</h1>
    `;
  }
};

const initializeWelcomeEvents = () => {
  welcomeStartButton?.addEventListener('click', loadOvaPresentation);
};

const loadWelcome = () => {
  showWelcomePage();
  initializeWelcomeConstants();
  initializeWelcomeData();
  initializeWelcomeEvents();
  animateMainContainer();
};
