let config;
let mainContainer;

const getConfigJson = async () => {
  const url = '/config.json';
  config = (await jsonFetch({ url })) || {};

  return config;
};

const restartOva = () => {
  window.location.href = '/';
};

const initializeOtherPages = async () => {

  const promisesArray = [
    getGoodAnswerModal(),
    getBadAnswerModal(),
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
  ];

  await Promise.all(promisesArray);
};

const initializeAndLoadMainPage = async () => {
  await getUserRegisterHtml();
  loadRegisterUser();
};

const initializeMainConstants = () => {
  mainContainer = document.querySelector('.mainContainer');
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

  return currentData;
};

const setUserData = (newData) => {
  const currentData = getUserDataWithOutUpdateRequestTime();
  const newOvaUserData = { ...currentData, ...newData };
  localStorage.setItem('ovaUserData', JSON.stringify(newOvaUserData));

  return newOvaUserData;
};

const getUserData = () => {
  const newData = setUserData({ requestTime: new Date() });

  return newData;
};

const pageReady = async () => {
  initializeMainConstants()
  getUserData();
  await getConfigJson();
  await initializeAndLoadMainPage();
  await initializeOtherPages();
};

window.addEventListener('DOMContentLoaded', pageReady);