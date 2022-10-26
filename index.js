let config;
let htmlForPdf;
let mainContainer;

// window.jsPDF = window.jspdf.jsPDF;

const getConfigJson = async () => {
  const url = '/config.json';
  config = (await jsonFetch({ url })) || {};

  return config;
};

const getHtmlForPdf = async () => {
  const url = '/components/results/pdf/pdf.html';
  htmlForPdf = await htmlFetch({ url });

  return htmlForPdf;
};

const restartOva = () => {
  window.location.href = '/';
};

const initializeOtherPages = async () => {

  const promisesArray = [
    getHtmlForPdf(),
    getGoodAnswerModal(),
    getBadAnswerModal(),
    getAnswersCompletedHtml(),
    getOvaPresentationHtml(),
    getUserRegisterHtml(),
    getInstructionsHtml(),
    getObjectivesHtml(),
    getThematicHtml(),
    getInstructionDescriptionHtml(),
    getInstructionGlosaryHtml(),
    getGlosaryHtml(),
    getOvaContextHtml(),
    getDecisionMakingHtml(),
    getDecisionMaking2Html(),
    getOvaContext2(),
    getResultsHtml(),
  ];

  await Promise.all(promisesArray);
};

const animateMainContainer = () => {
  const hasOpacity1 = mainContainer.classList.contains('opacity1');

  if (hasOpacity1) {
    mainContainer.classList.remove('opacity1');
    mainContainer.classList.add('opacity2');
  } else {
    mainContainer.classList.remove('opacity2');
    mainContainer.classList.add('opacity1');
  }
};

const initializeUserData = () => {
  const userData = JSON.stringify({
    name: '',
    lastName: '',
    decisionMaking: []
  });

  return userData;
};

const getUserDataWithOutUpdateRequestTime = () => {
  const currentData = JSON.parse(localStorage.getItem('ovaUserData') || initializeUserData());

  currentData.decisionMaking.totalGoodAnswers = countTrueState(currentData.decisionMaking);
  return currentData;
};

const setUserData = (newData) => {
  if (newData?.totalGoodAnswers !== undefined) delete newData.totalGoodAnswers;

  const currentData = getUserDataWithOutUpdateRequestTime();
  const newOvaUserData = { ...currentData, ...newData };
  localStorage.setItem('ovaUserData', JSON.stringify(newOvaUserData));

  return newOvaUserData;
};

const initializeMainConstants = async () => {
  config = await getConfigJson();
  mainContainer = document.querySelector('.mainContainer');
};

const initializeOvaUserData = async () => { getUserData(); };

const getUserData = () => {
  const requestTime = new Date();
  const currentUserData = getUserDataWithOutUpdateRequestTime();
  if (!currentUserData.timeStart) currentUserData.timeStart = requestTime;

  const newUserData = setUserData({ requestTime });

  return newUserData;
};

const initializeAndLoadFirstPage = async () => {
  await getWelcomeHtml();
  await loadWelcome();
};

const pageReady = async () => {
  await initializeMainConstants();
  await initializeOvaUserData();
  await initializeAndLoadFirstPage();
  await initializeOtherPages();
};

window.addEventListener('DOMContentLoaded', pageReady);