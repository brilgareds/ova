let ovaPresentationHtml;
let ovaPresentationMainTitleContainer;
let ovaPresentationNextButton;
let ovaPresentationNextButtonText;
let ovaPresentationPreviousButtonText;
let generalPresentationDescripcionTitle;
let generalPresentationDescripcionDetail;
let extraInfoTitleContainer;
let extraInfoDetailContainer;

const getOvaPresentationHtml = async () => {
  const url = '/components/ovaPresentation/ovaPresentation.html';
  ovaPresentationHtml = await htmlFetch({ url });

  return ovaPresentationHtml;
};

const ovaPresentationNextButtonClick = () => {
  loadInstructionsHtml();

  return true;
};

const loadMainTitle = () => {
  if (!ovaPresentationMainTitleContainer) return;

  const value = config?.presentation?.mainTitle || '';
  ovaPresentationMainTitleContainer.innerHTML = `<h1 class="mainContainer__mainTitle">${formatText(value)}</h1>`;
};

const loadDescriptionTitle = () => {
  if (!generalPresentationDescripcionTitle) return;
  
  let value = '';

  config.presentation?.title?.forEach((title) => {
    value += `<p class="generalPresentationDescripcion__mainParagraph">${formatText(title)}</p>`;
  });

  generalPresentationDescripcionTitle.innerHTML = value;
};

const loadExtraInfoTitle = () => {
  if (!extraInfoTitleContainer) return;

  let value = '';

  config.presentation?.extraInfo?.title?.forEach((title) => {
    value += `<h3 class="challengeAlert__title">${formatText(title)}</h3>`;
  });

  extraInfoTitleContainer.innerHTML = value;
};

const loadExtraInfoDetail = () => {
  if (!extraInfoDetailContainer) return;

  let value = '';

  config.presentation?.extraInfo?.detail?.forEach((text) => {
    value += `<p class="challengeAlert__detail">${formatText(text)}</p>`;
  });

  extraInfoDetailContainer.innerHTML = value;
};

const loadDescriptionText = () => {
  if (!generalPresentationDescripcionDetail) return;

  let value = '';

  config.presentation?.detail.forEach((text) => {
    value += `<p class="generalPresentationDescripcion__completeInformation">${formatText(text)}</p>`;
  });

  generalPresentationDescripcionDetail.innerHTML = value;
};

const loadNextButton = () => {
  if (!ovaPresentationNextButtonText) return;

  ovaPresentationNextButtonText.innerHTML = config.general?.nextButton?.text || '';
};

const loadPreviousButton = () => {
  if (!ovaPresentationPreviousButtonText) return;

  ovaPresentationPreviousButtonText.innerHTML = config.general?.previousButton?.text || '';
};

const initializeOvaPresentationData = () => {
  loadMainTitle();
  loadDescriptionTitle();
  loadDescriptionText();
  loadExtraInfoTitle();
  loadExtraInfoDetail();
  loadNextButton();
  loadPreviousButton();
};

const showOvaPresentationInMainContainer = () => {
  mainContainer.setAttribute('class','mainContainer');
  mainContainer.innerHTML = ovaPresentationHtml;
};

const initializeOvaPresentationConstants = () => {
  ovaPresentationNextButton = document.querySelector('.ovaPresentation__nextButton');
  ovaPresentationNextButtonText = document.querySelector('.nextButton__text');
  ovaPresentationPreviousButtonText = document.querySelector('.previousButton__text');
  ovaPresentationMainTitleContainer = document.querySelector('.mainContainer__mainTitleContainer');
  generalPresentationDescripcionTitle = document.querySelector('.generalPresentationDescripcion__mainParagraphContainer');
  generalPresentationDescripcionDetail = document.querySelector('.generalPresentationDescripcion__completeInformationContainer');
  extraInfoTitleContainer = document.querySelector('.challengeAlert__titleContainer');
  extraInfoDetailContainer = document.querySelector('.challengeAlert__detailContainer');
};

const initializeOvaPresentationEvents = () => {
  ovaPresentationNextButton?.addEventListener('click', () => { ovaPresentationNextButtonClick(); })
};

const loadOvaPresentation = () => {
  showOvaPresentationInMainContainer();
  initializeOvaPresentationConstants();
  initializeOvaPresentationData();
  initializeOvaPresentationEvents();
};