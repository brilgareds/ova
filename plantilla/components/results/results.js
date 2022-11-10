let resultsHtml;
let resultsPreviousButton;
let resultsRestartButton;
let resultsStartContainer;
let resultsGoodAnswers;
let resultsBadAnswers;
let resultsDownloadButton;
let resultsText;

const getResultsHtml = async () => {
  const url = '/components/results/results.html';
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
  window.open('/reports.html', '_blank');
  // await downloadHtmlLikePdf({ html });

  // const pdfElement = document.querySelector('.results__pdf');
  // pdfElement.classList.remove('hidden');
  // pdfElement.innerHTML = html;

  /* window.open('/components/results/pdf/pdf.html', '_blank'); */
  // pdfElement.classList.add('hidden');
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

  resultsStartContainer.innerHTML = getStarsHtml();
  resultsTotalPoints.innerHTML = totalPointsFormated;
  resultsGoodAnswers.innerHTML = totalGoodAnswers;
  resultsBadAnswers.innerHTML = totalBadAnswers;

  let resultsTextHtml = '';

  config.results?.detail?.forEach((text) => {
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