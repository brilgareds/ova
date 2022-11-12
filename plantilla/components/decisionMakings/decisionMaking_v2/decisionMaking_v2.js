let iconClass;
let textClass;
let optionDetailClass;
let optionContainerClass;
let radioButtonIconClass;
let optionTextContainerClass;
let radioButtonContainerClass;
let decisionMaking2Html;
let currentOptionSelected;
let decisionMaking2NextButton;
let decisionMaking2PreviousButton;
let decisionMaking2TitlesContainer;
let decisionMaking2OptionsContainer;
let decisionMaking2DescriptionContainer;
let decisionMaking2RadioButtonsContainer;

const getDecisionMaking2Html = async () => {
  const url = 'components/decisionMakings/decisionMaking_v2/decisionMaking_v2.html';
  decisionMaking2Html = await htmlFetch({ url });

  return decisionMaking2Html;
};

const removeAllActiveOptions = (data) => {
  const { containerClickedClass, optionsContainer } = data;

  optionsContainer?.forEach((container) => {
    const isTheContainerClicked = container.classList.value.includes(containerClickedClass);
    if (isTheContainerClicked) return;

    container.querySelectorAll(`.${iconClass}--active`)?.forEach((option) => {
      option?.classList?.remove(`${iconClass}--active`);
    });

    container.querySelectorAll(`.${optionDetailClass}--active`)?.forEach((option) => {
      option?.classList?.remove(`${optionDetailClass}--active`);
    });

    container.querySelectorAll(`.${optionTextContainerClass}--active`)?.forEach((option) => {
      option?.classList?.remove(`${optionTextContainerClass}--active`);
    });
  });
};

const updateIconOption = (data) => {
  const {
    element, iconClass, optionDetail, optionDetailClass, optionText, optionTextContainerClass
  } = data;

  element?.classList?.toggle(`${iconClass}--active`);
  optionDetail?.classList?.toggle(`${optionDetailClass}--active`);
  optionText?.classList?.toggle(`${optionTextContainerClass}--active`);
};

const getOptionValues = (element) => {
  const classes = element.classList.value;
  const iconClass2 = `${iconClass}--`;

  const index = classes[classes.indexOf(iconClass2) + iconClass2.length];
  const containerClickedClass = `${optionContainerClass}--${index}`;

  const optionsContainer = document.querySelectorAll(`.${optionContainerClass}`);
  const optionContainer = document.querySelector(`.${containerClickedClass}`);
  const optionDetail = optionContainer?.querySelector(`.${optionDetailClass}`);
  const optionText = optionContainer?.querySelector(`.${optionTextContainerClass}`);

  const values = {
    index,
    classes,
    iconClass,
    iconClass2,
    optionText,
    optionDetail,
    optionContainer,
    optionsContainer,
    optionDetailClass,
    optionContainerClass,
    containerClickedClass,
    optionTextContainerClass,
  };

  return values;
};

const getOptionButtonsValues = (element) => {
  const classes = element.classList.value;

  const radioButtonIconClass2 = `${radioButtonIconClass}--`;
  const index = Number(classes[classes.indexOf(radioButtonIconClass2) + radioButtonIconClass2.length]);
  const containerClickedClass = `${radioButtonContainerClass}--${index}`;
  const optionsButtonContainer = document.querySelectorAll(`.${radioButtonContainerClass}`);
  const optionButtonContainer = document.querySelector(`.${containerClickedClass}`);

  const values = {
    index,
    classes,
    optionsButtonContainer,
    containerClickedClass,
    optionButtonContainer,
    radioButtonContainerClass,
  };

  return values;
};


const removeAllSelectedOptions = (data) => {
  const { containerClickedClass, optionsButtonContainer } = data;

  optionsButtonContainer?.forEach((container) => {
    const isTheContainerClicked = container.classList.value.includes(containerClickedClass);
    if (isTheContainerClicked) return;

    container?.querySelectorAll(`.${radioButtonIconClass}--active`)?.forEach((iconButton) => {
      iconButton?.classList.remove(`${radioButtonIconClass}--active`);
    });
  });
};

const updateButtonOptionSelected = (data) => {
  const { element, index } = data;
  const activeClass = `${radioButtonIconClass}--active`;
  const optionWasSelected = element?.classList?.value?.includes(activeClass);
  currentOptionSelected = index;

  if (optionWasSelected) return;

  element?.classList?.add(activeClass);
};

const iconOptionClick = (e) => {
  const data = {
    ...getOptionValues(e.target),
    element: e.target
  };

  removeAllActiveOptions(data);
  updateIconOption(data);
};

const selectAnOption = (e) => {
  const data = {
    ...getOptionButtonsValues(e.target),
    element: e.target
  };

  removeAllSelectedOptions(data);
  updateButtonOptionSelected(data);
};

const selectAnLabelOption = ({ currentTarget: element }) => {
  const classes = element.classList.value;
  const textClass2 = `${textClass}--`;
  const index = classes[classes.indexOf(textClass2) + textClass2.length];

  const containerClickedClass = `${radioButtonContainerClass}--${index}`;
  const containerClicked = document.querySelector(`.${containerClickedClass}`);
  const radioButtonIcon = containerClicked?.querySelector(`.${radioButtonIconClass}`);
  radioButtonIcon?.click();
};

const showDecisionMaking2 = () => {
  animateMainContainer();
  mainContainer.innerHTML = decisionMaking2Html;
};

const initializeDecisionMaking2Constants = () => {
  decisionMaking2TitlesContainer = document.querySelector('.decisionMaking2__titlesContainer');
  decisionMaking2DescriptionContainer = document.querySelector('.decisionMaking2__descriptionContainer');
  decisionMaking2OptionsContainer = document.querySelector('.decisionMaking2__optionsContainer');
  decisionMaking2RadioButtonsContainer = document.querySelector('.decisionMaking2__radioButtonsContainer');
  decisionMaking2NextButton = document.querySelector('.decisionMaking2NextButton');
  decisionMaking2PreviousButton = document.querySelector('.decisionMaking2PreviousButton');

  iconClass = 'decisionMaking2__optionIcon';
  textClass = 'decisionMaking2__radioButtonText';
  radioButtonIconClass = 'decisionMaking2__radioButtonIcon';
  optionDetailClass = 'decisionMaking2__optionDetail';
  optionContainerClass = 'decisionMaking2__optionContainer';
  radioButtonContainerClass = 'decisionMaking2__radioButtonContainer';
  optionTextContainerClass = 'decisionMaking2__optionTextContainer';
};

const initializeDecisionMaking2Data = () => {
  const { lastIndex } = getCurrentDecisionMaking();
  let title = '';
  let detail = '';
  let options = '';
  let optionsButtons = '';

  config.decisionMaking?.[lastIndex]?.title?.forEach((text) => {
    title += `<p class="decisionMaking2__titles">${formatText(text)}</p>`;
  });

  config.decisionMaking?.[lastIndex]?.detail?.forEach((text) => {
    detail += `<p class="decisionMaking2__description">${formatText(text)}</p>`;
  });

  config.decisionMaking?.[lastIndex]?.options?.forEach(({ title, detail }, i) => {
    const letter = formatToStrongText(getALetterOfAlphabet(i));
    let buttonState = '';

    if (!i) {
      buttonState = `${radioButtonIconClass}--active`;
      currentOptionSelected = 1;
    }

    options += `
      <div class="${optionContainerClass} ${optionContainerClass}--${i+1}">
        <div class="decisionMaking2__optionLetterContainer">${letter}.</div>
        <div class="${optionTextContainerClass}">
          ${formatText(title)}<span class="${optionDetailClass}">: ${formatText(detail)}</span>
        </div>
        <div class="${iconClass}Container">
          <div class="${iconClass} ${iconClass}--${i+1}"></div>
        </div>
      </div>
    `;

    optionsButtons += `
      <div class="${radioButtonContainerClass} ${radioButtonContainerClass}--${i+1}">
        <div class="decisionMaking2__radioButtonTextContainer">
          <span class="noselect decisionMaking2__radioButtonText decisionMaking2__radioButtonText--${i+1}">${letter}</span>
        </div>

        <div class="decisionMaking2__radioButtonIconContainer">
          <div class="${radioButtonIconClass} ${radioButtonIconClass}--${i+1} ${buttonState}"></div>
        </div>
      </div>
    `;
  });

  document.querySelector('.decisionMaking2__mainPicture').style=`background: url(assets/images/decisionMaking_${lastIndex+1}.png) no-repeat; background-size: contain;`;

  decisionMaking2TitlesContainer.innerHTML = title;
  decisionMaking2DescriptionContainer.innerHTML = detail;
  decisionMaking2OptionsContainer.innerHTML = options;
  decisionMaking2RadioButtonsContainer.innerHTML = optionsButtons;
};

const checkAnswer = ({ optionSelected, decisionMakingIndex }) => {
  let wasGoodAnswer = false;
  const decisionMaking = config.decisionMaking?.[decisionMakingIndex];
  const isSimpleAnswer = (decisionMaking?.type === 2);

  if (isSimpleAnswer) {
    wasGoodAnswer = (decisionMaking?.answers?.[0] === optionSelected);
  }

  return wasGoodAnswer;
};

const formatNewDecision = (data) => {
  const data2 = { ...data };
  delete data2.decisionMakingIndex;

  return data2;
};

const initializeDecision = () => ({ status: false, badAnswers: [], goodAnswers: []});

const getCurrentDecisionMaking = () => {
  const { decisionMaking, ovaFinished } = getUserDataWithOutUpdateRequestTime();
  const totalGoodAnswers = decisionMaking.totalGoodAnswers || 0;
  const userDecisionMakingLength = !(decisionMaking?.length) ? 0 : decisionMaking.length;
  const configDecisionMakingLength = config.decisionMaking?.length;

  const userLastIndex = (userDecisionMakingLength) ? userDecisionMakingLength - 1 : 0;
  const configLastIndex = (configDecisionMakingLength) ? configDecisionMakingLength - 1 : 0;
  const lastValidIndex = (userLastIndex > configLastIndex) ? configLastIndex : userLastIndex;
  const lastValidConfigDecision = config.decisionMaking?.[lastValidIndex];
  const lastValidDecision = decisionMaking?.[lastValidIndex];
  const isTheLastDecision = (userLastIndex >= configLastIndex);
  const lastDecisionCompleted = (lastValidDecision?.goodAnswers?.length);
  const ovaCompleted = (isTheLastDecision && lastDecisionCompleted);
  // const lastIndex = (isTheLastDecision) ? lastValidIndex : lastValidIndex + 1;
  const lastIndex =  (lastDecisionCompleted) ? lastValidIndex + 1 : lastValidIndex;
  if (!decisionMaking?.[lastIndex]) decisionMaking[lastIndex] = initializeDecision();
  if (ovaCompleted && !ovaFinished) setUserData({ ovaFinished: new Date() });

  const response = {
    decisionMaking,
    lastValidDecision,
    lastValidConfigDecision,
    lastIndex,
    lastValidIndex,
    ovaCompleted,
    userLastIndex,
    configDecisionMakingLength,
    totalGoodAnswers
  };

  return response;
};

const setNewDecision = (data) => {
  const wasGoodAnswer = checkAnswer(data);
  const newDecision = formatNewDecision(data);
  const { decisionMaking, lastIndex } = getCurrentDecisionMaking();

  if (!wasGoodAnswer) decisionMaking[lastIndex].badAnswers?.push(newDecision);
  else {
    decisionMaking[lastIndex].status = true;
    decisionMaking[lastIndex].goodAnswers?.push(newDecision);
  }

  setUserData({ decisionMaking });
};

const topScroll = () => window.scrollTo(0, 0);

const showResultAnswerModal = (data) => {
  topScroll();

  const wasGoodAnswer = checkAnswer(data);
  if (!wasGoodAnswer) return loadBadAnswerModal();

  return loadGoodAnswerModal();
};

const decisionFinished = () => {
  const { ovaCompleted, lastIndex } = getCurrentDecisionMaking();

  if (!ovaCompleted) {
    const data = {
      decisionMakingIndex: lastIndex,
      optionSelected: currentOptionSelected,
    };

    setNewDecision(data);
    showResultAnswerModal(data);
  }
};

const initializeDecisionMaking2Events = () => {
  const optionIcons = document.querySelectorAll(`.${iconClass}`);
  optionIcons?.forEach((icon) => icon.addEventListener('click', iconOptionClick));
  optionIcons?.[0]?.click();

  const optionButtons = document.querySelectorAll(`.${radioButtonIconClass}`);
  optionButtons?.forEach((button) => button.addEventListener('click', selectAnOption));

  const optionLabelButtons = document.querySelectorAll(`.decisionMaking2__radioButtonText`);
  optionLabelButtons.forEach((label) => label.addEventListener('click', selectAnLabelOption));

  decisionMaking2NextButton?.addEventListener('click', decisionFinished);
  decisionMaking2PreviousButton?.addEventListener('click', loadOvaContext2Html);
};

const validIsAllOvaWasCompleted = () => {
  const { ovaCompleted } = getCurrentDecisionMaking();
  if (ovaCompleted) loadResult();

  return ovaCompleted;
};

const loadDecisionMaking2Html = () => {
  const ovaCompleted = validIsAllOvaWasCompleted();

  if (!ovaCompleted) {
    showDecisionMaking2();
    initializeDecisionMaking2Constants();
    initializeDecisionMaking2Data();
    initializeDecisionMaking2Events();
  }
};