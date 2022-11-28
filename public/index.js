let tabs;
let countReloads = 0;
let mainForm;
let allPicturesFiles;
let formGeneratorSections;
let formGeneratorSectionDecisionMaking;
let presentationInputsContainerMainTitle;
let presentationInputsContainerSecundaryTitles;
let presentationInputsContainerText;
let inputsContainer;
let inputPictureButtons;
let addInputButtons;
let removeInputButtons;
let removeDecisionButtons;
let typeModalButtons;
const classActiveTab = 'tab--active';
const classActiveSection = 'formGeneratorSection--active';

const formatFetchResponse = async (data) => {
  let newData = await data.clone().text();

  await data.clone().json().then((object) => { newData = object; }).catch(() => {});

  return newData;
};

const customFetch = async ({ url, options }) => {
  const response = await fetch(url, options);
  const dataFormated = await formatFetchResponse(response);
  if (response.status === 500) throw new Error(dataFormated);

  return dataFormated;
};

const postFetch = async ({ url, data={} }) => {
  const options = {
    body: data,
    method: 'POST',
  };

  const response = await customFetch({ url, options });

  return response;
};

const getFetch = async (fetchData={}) => {
  const options = {
    method: 'GET',
  };
  const params = (fetchData.data) ? `?${new URLSearchParams(fetchData.data).toString()}` : '';
  const url = `${fetchData.url}${params}`;

  const response = await customFetch({ url, options });

  return response;
};

const getDefaultConfigJson = async () => {
  const url = 'config-default.json';
  const config = (await getFetch({ url })) || {};

  return config;
};

const initializeGeneratorValues = async () => {
  const config = await getDefaultConfigJson();
  setGeneratorValues(config);

  return config;
};

const deleteGeneratorValues = () => {
  localStorage.removeItem('generatorValues');

  return true;
};

const setGeneratorValues = (newConfig={}) => {
  const values = JSON.stringify({
    ...getCurrentGeneratorValues(),
    ...newConfig
  });

  localStorage.setItem('generatorValues', values);

  return values;
};

const getCurrentGeneratorValues = () => JSON.parse(localStorage.getItem('generatorValues') || '{}');

const getGeneratorValues = async () => {
  let currentValues = getCurrentGeneratorValues();

  if (!Object.keys(currentValues)?.length) {
    await initializeGeneratorValues();
    currentValues = getCurrentGeneratorValues();
  }
  
  return currentValues;
};

const initializeGeneratorConstants = () => {
  allPicturesFiles = {};
  tabs = document.querySelectorAll('.tab');
  mainForm = document.querySelector('.formGenerator');
  presentationInputs = document.querySelectorAll('.input');
  formGeneratorSections = document.querySelectorAll('.formGeneratorSection');
  formGeneratorSectionDecisionMaking = document.querySelector('.formGeneratorSection__decisionMaking');
  presentationInputsContainerMainTitle = document.querySelector('.presentation__inputsContainer--mainTitle');
  presentationInputsContainerSecundaryTitles = document.querySelector('.presentation__inputsContainer--secundaryTitles');
  presentationInputsContainerText = document.querySelector('.presentation__inputsContainer--text');
  inputsContainer = document.querySelectorAll('.inputsContainer');
  inputPictureButtons = document.querySelectorAll('.inputPictureButtons');
  inputPictureButtons?.forEach((pictureElement) => {
    allPicturesFiles[pictureElement.dataset.name] = pictureElement.files || [];
  });

  typeModalButtons = document.querySelectorAll('.incorrectAnswer__typeModalButton');
  addInputButtons = document.querySelectorAll('.addInputButton');
  removeInputButtons = document.querySelectorAll('.removeInputButton');
  removeDecisionButtons = document.querySelectorAll('.removeDecisionButton');
};

const removeActiveClassOfAllElements = (activeClass) => {
  const activeElements = document.querySelectorAll(`.${activeClass}`);
  activeElements?.forEach((element) => element.classList.remove(activeClass));
};

const addActiveClassToElement = (element, activeClass) => {
  element?.classList?.add(activeClass);
};

const updateActiveTab = (e) => {
  removeActiveClassOfAllElements(classActiveTab);
  addActiveClassToElement(e.target, classActiveTab);

  const nameSectionRelated = e.target.dataset?.nameSectionRelated;
  let newTabIndex = 0;
  tabs?.forEach((tab, i) => {
    if (tab.dataset.nameSectionRelated === nameSectionRelated) newTabIndex = i;
  })
  const currentValues = getCurrentGeneratorValues();
  currentValues.generator.currentTab = (newTabIndex + 1);
  setGeneratorValues(currentValues);
};

const updateActiveSection = (e) => {
  const nameSectionRelated = e.target.dataset.nameSectionRelated;
  const sectionToActive = document.querySelector(`.formGeneratorSection__${nameSectionRelated}`);

  removeActiveClassOfAllElements(classActiveSection);
  addActiveClassToElement(sectionToActive, classActiveSection);
};

const tabClicked = (e) => {
  updateActiveTab(e);
  updateActiveSection(e);
};

const getAllFormValues = (form) => {
  const data = new FormData(form);
  const obj = {};

  for (const key of data.keys()) {
    obj[key] = data.get(key);
  }

  return obj;
};

const generateOva = async (e) => {
  e.preventDefault();

  const data = new FormData();
  const url = '/ova/generate';
  const fields = getCurrentGeneratorValues();

  for (const prop in allPicturesFiles) {
    data.append(prop, allPicturesFiles[prop][0]);
  }

  for (const prop in fields) {
    if (prop !== 'generator' && fields[prop] !== undefined) data.append(prop, JSON.stringify(fields[prop]));
  }

  try {
    const response = await postFetch({ url, data });
    console.log('Response is: ', response);
  
    if (response.url) {
      if (Array.isArray(response.url)) response.url.forEach((url) => window.open(url));
      else window.open(response.url);

      deleteGeneratorValues();
      location.reload();
    }
  } catch (e) {
    console.error(e);
  }
};

const inputUpdated = (e) => {
  const { value, dataset } = e.currentTarget;
  const { index, index2 } = dataset;
  const inputContainer = e.currentTarget.parentElement;
  const allInputsContainer = inputContainer.parentElement;
  const { formSection, formProp, formProp2, formProp3, formProp4, formProp5, formProp6, formProp7 } = allInputsContainer?.dataset;
  const currentValues = getCurrentGeneratorValues();

  if (index2) {
    if (formProp7) currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6][formProp7][index][index2] = value;
    else if (formProp6) currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6][index][index2] = value;
    else if (formProp5) currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][index][index2] = value;
    else if (formProp4) currentValues[formSection][formProp][formProp2][formProp3][formProp4][index][index2] = value;
    else if (formProp3) currentValues[formSection][formProp][formProp2][formProp3][index][index2] = value;
    else if (formProp2) currentValues[formSection][formProp][formProp2][index][index2] = value;
    else if (formProp) currentValues[formSection][formProp][index][index2] = value;
  } else if (index) {
    if (formProp7) currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6][formProp7][index] = value;
    else if (formProp6) currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6][index] = value;
    else if (formProp5) currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][index] = value;
    else if (formProp4) currentValues[formSection][formProp][formProp2][formProp3][formProp4][index] = value;
    else if (formProp3) currentValues[formSection][formProp][formProp2][formProp3][index] = value;
    else if (formProp2) currentValues[formSection][formProp][formProp2][index] = value;
    else if (formProp) currentValues[formSection][formProp][index] = value;
  } else {
    if (formProp7) currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6][formProp7] = value;
    else if (formProp6) currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6] = value;
    else if (formProp5) currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5] = value;
    else if (formProp4) currentValues[formSection][formProp][formProp2][formProp3][formProp4] = value;
    else if (formProp3) currentValues[formSection][formProp][formProp2][formProp3] = value;
    else if (formProp2) currentValues[formSection][formProp][formProp2] = value;
    else if (formProp) currentValues[formSection][formProp] = value;
  }
  
  setGeneratorValues(currentValues);

  initializeGeneratorConstants();
  initializeEvents();
};

const verifyLastPropId = () => {

};

const updateInputValue = (data, current='1') => {
  if (data[current] !== undefined) return updateInputValue(data, );
};

const cloneObjectWithOutValues = (obj = {}) => {
  const newObject = {};

  Object.keys(obj)?.forEach((prop) => {
    const isTypeProp = (prop === 'type' && typeof obj[prop] !== 'object');
    newObject[prop] = (isTypeProp) ? obj[prop] : initializeInputValue(obj[prop]);
  });

  return newObject;
};

const initializeInputValue = (value='') => {
  if (Array.isArray(value)) return [initializeInputValue(value[0])];
  if (typeof value === 'object' && value !== null) return cloneObjectWithOutValues(value);

  return '';
};

const makeNewInputData = (data, type, index) => {
  let newData;

  if (Array.isArray(data)) {
    newData = [];

    if (type === 'add') {
      data.forEach((value, i) => {
        newData.push(value);
        if (i === index) newData.push(initializeInputValue(value));
      });
    } else if (type === 'remove') {
      newData = data.filter((_value, i) => (i !== index));
      if (!newData.length) newData = [initializeInputValue(data[0])];
    }
  } else {
    newData = {};

    Object.keys(data)?.forEach((prop) => {
      newData[prop] = data[prop];
    });
  }

  return newData;
};

const removeInputButtonClicked = async (e) => {
  const currentValues = getCurrentGeneratorValues();
  const index = Number(e.currentTarget?.dataset?.index || 0);
  const { formSection, formProp, formProp2, formProp3, formProp4, formProp5, formProp6, formProp7 } = e.currentTarget?.dataset;

  if (formProp7) {
    const value = currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6][formProp7];
    currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6][formProp7] = makeNewInputData(value, 'remove', index);
  } else if (formProp6) {
    const value = currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6];
    currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6] = makeNewInputData(value, 'remove', index);
  } else if (formProp5) {
    const value = currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5];
    currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5] = makeNewInputData(value, 'remove', index);
  } else if (formProp4) {
    const value = currentValues[formSection][formProp][formProp2][formProp3][formProp4];
    currentValues[formSection][formProp][formProp2][formProp3][formProp4] = makeNewInputData(value, 'remove', index);
  } else if (formProp3) {
    const value = currentValues[formSection][formProp][formProp2][formProp3];
    currentValues[formSection][formProp][formProp2][formProp3] = makeNewInputData(value, 'remove', index);
  } else if (formProp2) {
    const value = currentValues[formSection][formProp][formProp2];
    currentValues[formSection][formProp][formProp2] = makeNewInputData(value, 'remove', index);
  } else if (formProp) {
    const value = currentValues[formSection][formProp];
    currentValues[formSection][formProp] = makeNewInputData(value, 'remove', index);
  } else {
    const value = currentValues[formSection];
    currentValues[formSection] = makeNewInputData(value, 'remove', index);
  }

  setGeneratorValues(currentValues);

  await initializeMainValues();
};

const addInputButtonClicked = async (e) => {
  const currentValues = getCurrentGeneratorValues();
  const index = Number(e.currentTarget?.dataset?.index || 0);
  const { formSection, formProp, formProp2, formProp3, formProp4, formProp5, formProp6, formProp7 } = e.currentTarget?.dataset;

  if (formProp7) {
    const value = currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6][formProp7];
    currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6][formProp7] = makeNewInputData(value, 'add', index);
  } else if (formProp6) {
    const value = currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6];
    currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5][formProp6] = makeNewInputData(value, 'add', index);
  } else if (formProp5) {
    const value = currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5];
    currentValues[formSection][formProp][formProp2][formProp3][formProp4][formProp5] = makeNewInputData(value, 'add', index);
  } else if (formProp4) {
    const value = currentValues[formSection][formProp][formProp2][formProp3][formProp4];
    currentValues[formSection][formProp][formProp2][formProp3][formProp4] = makeNewInputData(value, 'add', index);
  } else if (formProp3) {
    const value = currentValues[formSection][formProp][formProp2][formProp3];
    currentValues[formSection][formProp][formProp2][formProp3] = makeNewInputData(value, 'add', index);
  } else if (formProp2) {
    const value = currentValues[formSection][formProp][formProp2];
    currentValues[formSection][formProp][formProp2] = makeNewInputData(value, 'add', index);
  } else if (formProp) {
    const value = currentValues[formSection][formProp];
    currentValues[formSection][formProp] = makeNewInputData(value, 'add', index);
  } else {
    const value = currentValues[formSection];
    currentValues[formSection] = makeNewInputData(value, 'add', index);
  }

  setGeneratorValues(currentValues);

  await initializeMainValues();
};

const setFormSubmitEvent = () => mainForm?.addEventListener('submit', generateOva);

const setTabsClickEvent = () => {
  tabs?.forEach((tab) => tab?.addEventListener('click', tabClicked));
};

const addDecisionButtonClicked = async (e) => {
  const currentValues = getCurrentGeneratorValues();
  const decisionIndex = Number(e.target?.dataset?.decisionIndex || '0');
  
  let decisionMakings = [];
  currentValues.decisionMaking?.forEach((decision, i) => {
    decisionMakings.push(decision);

    if (i === decisionIndex) {
      const newObject = {};
      Object.keys(decision).forEach((key) => {
        const isArray = Array.isArray(decision[key]);

        if (isArray) {
          const isObject = (typeof decision[key][0] === 'object');

          if (!isObject) newObject[key] = [''];
          else {
            const newObject2 = {};
            Object.keys(decision[key][0])?.forEach((key) => newObject2[key] = '');
            newObject[key] = [newObject2];
          } 
        }
        else newObject[key] = '';
      });

      decisionMakings.push({ ...newObject, type: 2 });
    }
  });

  currentValues.decisionMaking = decisionMakings;
  setGeneratorValues(currentValues);

  await initializeMainValues();
};

const removeDecisionButtonClicked = async (e) => {
  const currentValues = getCurrentGeneratorValues();
  const decisionIndex = Number(e.target?.dataset?.decisionIndex || '0');

  let decisionMakings = [];

  if (currentValues.decisionMaking.length > 1) {
    currentValues.decisionMaking?.forEach((decision, i) => {
      if (i !== decisionIndex) decisionMakings.push(decision);
    });
  } else {
    const decision = currentValues.decisionMaking[0];

    const newObject = {};
    Object.keys(decision).forEach((key) => {
      const isArray = Array.isArray(decision[key]);

      if (isArray) {
        const isObject = (typeof decision[key][0] === 'object');

        if (!isObject) newObject[key] = [''];
        else {
          const newObject2 = {};
          Object.keys(decision[key][0])?.forEach((key) => newObject2[key] = '');
          newObject[key] = [newObject2];
        } 
      }
      else newObject[key] = '';
    });

    decisionMakings.push({ ...newObject, type: 2 });
  }

  currentValues.decisionMaking = decisionMakings;
  setGeneratorValues(currentValues);

  await initializeMainValues();
};

const showBadOptionInputs = (e) => {
  const { type='', decision, option } = e.currentTarget?.dataset;
  const currentValues = getCurrentGeneratorValues();
  currentValues.decisionMaking[decision-1].options[option-1].typeResponse = (type === 'feedback') ? 1 : 2;
  setGeneratorValues(currentValues);

  typeModalButtons?.forEach((button) => {
    const currentType = button.dataset.type;
    const isCurrentOption = button.classList.value?.includes(`incorrectAnswer__typeModalButton--${decision}_${option}`);

    if (isCurrentOption) {
      if (currentType !== type) {
        button.classList.remove(`incorrectAnswer__typeModalButton--active`);
        document.querySelector(`.inputsContainer--${decision}_${option}_${currentType}`).style.display = 'none';
      } else {
        button.classList.add('incorrectAnswer__typeModalButton--active');
        document.querySelector(`.inputsContainer--${decision}_${option}_${currentType}`).style.display = 'block';
      }
    }
  });
};

const setAddInputButton = () => {
  addInputButtons?.forEach((addInputButton) => { addInputButton.addEventListener('click', addInputButtonClicked); });
  removeInputButtons?.forEach((removeInputButton) => { removeInputButton.addEventListener('click', removeInputButtonClicked); });
  typeModalButtons?.forEach((button) => button?.addEventListener('click', showBadOptionInputs));

  removeDecisionButtons?.forEach((button) => button.addEventListener('click', removeDecisionButtonClicked));
  presentationInputs?.forEach((input) => {
    input.addEventListener('keyup', inputUpdated);
    input.addEventListener('mouseup', inputUpdated);
  });

  const currentValues = getCurrentGeneratorValues();
  currentValues.decisionMaking.forEach((currentDecision, indexDecision) => {
    currentDecision.options.forEach(({ typeResponse }, indexOption) => {
      const type = (typeResponse == 1) ? 'feedback' : 'newDecision';
      const selector = `.incorrectAnswer__typeModalButton--${indexDecision+1}_${indexOption+1}_${type}`;
      document.querySelector(selector)?.click();
    });
  })
};

const initializeLabelInputPictures = () => {
  
};

const pictureUpdated = async (e) => {
    allPicturesFiles[e.currentTarget.dataset.name] = e.currentTarget.files;
    e.currentTarget.parentElement.querySelector('.inputPictureButtonText').innerHTML = e.currentTarget.files?.[0]?.name || '';
    return true;

    // const file = e.target.files?.[0];
    // const { formSection, formProp } = e.target?.parentElement?.parentElement?.dataset;
    // initializeData();
};

const setInputPictureButtonClicked = () => {
  inputPictureButtons?.forEach((input) => input?.addEventListener('change', pictureUpdated));
};

const initializeEvents = () => {
  setFormSubmitEvent();
  setTabsClickEvent();
  setAddInputButton();
  setInputPictureButtonClicked();
};

const getInputSimpleHtml = (value = '') => (`
  <div class="inputContainer">
    <input type="text" class="input input--text" value="${value}">
  </div>
`);

const getInputSimple = (value) => {
  const html = getInputSimpleHtml(value);

  return html;
};

const getInputMultipleHtml = (value = '', index = 0, data) => {
  const { formSection, formProp, formProp2, formProp3, formProp4 } = data;
  
  return `
    <div class="inputContainer">
      <input type="text" class="input input--array" value="${value}" data-index="${index}">

      <div class="inputButtons">
        <button class="removeInputButton removeInputButton--inInput" type="button" ${(formSection) ? `data-form-section="${formSection}"` : '' } ${(formProp) ? `data-form-prop="${formProp}"` : ''} ${(formProp2) ? `data-form-prop2="${formProp2}"` : ''} ${(formProp3) ? `data-form-prop3="${formProp3}"` : '' } ${(formProp4) ? `data-form-prop4="${formProp4}"` : ''} ${(index) ? `data-index="${index}"` : ''} >
          <span class="removeInputButtonText">-</span>
        </button>

        <button class="addInputButton addInputButton--inInput" type="button" ${(formSection) ? `data-form-section="${formSection}"` : '' } ${(formProp) ? `data-form-prop="${formProp}"` : ''} ${(formProp2) ? `data-form-prop2="${formProp2}"` : ''} ${(formProp3) ? `data-form-prop3="${formProp3}"` : '' } ${(formProp4) ? `data-form-prop4="${formProp4}"` : ''} ${(index) ? `data-index="${index}"` : ''} >
          <span class="addInputButtonText">+</span>
        </button>
      </div>
    </div>
  `;
};

const getInputMultiple = (values = [], data) => {
  let html = '';

  if (!values?.length) html += getInputMultipleHtml();
  else values.forEach((value, i) => { html += getInputMultipleHtml(value, i, data); });

  return html;
};

const getInputMultipleAnswersHtml = (value = '', index = 0) => (`
  <div class="inputContainer">
    <input type="number" class="input input--text" style="width: auto; color: black; font-style: normal; font-size: 1rem; font-weight: bolder;" value="${value}" min="0" max="20" data-index="${index}">
  </div>
`);

const getInputMultipleAnswers = (values) => {
  let html = '';

  if (!values?.length) html += getInputMultipleAnswersHtml();
  else html += getInputMultipleAnswersHtml(values?.[0], 0);

  return html;
};

const getInputGlosaryHtml = ({ word, description }, index = 0, data={}) => {
  const { formSection, formProp, formProp2, formProp3, formProp4 } = data;
  
  return `
    <div class="inputContainer">
      <input type="text" class="input input--multiplePropValue" value="${word}" data-index="${index}" data-index2="word">
      <input type="text" class="input input--array" value="${description}" data-index="${index}" data-index2="description">

      <div class="inputButtons">
        <button class="removeInputButton removeInputButton--inInput" type="button" ${(formSection) ? `data-form-section="${formSection}"` : '' } ${(formProp) ? `data-form-prop="${formProp}"` : ''} ${(formProp2) ? `data-form-prop2="${formProp2}"` : ''} ${(formProp3) ? `data-form-prop3="${formProp3}"` : '' } ${(formProp4) ? `data-form-prop4="${formProp4}"` : ''} ${(index) ? `data-index="${index}"` : ''}>
          <span class="removeInputButtonText">-</span>
        </button>

        <button class="addInputButton addInputButton--inInput" type="button" ${(formSection) ? `data-form-section="${formSection}"` : '' } ${(formProp) ? `data-form-prop="${formProp}"` : ''} ${(formProp2) ? `data-form-prop2="${formProp2}"` : ''} ${(formProp3) ? `data-form-prop3="${formProp3}"` : '' } ${(formProp4) ? `data-form-prop4="${formProp4}"` : ''} ${(index) ? `data-index="${index}"` : ''}>
          <span class="addInputButtonText">+</span>
        </button>
      </div>
    </div>
  `;
};

const getInputThematicsHtml = ({ thematic, descripcion }, index = 0, data) => {
  const { formSection, formProp, formProp2, formProp3, formProp4 } = data;
  
  return `
    <div class="inputContainer">
      <input type="text" class="input input--multiplePropValue" value="${thematic}" data-index="${index}" data-index2="thematic">
      <input type="text" class="input input--array" value="${descripcion}" data-index="${index}" data-index2="descripcion">

      <div class="inputButtons">
        <button class="removeInputButton removeInputButton--inInput" type="button" ${(formSection) ? `data-form-section="${formSection}"` : '' } ${(formProp) ? `data-form-prop="${formProp}"` : ''} ${(formProp2) ? `data-form-prop2="${formProp2}"` : ''} ${(formProp3) ? `data-form-prop3="${formProp3}"` : '' } ${(formProp4) ? `data-form-prop4="${formProp4}"` : ''} ${(index) ? `data-index="${index}"` : ''}>
          <span class="removeInputButtonText">-</span>
        </button>

        <button class="addInputButton addInputButton--inInput" type="button" ${(formSection) ? `data-form-section="${formSection}"` : '' } ${(formProp) ? `data-form-prop="${formProp}"` : ''} ${(formProp2) ? `data-form-prop2="${formProp2}"` : ''} ${(formProp3) ? `data-form-prop3="${formProp3}"` : '' } ${(formProp4) ? `data-form-prop4="${formProp4}"` : ''} ${(index) ? `data-index="${index}"` : ''}>
          <span class="addInputButtonText">+</span>
        </button>
      </div>
    </div>
  `;
};

const getInputThematics = (values, data) => {
  let html = '';

  if (!values?.length) html += getInputThematicsHtml();
  else values.forEach((value, i) => { html += getInputThematicsHtml(value, i, data); });

  return html;
};

const getInputsDecisionMaking = (values) => {
  let html = '';

  if (!values?.length) html += getInputsDecisionMakingHtml();
  else values.forEach((value, i) => { html += getInputsDecisionMakingHtml(value, i); });

  return html;
};

const getInputGlosary = (values, data) => {
  let html = '';

  if (!values?.length) html += getInputGlosaryHtml();
  else values.forEach((value, i) => { html += getInputGlosaryHtml(value, i, data); });

  return html;
};

const getInputPictureHtml = (value = '', index = 0, name='') => {
  
  return `
    <div class="inputContainer" style="justify-content: right">
      <span class="inputPictureButtonText"></span>
      <label for="inputPictureButton__${name}" class="inputPictureButton custom-file-upload" class="input input--text noselect">
          Subir Imagen
      </label>

      <input type="file" accept="image/png,image/jpeg" data-name="${name}" value="${value}" id="inputPictureButton__${name}" style="display: none;" class="inputPictureButtons">
    </div>
  `;
};

const getCustomHtml = async (data) => {
  let value;
  const { formSection, formProp, formProp2, formProp3, typeInput, name } = data;
  const generatorValues = await getGeneratorValues();

  if (typeInput === 'picture') value = allPicturesFiles?.[name] || '';
  else if (formProp3) value = generatorValues?.[formSection]?.[formProp]?.[formProp2]?.[formProp3];
  else if (formProp2) value = generatorValues?.[formSection]?.[formProp]?.[formProp2];
  else if (formProp) value = generatorValues?.[formSection]?.[formProp];
  else value = generatorValues?.[formSection];

  if (typeInput === 'simple') return getInputSimple(value);
  if (typeInput === 'multiple') return getInputMultiple(value, data);
  if (typeInput === 'multipleAnswers') return getInputMultipleAnswers(value);
  if (typeInput === 'glosary') return getInputGlosary(value, data);
  if (typeInput === 'thematics') return getInputThematics(value, data);
  if (typeInput === 'decisionMakingOptions') return getDecisionMakingOptions(value, formProp, data);
  if (typeInput === 'picture') { return getInputPictureHtml(value, 0, name); }

  return '';
};

const initializeInputsContainer = async () => {
  countReloads += 1;

  const promises = Array.from(inputsContainer).map(async (inputContainer) => {
    inputContainer.innerHTML = await getCustomHtml(inputContainer?.dataset);
  });

  await Promise.all(promises);

  return;
};

const getDecisionMakingOptionsHtml = ({ title, detail, badAnswerText, newDecision, typeResponse }, index = 0, decisionPosition = 0, data) => {
  const { formSection, formProp, formProp2 } = data;

  const html = `
    <div class="decisionMaking__option" style="${(index !== 0) ? 'margin-top: 1.5rem;' : ''}">
      <div class="option__header">
        <div class="inputsContainer" style="width: 100%; margin: 0;">
          <div class="inputContainer headerWithButtons">
            <h3 class="option__headerTitle">
              <button class="addInputButton addInputButton--inWindow" type="button" data-type-value="object" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-index="${index}">
                <span class="addInputButtonText">+</span>
              </button>

              Opción ${index+1}

              <button class="removeInputButton removeInputButton--inWindow" type="button" data-type-value="object" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-index="${index}">
                <span class="removeInputButtonText removeInputButtonText--inWindow">-</span>
              </button>
            </h3>
          </div>
        </div>
      </div>

      <div class="option__body">
        <div class="inputsContainer" style="width: 100%;">
          <div class="inputContainer" style="margin-bottom: 0;">
            <label style="display: flex;align-items: center;justify-content: center;margin-right: 1rem;">
              Título/detalle:
            </label>
          </div>
        </div>

        <div class="inputsContainer" style="width: 37%;" data-type-input="multiple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="title">
          <div class="inputContainer">
            <input type="text" class="input input--text" style="width: 100%; margin-top: 0.2rem;" value="${title}">
          </div>
        </div>

        <div class="inputsContainer" data-type-input="multiple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="detail">
          <div class="inputContainer">
            <input type="text" class="input input--text" value="${detail}">
          </div>
        </div>

        <div class="inputsContainer" style="width: 100%;flex-wrap: wrap;margin-top: 1.5rem;margin-bottom: 1rem;">
          <div class="inputContainer" style="flex-wrap: wrap;justify-content: center;">
            <button class="incorrectAnswer__typeModalButton incorrectAnswer__typeModalButton--${Number(decisionPosition)+1}_${index+1}_feedback incorrectAnswer__typeModalButton--${index+1}" data-decision="${Number(decisionPosition)+1}" data-option="${Number(index)+1}" data-type="feedback" type="button">Retroalimentación</button>
            <button class="incorrectAnswer__typeModalButton incorrectAnswer__typeModalButton--${Number(decisionPosition)+1}_${index+1}_newDecision incorrectAnswer__typeModalButton--${index+1}" data-decision="${Number(decisionPosition)+1}" data-option="${Number(index)+1}" data-type="newDecision" type="button">Nueva Decisión</button>
          </div>
        </div>

        <div class="inputsContainer inputsContainer--${Number(decisionPosition)+1}_${index+1}_newDecision" style="width: 100%;/* display: none; */">
          <div class="inputContainer">
            <div class="decisionInputAndLabelContainer" style="border-radius: 0.5rem;border-color: #2350e75e;">
              <div class="inputAndLabelContainer" style="display: none;">
                <label class="inputLabel" style="color: #041e74;">Tipo:</label>

                <div class="inputsContainer" data-type-input="simple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="type">
                  <div class="inputContainer">
                    <input type="number" class="input input--text" value="${newDecision.type}" min="1" max="20">
                  </div>
                </div>
              </div>

              <div class="inputAndLabelContainer">
                <label class="inputLabel" style="color: #041e74;">Imagen:</label>

                <div class="inputsContainer" data-name="decisionMakingPicture_${decisionPosition+1}_${index+1}">
                  <div class="inputContainer" style="justify-content: right">
                    <span class="inputPictureButtonText"></span>

                    <label for="inputPictureButton__decisionMakingPicture_${Number(decisionPosition)+1}_${index+1}" class="inputPictureButton custom-file-upload">
                        Subir Imagen
                    </label>

                    <input type="file" accept="image/png,image/jpeg" data-name="decisionMakingPicture_${Number(decisionPosition)+1}_${index+1}" value="" id="inputPictureButton__decisionMakingPicture_${Number(decisionPosition)+1}_${index+1}" style="display: none;" class="inputPictureButtons">
                  </div>
                </div>
              </div>

              <div class="inputAndLabelContainer">
                <label class="inputLabel" style="color: #041e74;">Título:</label>

                <div class="inputsContainer" data-type-input="multiple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5='title'>
                  ${newDecision?.title?.map((title, i) => `
                    <div class="inputContainer">
                      <input type="text" class="input input--array" data-index="${i}" value="${title}">

                      <div class="inputButtons">
                        <button class="removeInputButton removeInputButton--inInput" type="button" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5='title' data-index="${i}">
                          <span class="removeInputButtonText">-</span>
                        </button>
                  
                        <button class="addInputButton addInputButton--inInput" type="button" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5='title' data-index="${i}">
                          <span class="addInputButtonText">+</span>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="inputAndLabelContainer">
                <label class="inputLabel" style="color: #041e74;">Descripción:</label>

                <div class="inputsContainer" data-type-input="multiple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5='detail'>
                  ${newDecision?.detail?.map((title, i) => `
                    <div class="inputContainer">
                      <input type="text" class="input input--array" data-index="${i}" value="${title}">

                      <div class="inputButtons">
                        <button class="removeInputButton removeInputButton--inInput" type="button" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5='detail' data-index="${i}">
                          <span class="removeInputButtonText">-</span>
                        </button>
                  
                        <button class="addInputButton addInputButton--inInput" type="button" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5='detail' data-index="${i}">
                          <span class="addInputButtonText">+</span>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="inputAndLabelContainer" style="display: none;">
                <label class="inputLabel" style="color: #041e74;">Estudiante acertó (Img):</label>

                <div class="inputsContainer" data-name="decisionMakingPicture_${decisionPosition+1}_${index+1}">
                  <div class="inputContainer" style="justify-content: right">
                    <span class="inputPictureButtonText"></span>
                    <label for="inputPictureButton__answersCompleted_${decisionPosition}_${index+1}" class="inputPictureButton custom-file-upload">
                        Subir Imagen
                    </label>

                    <input type="file" accept="image/png,image/jpeg" data-name="answersCompleted_${Number(decisionPosition)+1}_${index+1}" value="" id="inputPictureButton__answersCompleted_${decisionPosition}_${index+1}" style="display: none;" class="inputPictureButtons">
                  </div>
                </div>
              </div>

              <div class="inputAndLabelContainer" style="display: none; margin-top: 0;">
                <label class="inputLabel" style="color: #041e74;">Estudiante acertó (texto):</label>

                <div class="inputsContainer" data-type-input="multiple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="goodAnswerText">
                  ${newDecision?.goodAnswerText?.map((text, i) => `
                    <div class="inputContainer">
                      <input type="text" class="input input--array" data-index="${i}" value="${text}">

                      <div class="inputButtons">
                        <button class="removeInputButton removeInputButton--inInput" type="button" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="goodAnswerText" data-index="${i}">
                          <span class="removeInputButtonText">-</span>
                        </button>
                  
                        <button class="addInputButton addInputButton--inInput" type="button" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="goodAnswerText" data-index="${i}">
                          <span class="addInputButtonText">+</span>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="inputAndLabelContainer" style="display: none;">
                <label class="inputLabel" style="color: #041e74;">Opción correcta:</label>

                <div class="inputsContainer" data-type-input="multipleAnswers" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="answers">
                  ${getInputMultipleAnswersHtml(newDecision?.answers?.[0], 0)}
                </div>
              </div>

              <div class="inputAndLabelContainer" style="margin-top: 2rem">
                <label class="inputLabel" style="color: #041e74;">Opciones:</label>

                ${newDecision?.options?.map(({ title, detail, badAnswerText }, optionIndex) => `
                  <div class="inputsContainer" style="display: block;width: 90%;margin: 1rem auto 3rem auto;" data-type-input="decisionMakingOptions" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop4="newDecision" data-form-prop5="options" data-form-prop6="${optionIndex}" data-type-value="object">
                    <div class="decisionMaking__option" style="${(optionIndex !== 0) ? 'margin-top: 1.5rem;' : ''} border-right-color: rgba(35, 80, 231, 0.37);border-bottom-color: rgba(35, 80, 231, 0.37);border-left-color: rgba(35, 80, 231, 0.37);">
                      <div class="option__header">
                        <div class="inputsContainer" style="width: 100%; margin: 0;">
                          <div class="inputContainer headerWithButtons">
                            <h3 class="option__headerTitle">
                              <button class="addInputButton addInputButton--inWindow" type="button" data-type-value="object" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="options" data-index="${optionIndex}">
                                <span class="addInputButtonText">+</span>
                              </button>
                
                              Opción ${optionIndex+1}
                
                              <button class="removeInputButton removeInputButton--inWindow" type="button" data-type-value="object" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="options" data-index="${optionIndex}">
                                <span class="removeInputButtonText removeInputButtonText--inWindow">-</span>
                              </button>
                            </h3>
                          </div>
                        </div>
                      </div>
                
                      <div class="option__body">
                        <div class="inputsContainer" style="width: 100%;">
                          <div class="inputContainer" style="margin-bottom: 0;">
                            <label style="display: flex;align-items: center;justify-content: center;margin-right: 1rem;color: #041e74;">
                              Título/detalle:
                            </label>
                          </div>
                        </div>
                
                        <div class="inputsContainer" style="width: 37%;" data-type-input="multiple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="options" data-form-prop6="${optionIndex}" data-form-prop7="title">
                          <div class="inputContainer">
                            <input type="text" class="input input--text" style="width: 100%; margin-top: 0.2rem;" value="${title}">
                          </div>
                        </div>
                
                        <div class="inputsContainer" data-type-input="multiple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="options" data-form-prop6="${optionIndex}" data-form-prop7="detail">
                          <div class="inputContainer">
                            <input type="text" class="input input--text" value="${detail}">
                          </div>
                        </div>
                      </div>

                      <div class="inputsContainer" style="width: 100%;">
                        <div class="inputContainer">
                          <div class="inputAndLabelContainer" style="margin-right: 0;display: flex;align-items: center;margin-bottom: 0;">
                            <label class="inputLabel" style="color: #041e74;">Estudiante falló (Img):</label>

                            <div class="inputsContainer" data-type-input="picture" data-form-section="${formSection}" data-form-prop="picture" data-name="incorrectAnswer_${index+1}">
                              <div class="inputContainer" style="justify-content: right">
                                <span class="inputPictureButtonText"></span>
                                <label for="inputPictureButton__newDecision_incorrectAnswer_${Number(decisionPosition)+1}_${index+1}_${optionIndex+1}" class="inputPictureButton custom-file-upload">
                                    Subir Imagen
                                </label>

                                <input type="file" accept="image/png,image/jpeg" data-name="newDecision_incorrectAnswer_${Number(decisionPosition)+1}_${index+1}_${optionIndex+1}" value="" id="inputPictureButton__newDecision_incorrectAnswer_${Number(decisionPosition)+1}_${index+1}_${optionIndex+1}" style="display: none;" class="inputPictureButtons">
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="inputContainer">
                          <div class="inputAndLabelContainer" style="margin-right: 0">
                            <label class="inputLabel" style="color: #041e74;">Estudiante falló (texto):</label>

                            <div class="inputsContainer" data-type-input="multiple" data-type-value="object" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="options" data-form-prop6="${optionIndex}" data-form-prop7="badAnswerText">
                              ${badAnswerText?.map((text, i) => `
                                <div class="inputContainer">
                                  <input type="text" class="input input--array" value="${text}" data-index="${i}" data-input-prop="badAnswerText">

                                  <div class="inputButtons">
                                    <button class="removeInputButton removeInputButton--inInput" type="button" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="options" data-form-prop6="${optionIndex}" data-form-prop7="badAnswerText" data-index="${i}">
                                      <span class="removeInputButtonText">-</span>
                                    </button>
                              
                                    <button class="addInputButton addInputButton--inInput" type="button" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="newDecision" data-form-prop5="options" data-form-prop6="${optionIndex}" data-form-prop7="badAnswerText" data-index="${i}">
                                      <span class="addInputButtonText">+</span>
                                    </button>
                                  </div>
                                </div>
                              `).join('')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div><br>
            </div>
          </div>
        </div>

        <div class="inputsContainer inputsContainer--${Number(decisionPosition)+1}_${index+1}_feedback" style="width: 100%;">
          <div class="inputContainer">
            <div class="inputAndLabelContainer" style="margin-right: 0;display: flex;align-items: center;margin-bottom: 0;">
              <label class="inputLabel">Estudiante falló (Imagen):</label>

              <div class="inputsContainer" data-type-input="picture" data-form-section="decisionMaking" data-form-prop="picture" data-name="incorrectAnswer_${index+1}">
                <div class="inputContainer" style="justify-content: right">
                  <span class="inputPictureButtonText"></span>
                  <label for="inputPictureButton__incorrectAnswer_${decisionPosition}_${index+1}" class="inputPictureButton custom-file-upload">
                      Subir Imagen
                  </label>

                  <input type="file" accept="image/png,image/jpeg" data-name="incorrectAnswer_${Number(decisionPosition)+1}_${index+1}" value="" id="inputPictureButton__incorrectAnswer_${decisionPosition}_${index+1}" style="display: none;" class="inputPictureButtons">
                </div>
              </div>
            </div>
          </div>

          <div class="inputContainer">
            <div class="inputAndLabelContainer" style="margin-right: 0">
              <label class="inputLabel">Estudiante falló (texto):</label>

              <div class="inputsContainer" data-type-input="multiple" data-type-value="object" data-form-section="decisionMaking" data-form-prop="${decisionPosition}" data-form-prop2="options" data-form-prop3="${index}" data-form-prop4="badAnswerText">
                ${badAnswerText?.map((text, i) => `
                  <div class="inputContainer">
                    <input type="text" class="input input--array" value="${text}" data-index="${i}" data-input-prop="badAnswerText">

                    <div class="inputButtons">
                      <button class="removeInputButton removeInputButton--inInput" type="button" data-form-section="decisionMaking" data-form-prop="${decisionPosition}" data-form-prop2="options" data-form-prop3="${index}" data-form-prop4="badAnswerText" data-index="${i}">
                        <span class="removeInputButtonText">-</span>
                      </button>
                
                      <button class="addInputButton addInputButton--inInput" type="button" data-form-section="decisionMaking" data-form-prop="${decisionPosition}" data-form-prop2="options" data-form-prop3="${index}" data-form-prop4="badAnswerText" data-index="${i}">
                        <span class="addInputButtonText">+</span>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return html;
};

const getDecisionMakingOptions = (values, decisionPosition, data) => {
  let html = '';

  if (!values?.length) html += getDecisionMakingOptionsHtml();
  else values.forEach((value, i) => { html += getDecisionMakingOptionsHtml(value, i, decisionPosition, data); });

  return html;
};

const initializeDecisionMakingContainer = async () => {
  let html = `
    <div class="inputAndLabelContainer" style="width: 70%;margin-left: 0;margin-right: 0;">
      <label class="inputLabel" style="line-height: 1rem; margin-bottom: 1rem;">Pantallas de referencia:</label>

      <div style="height: calc(100% - 2rem);">
        <img src="assets/referencia_decisionMaking.png" alt="referencia_decisionMaking" class="reference_pictures">
      </div>
    </div>

    <div class="inputAndLabelContainer" style="width: 70%;margin-left: 0;margin-right: 0;">
      <div style="height: calc(100% - 2rem);">
        <img src="assets/referencia_badAnswer.jpg" alt="referencia_badAnswer" class="reference_pictures">
      </div>
    </div>

    <div class="inputAndLabelContainer" style="width: 70%;margin-left: 0;margin-right: 0;">
      <div style="height: calc(100% - 2rem);">
        <img src="assets/referencia_goodAnswer.jpg" alt="referencia_goodAnswer" class="reference_pictures">
      </div>
    </div>
  `;
  const generatorValues = await getGeneratorValues();

  generatorValues.decisionMaking?.forEach((_decisionData, i) => {
    html += `
      <div class="decisionContainer">
        <h3 class="decisionMainTitle">
          <span class="addInputButton addInputButton--inWindow" data-form-section="decisionMaking" data-index="${i}">+</span>
          <span>Decisión ${i+1}</span>
          <span class="removeInputButton removeInputButton--inWindow" data-form-section="decisionMaking" data-index="${i}">-</span>
        </h3>

        <div class="decisionInputAndLabelContainer">
          <div class="inputAndLabelContainer" style="display: none;">
            <label class="inputLabel">Tipo:</label>
            <div class="inputsContainer" data-type-input="simple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="type"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Imagen:</label>
            <div class="inputsContainer" data-type-input="picture" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="picture" data-name="decisionMakingPicture_${i+1}"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Título:</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="title"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Descripción:</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="detail"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">El estudiante acertó (Imagen):</label>
            <div class="inputsContainer" data-type-input="picture" data-form-section="decisionMaking" data-form-prop="picture" data-name="answersCompleted_${i+1}"></div>
          </div>

          <div class="inputAndLabelContainer" style="margin-top: 0">
            <label class="inputLabel">El estudiante acertó (texto):</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="goodAnswerText"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Número de la opción correcta:</label>
            <div class="inputsContainer" data-type-input="multipleAnswers" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="answers"></div>
          </div>

          <div class="inputAndLabelContainer" style="margin-top: 2rem">
            <label class="inputLabel">Opciones:</label>
            <div class="inputsContainer" style="display: block;width: 90%;margin: 1rem auto 3rem auto;" data-type-input="decisionMakingOptions" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="options" data-type-value="object"></div>
          </div><br>
        </div>
      </div>
    `;
  });

  formGeneratorSectionDecisionMaking.innerHTML = html;
};

const initializeData = async () => {
  await initializeDecisionMakingContainer();
  initializeGeneratorConstants();
  await initializeInputsContainer();
  initializeGeneratorConstants();
};

const initializeMainValues = async () => {
  initializeGeneratorConstants();
  await initializeData();
  initializeGeneratorConstants();
  initializeEvents();
  initializeGeneratorConstants();

  const currentValues = getCurrentGeneratorValues();
  const tabIndex = (currentValues?.generator?.currentTab || 1) - 1;

  tabs?.[tabIndex]?.click();
};

const restartPictureInputs = () => {
  const currentValues = getCurrentGeneratorValues();
  currentValues.presentation.picture = '';
  currentValues.instructionsAndObjectives.picture = '';
  setGeneratorValues(currentValues);
};

const pageReady = async () => {
  await initializeMainValues();
};

document.addEventListener('DOMContentLoaded', pageReady);