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
    console.log('cmi._children:', api?.LMSGetValue("cmi._children"));
  } catch (e) {}

  try {
    console.log('cmi._version:', api?.LMSGetValue("cmi._version"));
  } catch (e) {}

  try {
    console.log('cmi.core._children:', api?.LMSGetValue("cmi.core._children"));
  } catch (e) {}

  try {
    console.log('cmi.core.student_id:', api?.LMSGetValue("cmi.core.student_id"));
  } catch (e) {}

  try {
    console.log('cmi.core.student_name:', api?.LMSGetValue("cmi.core.student_name"));
  } catch (e) {}

  try {
    console.log('cmi.core.lesson_location:', api?.LMSGetValue("cmi.core.lesson_location"));
  } catch (e) {}

  try {
    console.log('cmi.core.credit:', api?.LMSGetValue("cmi.core.credit"));
  } catch (e) {}

  try {
    console.log('cmi.core.lesson_status:', api?.LMSGetValue("cmi.core.lesson_status"));
  } catch (e) {}

  try {
    console.log('cmi.core.suspend.data:', api?.LMSGetValue("cmi.core.suspend.data"));
  } catch (e) {}
  
  try {
    console.log('cmi.suspend.data:', api?.LMSGetValue("cmi.suspend.data"));
  } catch (e) {}

  try {
    console.log('suspend.data:', api?.LMSGetValue("suspend.data"));
  } catch (e) {}

  try {
    console.log('cmi.core.exit:', api?.LMSGetValue("cmi.core.exit"));
  } catch (e) {}

  try {
    console.log('cmi.core.entry:', api?.LMSGetValue("cmi.core.entry"));
  } catch (e) {}

  try {
    console.log('cmi.core.score._children:', api?.LMSGetValue("cmi.core.score._children"));
  } catch (e) {}

  try {
    console.log('cmi.core.score.raw:', api?.LMSGetValue("cmi.core.score.raw"));
  } catch (e) {}

  try {
    console.log('cmi.core.score.min:', api?.LMSGetValue("cmi.core.score.min"));
  } catch (e) {}

  try {
    console.log('cmi.core.score.max:', api?.LMSGetValue("cmi.core.score.max"));
  } catch (e) {}

  try {
    console.log('cmi.core.session_time:', api?.LMSGetValue("cmi.core.session_time"));
  } catch (e) {}

  try {
    console.log('cmi.core.total_time:', api?.LMSGetValue("cmi.core.total_time"));
  } catch (e) {}

  try {
    console.log('cmi.core.lesson_mode:', api?.LMSGetValue("cmi.core.lesson_mode"));
  } catch (e) {}

  try {
    console.log('cmi.suspend_data:', api?.LMSGetValue("cmi.suspend_data"));
  } catch (e) {}

  try {
    console.log('cmi.launch_data:', api?.LMSGetValue("cmi.launch_data"));
  } catch (e) {}

  try {
    console.log('cmi.comments:', api?.LMSGetValue("cmi.comments"));
  } catch (e) {}

  try {
    console.log('cmi.evaluation.comments._count:', api?.LMSGetValue("cmi.evaluation.comments._count"));
  } catch (e) {}

  try {
    console.log('cmi.evaluation.comments._children:', api?.LMSGetValue("cmi.evaluation.comments._children"));
  } catch (e) {}

  try {
    console.log('cmi.evaluation.comments.n.content:', api?.LMSGetValue("cmi.evaluation.comments.n.content"));
  } catch (e) {}

  try {
    console.log('cmi.evaluation.comments.n.location:', api?.LMSGetValue("cmi.evaluation.comments.n.location"));
  } catch (e) {}

  try {
    console.log('cmi.evaluation.comments.n.time:', api?.LMSGetValue("cmi.evaluation.comments.n.time"));
  } catch (e) {}

  try {
    console.log('cmi.comments_from_lms:', api?.LMSGetValue("cmi.comments_from_lms"));
  } catch (e) {}

  try {
    console.log('cmi.objectives._children:', api?.LMSGetValue("cmi.objectives._children"));
  } catch (e) {}

  try {
    console.log('cmi.objectives._count:', api?.LMSGetValue("cmi.objectives._count"));
  } catch (e) {}

  try {
    console.log('cmi.objectives.n.id:', api?.LMSGetValue("cmi.objectives.n.id"));
  } catch (e) {}

  try {
    console.log('cmi.objectives.n.score._children:', api?.LMSGetValue("cmi.objectives.n.score._children"));
  } catch (e) {}

  try {
    console.log('cmi.objectives.n.score.raw:', api?.LMSGetValue("cmi.objectives.n.score.raw"));
  } catch (e) {}

  try {
    console.log('cmi.objectives.n.score.min:', api?.LMSGetValue("cmi.objectives.n.score.min"));
  } catch (e) {}

  try {
    console.log('cmi.objectives.n.score.max:', api?.LMSGetValue("cmi.objectives.n.score.max"));
  } catch (e) {}

  try {
    console.log('cmi.objectives.n.status:', api?.LMSGetValue("cmi.objectives.n.status"));
  } catch (e) {}

  try {
    console.log('cmi.student_data._children:', api?.LMSGetValue("cmi.student_data._children"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.attempt_number:', api?.LMSGetValue("cmi.student_data.attempt_number"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.tries.n.score.raw:', api?.LMSGetValue("cmi.student_data.tries.n.score.raw"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.tries.n.score.min:', api?.LMSGetValue("cmi.student_data.tries.n.score.min"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.tries.n.score.max:', api?.LMSGetValue("cmi.student_data.tries.n.score.max"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.tries.n.status:', api?.LMSGetValue("cmi.student_data.tries.n.status"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.tries.n.time:', api?.LMSGetValue("cmi.student_data.tries.n.time"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.mastery_score:', api?.LMSGetValue("cmi.student_data.mastery_score"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.max_time_allowed:', api?.LMSGetValue("cmi.student_data.max_time_allowed"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.time_limit_action:', api?.LMSGetValue("cmi.student_data.time_limit_action"));
  } catch (e) {}

  try {
    console.log('cmi.student_data.tries_during_lesson:', api?.LMSGetValue("cmi.student_data.tries_during_lesson"));
  } catch (e) {}

  try {
    console.log('cmi.student_preference._children:', api?.LMSGetValue("cmi.student_preference._children"));
  } catch (e) {}

  try {
    console.log('cmi.student_preference.audio:', api?.LMSGetValue("cmi.student_preference.audio"));
  } catch (e) {}

  try {
    console.log('cmi.student_preference.language:', api?.LMSGetValue("cmi.student_preference.language"));
  } catch (e) {}

  try {
    console.log('cmi.student_preference.speed:', api?.LMSGetValue("cmi.student_preference.speed"));
  } catch (e) {}

  try {
    console.log('cmi.student_preference.text:', api?.LMSGetValue("cmi.student_preference.text"));
  } catch (e) {}

  try {
    console.log('cmi.interactions._children:', api?.LMSGetValue("cmi.interactions._children"));
  } catch (e) {}

  try {
    console.log('cmi.interactions._count:', api?.LMSGetValue("cmi.interactions._count"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.id:', api?.LMSGetValue("cmi.interactions.n.id"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.objectives._count:', api?.LMSGetValue("cmi.interactions.n.objectives._count"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.objectives.n.id:', api?.LMSGetValue("cmi.interactions.n.objectives.n.id"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.time:', api?.LMSGetValue("cmi.interactions.n.time"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.type:', api?.LMSGetValue("cmi.interactions.n.type"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.correct_responses._count:', api?.LMSGetValue("cmi.interactions.n.correct_responses._count"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.correct_responses.n.pattern:', api?.LMSGetValue("cmi.interactions.n.correct_responses.n.pattern"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.weighting:', api?.LMSGetValue("cmi.interactions.n.weighting"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.student_response:', api?.LMSGetValue("cmi.interactions.n.student_response"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.result:', api?.LMSGetValue("cmi.interactions.n.result"));
  } catch (e) {}

  try {
    console.log('cmi.interactions.n.latency:', api?.LMSGetValue("cmi.interactions.n.latency"));
  } catch (e) {}

  try {
    console.log('nav.event:', api?.LMSGetValue("nav.event"));
  } catch (e) {}

  await initializeMainConstants();
  await initializeOvaUserData();
  await initializeAndLoadFirstPage();
  await initializeOtherPages();
};

window.addEventListener('DOMContentLoaded', pageReady);