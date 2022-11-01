let config;

const formDataToObject = function (formData) {
  const obj = {};

  for (const key of formData.keys()) {
    obj[key] = formData.get(key);
  }

  return obj;
};

const getFullAlphabet = () => config.general?.alphabet;

const getALetterOfAlphabet = (i) => {
  const alphabet = getFullAlphabet();

  return alphabet[i];
};

const validateCustomSymbolText = (data) => {
  const { text, customSymbol, startCustomStyle, endCustomStyle } = data;
  if (!text || !customSymbol) return text;

  const startOfFirtCustomStyle = text.indexOf(customSymbol);
  const endOfFirtCustomStyle = startOfFirtCustomStyle + customSymbol.length;
  const startOfSecondCustomStyle = text.indexOf(customSymbol, startOfFirtCustomStyle + 1);
  const endOfSecondCustomStyle = startOfSecondCustomStyle + customSymbol.length;

  if (startOfFirtCustomStyle === -1 || startOfSecondCustomStyle === -1) return text;

  const firtPart = text.substring(0, startOfFirtCustomStyle);
  const secondPart = `${startCustomStyle}${text.substring(endOfFirtCustomStyle, startOfSecondCustomStyle)}${endCustomStyle}`;
  const thirdPart = text.substring(endOfSecondCustomStyle);

  const newData = {
    text: `${firtPart}${secondPart}${thirdPart}`,
    customSymbol,
    startCustomStyle,
    endCustomStyle
  };

  const newText = validateCustomSymbolText(newData);

  return newText;
};

const formatStrongFont = (text) => {
  const data = {
    text,
    customSymbol: '***',
    startCustomStyle: '<span class="strong-font">',
    endCustomStyle: '</span>'
  };

  const newText = validateCustomSymbolText(data);

  return newText;
};

const pdfConfig = {
  margin: 0,
  padding: 0,
  filename: 'documento.pdf',
  image: {
      type: 'jpeg',
      quality: 0.98
  },
  html2canvas: {
      scale: 3, // A mayor escala, mejores gráficos, pero más peso
      letterRendering: true,
  },
  jsPDF: {
    unit: 'in', format: 'letter', orientation: 'portrait'
  }
};

const getConfigJson = async () => {
  const url = '/config.json';
  config = (await jsonFetch({ url })) || {};

  return config;
};

const getHtmlForPdf = async () => {
  const url = '/components/results/pdf/pdf.html';
  htmlForPdf = await htmlFetch({ url });

  return htmlForPdf;
};

const initializeMainConstants = async () => {
  config = await getConfigJson();
  mainContainer = document.querySelector('.mainContainer');
};

const countTrueState = (array) => {
  let count = 0;

  array?.forEach(({ status }) => {
    if (status) count += 1;
  });

  return count;
};

const countBadState = (array) => {
  let count = 0;

  array?.forEach(({ status }) => {
    if (!status) count += 1;
  });

  return count;
};

const setUserData = (newData) => {
  if (newData?.totalGoodAnswers !== undefined) delete newData.totalGoodAnswers;

  const currentData = getUserDataWithOutUpdateRequestTime();
  const newOvaUserData = { ...currentData, ...newData };
  localStorage.setItem('ovaUserData', JSON.stringify(newOvaUserData));

  return newOvaUserData;
};

const deleteUserData = () => localStorage.removeItem('ovaUserData');

const dateToObject = (date = new Date()) => {
  const day = (`0${date.getDate()}`).slice(-2);
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const year = String(date.getFullYear());

  return { day, month, year };
};

const timeBetweenTwoDates = (date1, date2) => {
  let delta = Math.abs(date1 - date2) / 1000;

  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  const seconds = delta % 60;

  const response = {
    hours,
    minutes,
    seconds,
    delta,
  };

  return response;
};

const getUserData = () => {
  const requestTime = new Date();
  const currentUserData = getUserDataWithOutUpdateRequestTime();
  if (!currentUserData.timeStart) currentUserData.timeStart = requestTime;

  const newUserData = setUserData({ requestTime });

  return newUserData;
};

const getUserDataWithOutUpdateRequestTime = () => {
  const currentData = JSON.parse(localStorage.getItem('ovaUserData') || initializeUserData());

  let totalAttempts = 0;
  let totalBadAnswers = 0;
  let totalGoodAnswers = 0;

  currentData.decisionMaking?.forEach(({ goodAnswers, badAnswers }) => {
    totalBadAnswers += badAnswers?.length || 0;
    totalGoodAnswers += goodAnswers?.length || 0;
  });

  totalAttempts = (totalGoodAnswers + totalBadAnswers);

  currentData.decisionMaking.totalGoodAnswers = totalGoodAnswers || 0;
  currentData.decisionMaking.totalBadAnswers = totalBadAnswers || 0;
  currentData.decisionMaking.totalAttempts = totalAttempts || 0;

  currentData.ovaStarted = new Date(currentData.ovaStarted);
  if (currentData.ovaFinished) currentData.ovaFinished = new Date(currentData.ovaFinished);

  return currentData;
};

const userParticipation = () => {
  const maxPoints = 100;
  const userData = getUserDataWithOutUpdateRequestTime();
  const totalQuestions = config.decisionMaking?.length || 0;
  const totalAttempts = userData?.decisionMaking?.totalAttempts;
  const totalBadAnswers = userData?.decisionMaking?.totalBadAnswers;
  const totalGoodAnswers = userData?.decisionMaking?.totalGoodAnswers;
  const validDecimals = 2;
  const totalPoints = ((totalGoodAnswers * maxPoints) / totalAttempts)?.toString();
  const lastDotIndex = totalPoints?.lastIndexOf('.');
  const lastIndexToUse = (lastDotIndex !== -1) ? lastDotIndex : totalPoints.length - 1;
  const totalPointsFormated = (!validDecimals)
    ? Number(totalPoints.substring(0, lastIndexToUse))
    : Number(totalPoints.substring(0, (lastIndexToUse + 1) + validDecimals));

  const response = { userData, totalPointsFormated, totalGoodAnswers, totalQuestions, totalBadAnswers, maxPoints, totalAttempts };

  return response;
};

const getStarsHtml = () => {
  const userData = getUserData();
  const { totalGoodAnswers } = userData?.decisionMaking;
  const totalDecisionMaking = config.decisionMaking?.length;

  let startsHtml = '';

  for (let currentStar = 1; currentStar <= totalDecisionMaking; currentStar += 1) {
    const isAnActiveStar = (totalGoodAnswers >= currentStar);
    const starImageName = (isAnActiveStar) ? 'star-active.png' : 'star-inactive.png';

    startsHtml += `
      <div class="customModalStarPictureContainer">
        <img alt="incorrectAnswerPicture" src="/assets/images/${starImageName}" class="customModalStarPicture"  />
      </div>
    `;
  }

  return startsHtml;
};

const downloadHtmlLikePdf = async ({ html }) => {

  return html2pdf()
    .set(pdfConfig)
    .from(html)
    .save('Ova results.pdf')
    .catch(err => console.error(err));
};

const formatText = (text) => {
  if (!text) return text;

  const newText = formatStrongFont(text);
  return newText
};

const formatToStrongText = (text) => formatText(`***${text}***`);

const initializePolyfill = () => {
  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  }

  NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
      for(var i = this.length - 1; i >= 0; i--) {
          if(this[i] && this[i].parentElement) {
              this[i].parentElement.removeChild(this[i]);
          }
      }
  }
};

initializePolyfill();