let resultsHtml;
let resultsPreviousButton;
let resultsRestartButton;
let resultsStartContainer;
let resultsGoodAnswers;
let resultsBadAnswers;
let resultsDownloadButton;
let resultsText;

const getResultsHtml = async () => {
  const url = 'components/results/results.html';
  resultsHtml = await htmlFetch({ url });

  return resultsHtml;
};

const initializeResultConstanst = () => {
  resultsRestartButton = document.querySelector('.buttonsSection__button--reloadButton');
  resultsPreviousButton = document.querySelector('.buttonsSection__button--backButton');
  resultsDownloadButton = document.querySelector('.buttonsSection__button--downloadButton');
  resultsStartContainer = document.querySelector('.detailPoints__starsCompletedContainer');
  resultsTotalPoints = document.querySelector('.detailPoints__bigNumber');
  resultsGoodAnswers = document.querySelector('.goodAnswers__bigNumber');
  resultsBadAnswers = document.querySelector('.badAnswers__bigNumber');
  resultsText = document.querySelector('.results__finalTextContainer');
};

const downloadResultsPdf = async () => {
  // window.open('reports.html', '_blank');
  // window.open('reports.html', '_self');
  // window.open('reports.html', '_parent');
  // window.open('reports.html', '_top');

  if (api) window.open('reports.html', '_top');
  else window.open('reports.html', '_blank');
};

const initializeResultsEvents = () => {
  resultsRestartButton?.addEventListener('click', restartOva);
  resultsDownloadButton?.addEventListener('click', downloadResultsPdf);
  resultsPreviousButton?.addEventListener('click', loadOvaContext2Html);
};

const showResults = () => {
  mainContainer.innerHTML = resultsHtml;
  animateMainContainer();
};

const initializeResultData = () => {
  const {  totalPointsFormated, totalGoodAnswers, totalBadAnswers } = userParticipation();

  countOvaCompleted += 1;
  resultsStartContainer.innerHTML = getStarsHtml();
  resultsTotalPoints.innerHTML = totalPointsFormated;
  resultsGoodAnswers.innerHTML = totalGoodAnswers;
  resultsBadAnswers.innerHTML = totalBadAnswers;

  if (countOvaCompleted === 1) {
    api?.LMSSetValue("cmi.core.score.min", 0);
    api?.LMSSetValue("cmi.core.score.max", 100);
    api?.LMSSetValue("cmi.core.score.raw", totalPointsFormated);
    api?.LMSSetValue("cmi.core.lesson_status", "completed");
    api?.LMSFinish("");
  }

  let resultsTextHtml = '';

  let resultsProp = 'notApproved';
  if (totalPointsFormated === 100) resultsProp = 'excellent';
  else if (totalPointsFormated > 60) resultsProp = 'approved';

  config.results?.[resultsProp]?.forEach((text) => {
    resultsTextHtml += `<p class="results__finalText">${formatText(text)}</p>`;
  });

  resultsText.innerHTML = resultsTextHtml;
};

const loadResult = () => {
  showResults();
  initializeResultConstanst();
  initializeResultData();
  initializeResultsEvents();
};