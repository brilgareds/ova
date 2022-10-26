let resultsHtml;
let resultsPreviousButton;
let resultsRestartButton;
let resultsStartContainer;
let resultsGoodAnswers;
let resultsBadAnswers;
let resultsDownloadButton;

const getResultsHtml = async () => {
  const url = '/components/results/results.html';
  resultsHtml = await htmlFetch({ url });

  return resultsHtml;
};

const initializeResultConstanst = () => {
  resultsRestartButton = document.querySelector('.buttonsSection__button--reload');
  resultsPreviousButton = document.querySelector('.buttonsSection__button--back');
  resultsDownloadButton = document.querySelector('.buttonsSection__button--download');
  resultsStartContainer = document.querySelector('.detailPoints__starsCompletedContainer');
  resultsTotalPoints = document.querySelector('.detailPoints__bigNumber');
  resultsGoodAnswers = document.querySelector('.goodAnswers__bigNumber');
  resultsBadAnswers = document.querySelector('.badAnswers__bigNumber');
};

const startsContainer = '<div class="userTotalStars">';

const downloadResultsPdf = async () => {
  // const pdfElement = document.querySelector('.results__pdf');
  // pdfElement.classList.remove('hidden');
  const newStars = `${startsContainer}${getStarsHtml()}`;
  htmlForPdf = htmlForPdf.replace(startsContainer, newStars);
  // pdfElement.innerHTML = htmlForPdf;

  await downloadHtmlLikePdf({ html: htmlForPdf });
  // pdfElement.classList.add('hidden');
  getHtmlForPdf();
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
  const maxPoints = 100;
  const currentData = getUserDataWithOutUpdateRequestTime();
  const totalQuestions = config.decisionMaking?.length || 0;
  const totalGoodAnswers = currentData?.decisionMaking?.totalGoodAnswers || 0;
  const validDecimals = 2;
  const totalPoints = ((totalGoodAnswers * maxPoints) / totalQuestions)?.toString();
  const lastDotIndex = totalPoints?.lastIndexOf('.');
  const lastIndexToUse = (lastDotIndex !== -1) ? lastDotIndex : totalPoints.length - 1;
  const totalPointsFormated = (!validDecimals)
    ? Number(totalPoints.substring(0, lastIndexToUse))
    : Number(totalPoints.substring(0, (lastIndexToUse + 1) + validDecimals));

  resultsStartContainer.innerHTML = getStarsHtml();
  resultsTotalPoints.innerHTML = totalPointsFormated;
  resultsGoodAnswers.innerHTML = totalGoodAnswers;
  resultsBadAnswers.innerHTML = totalQuestions - totalGoodAnswers;
};

const loadResult = () => {
  showResults();
  initializeResultConstanst();
  initializeResultData();
  initializeResultsEvents();
};