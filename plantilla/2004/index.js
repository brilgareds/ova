let api;
let htmlForPdf;
let mainContainer;
let apiHandle = null;
let countOvaCompleted = 0;

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
    name: api.LMSGetValue("cmi.core.student_name"),
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

const findAPI = (win) => {
  let findAPITries = 0;

  while ((win.API == null) && (win.parent != null) && (win.parent != win)){
    findAPITries++;

    if (findAPITries > 7){
      alert("Error finding API -- too deeply nested.");
      return null;
    }

    win = win.parent;
  }

  return win.API;
};

const getAPI = () => {
  let theAPI = findAPI(window);

  if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined")){
    theAPI = findAPI(window.opener);
  }

  if (theAPI == null)  {
    alert("Unable to find an API adapter");
  }

  return theAPI
};

const getAPIHandle = () => {
  if (apiHandle == null) {
    apiHandle = getAPI();
  }

  return apiHandle;
}

const pageReady = async () => {
  deleteUserData();
  api = getAPIHandle();
  api.LMSInitialize('');
  const name = api?.LMSGetValue("cmi.core.student_name");
  if (!name) return alert('Error al obtener información desde el LMS!!');

  try {
    console.log('Full Core Data 1:', api?.LMSGetValue("cmi.core"));
  } catch (e) { }

  try {
    console.log('Full Core Data 2:', api?.LMSGetValue("cmi.student_data._children"));
  } catch (e) { }

  await initializeMainConstants();
  await initializeOvaUserData();
  await initializeAndLoadFirstPage();
  await initializeOtherPages();
};

window.addEventListener('DOMContentLoaded', pageReady);