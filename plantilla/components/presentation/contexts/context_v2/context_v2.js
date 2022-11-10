let ovaContext2Html;
let ovaContext2PreviousButton;
let ovaContext2PreviousButtonText;
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
  const url = '/components/presentation/contexts/context_v2/context_v2.html';
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
  const { decisionMaking, ovaCompleted } = getCurrentDecisionMaking();
  let nextButtonText = config.general?.nextButton?.text;
  if (ovaCompleted) nextButtonText = config.general?.nextButton?.textReport;
  else if (decisionMaking.totalAttempts) nextButtonText = config.general?.nextButton?.textContinueOva;

  const previousButtonText = config.general?.previousButton?.text || '';

  ovaContext2PreviousButtonText.innerHTML = previousButtonText;
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
  ovaContext2PreviousButton = document.querySelector('.context2PreviousButton');
  ovaContext2PreviousButtonText = document.querySelector('.previousButton__text');
  ovaContext2NextButton = document.querySelector('.context2NextButton');
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
  mainContainer.innerHTML = `
    <div style="position: relative; position: relative; height: 100%; width: 100%;">
      <img class="imageFullScreen" src="/assets/images/background7.png">
      <div class="backFullScreenContainer"><div class="backFullScreenIcon"></div></div>
    </div>
  `;
  mainContainer.style = 'height: calc(100vh - 6rem); padding: 0; background: transparent; box-shadow: none; text-align: center;';
  animateMainContainer();

  backFullScreenIcon = document.querySelector('.backFullScreenIcon');
  backFullScreenIcon?.addEventListener('click', hidePictureFullScreen);
};

const initializeOvaContext2Events = () => {
  fullScreenIcon?.addEventListener('click', showPictureFullScreen);
  ovaContext2NextButton?.addEventListener('click', loadDecisionMaking2Html);
  ovaContext2PreviousButton?.addEventListener('click', loadInstructionsHtml);
};

const showOvaContext2InMainContainer = () => {
  mainContainer.innerHTML = ovaContext2Html;
  animateMainContainer();
};

const loadOvaContext2Html = async () => {
  showOvaContext2InMainContainer();
  initializeOvaContext2Constants();
  initializeOvaContext2Events();
  initializeOvaContext2Data();
};