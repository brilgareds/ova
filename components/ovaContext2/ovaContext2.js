let ovaContext2Html;
let ovaContext2PreviousButton;
let ovaContext2NextButton;
let ovaContext2NextButtonText;
let ovaContext2MainTitleContainer;
let ovaContext2TitleContainer;
let ovaContext2DetailContainer;
let mainContainerMainTitleContainer;
let fullScreenIcon;
let htmlBeforeFullScreen;
let backFullScreenIcon;

const getOvaContext2 = async () => {
  const url = '/components/ovaContext2/ovaContext2.html';
  ovaContext2Html = await htmlFetch({ url });

  return ovaContext2Html;
};

const initializeOvaContext2BigTitle = () => {
  let bigTitle = '';

  config.ovaContext?.bigTitle?.forEach((text) => {
    bigTitle += `<h1 class="mainContainer__mainTitle primaryColor">${text}</h1>`;
  });

  ovaContext2MainTitleContainer.innerHTML = bigTitle;
};

const initializeOvaContext2Title = () => {
  let title = '';

  config.ovaContext?.title?.forEach((text) => {
    title += `<p class="generalPresentationDescripcion__mainParagraph">${text}</p>`;
  });

  ovaContext2TitleContainer.innerHTML = title;
};

const initializeOvaContext2Detail = () => {
  let detail = '';

  config.ovaContext?.detail?.forEach((text) => {
    detail += `<p class="generalPresentationDescripcion__completeInformation">${text}</p>`;
  });

  ovaContext2DetailContainer.innerHTML = detail;
};

const initializeOvaContext2Buttons = () => {
  const previousButtonText = config.general?.previousButton?.text || '';
  const nextButtonText = config.general?.nextButton?.text || '';

  ovaContext2PreviousButton.innerHTML = previousButtonText;
  ovaContext2NextButtonText.innerHTML = nextButtonText;
};

const initializeOvaContext2Data = () => {
  initializeOvaContext2BigTitle();
  initializeOvaContext2Title();
  initializeOvaContext2Detail();
  initializeOvaContext2Buttons();
};

const initializeOvaContext2Constants = () => {
  fullScreenIcon = document.querySelector('.fullScreenIcon');
  ovaContext2PreviousButton = document.querySelector('.previousButton__text');
  ovaContext2NextButton = document.querySelector('.ovaContext2NextButton');
  ovaContext2NextButtonText = document.querySelector('.nextButton__text');
  ovaContext2MainTitleContainer = document.querySelector('.mainContainer__mainTitleContainer');
  ovaContext2TitleContainer = document.querySelector('.generalPresentationDescripcion__mainParagraphContainer');
  ovaContext2DetailContainer = document.querySelector('.generalPresentationDescripcion__completeInformationContainer');
};

const hidePictureFullScreen = () => {
  mainContainer.style = '';
  loadOvaContext2Html();
};

const showPictureFullScreen = (e) => {
  htmlBeforeFullScreen = mainContainer.innerHTML;
  mainContainer.innerHTML = `<div class="backFullScreenContainer"><div class="backFullScreenIcon"></div></div>`;
  mainContainer.style.background = 'url(/assets/images/background7.png)';

  backFullScreenIcon = document.querySelector('.backFullScreenIcon');
  backFullScreenIcon?.addEventListener('click', hidePictureFullScreen);
};

const initializeOvaContext2Events = () => {
  fullScreenIcon?.addEventListener('click', showPictureFullScreen);
  ovaContext2NextButton?.addEventListener('click', loadDecisionMaking2Html);
};

const showOvaContext2InMainContainer = () => {
  mainContainer.innerHTML = ovaContext2Html;
};

const loadOvaContext2Html = async () => {
  showOvaContext2InMainContainer();
  initializeOvaContext2Constants();
  initializeOvaContext2Events();
  initializeOvaContext2Data();
};