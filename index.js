let htmlForPdf;
let mainContainer;

// window.jsPDF = window.jspdf.jsPDF;

const restartOva = () => {
  deleteUserData();
  location.reload();
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
    name: 'The Name',
    lastName: 'The Lastname',
    institution: 'The Institution',
    situation: 'The Situation',
    course: 'The course name',
    courseId: 777,
    decisionMaking: [],
    unit: 'The Unit!!',
    ovaStarted: new Date(),
  });

  return userData;
};

const initializeOvaUserData = async () => { getUserData(); };

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