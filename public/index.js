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
let addDecisionButtons;
let removeInputButtons;
let removeDecisionButtons;
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

  addInputButtons = document.querySelectorAll('.addInputButton');
  removeInputButtons = document.querySelectorAll('.removeInputButton');
  addDecisionButtons = document.querySelectorAll('.addDecisionButton');
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
  const { inputProp, index } = dataset;
  const inputContainer = e.currentTarget.parentElement;
  const allInputsContainer = inputContainer.parentElement;
  const { formSection, formProp, formProp2, typeValue } = allInputsContainer?.dataset;
  const inputs = allInputsContainer.querySelectorAll('input');
  const currentValues = getCurrentGeneratorValues();

  if (!formProp2) {
    const isArray = Array.isArray(currentValues[formSection][formProp]);

    if (isArray) currentValues[formSection][formProp][index] = value;
    else currentValues[formSection][formProp] = value;
  }
  else {
    const isArray = Array.isArray(currentValues[formSection][formProp][formProp2]);

    if (isArray) {
      const valueIsAnObject = (typeValue === 'object');

      if (!valueIsAnObject) currentValues[formSection][formProp][formProp2][index] = value;
      else {
        currentValues[formSection][formProp][formProp2][index][inputProp] = value;
      }
    }
    else currentValues[formSection][formProp][formProp2] = value;
  }
  
  setGeneratorValues(currentValues);

  initializeGeneratorConstants();
  initializeEvents();
};

const removeInputButtonClicked = async (e) => {
  const currentValues = getCurrentGeneratorValues();
  const typeValue = e.currentTarget?.dataset?.typeValue;
  const isAnObjectValue = (typeValue === 'object');
  const index = Number(e.currentTarget?.dataset?.index || 0);
  const { formSection, formProp, formProp2 } = e.currentTarget?.parentElement?.parentElement?.parentElement?.dataset;

  if (!formProp2) {
    const newArray = currentValues[formSection]?.[formProp]?.filter((_row, i) => (i !== index));
    if (newArray?.length) currentValues[formSection][formProp] = newArray;
    else {
      if (!isAnObjectValue) currentValues[formSection][formProp] = [''];
      else {
        const newObjectValue = {};
        Object.keys(currentValues[formSection]?.[formProp]?.[0])?.forEach((key) => { newObjectValue[key] = ''; })
        currentValues[formSection][formProp] = [newObjectValue];
      }
    }
  } else {
    const newArray = currentValues[formSection]?.[formProp]?.[formProp2]?.filter((_row, i) => (i !== index));

    if (newArray?.length) currentValues[formSection][formProp][formProp2] = newArray;
    else {
      if (!isAnObjectValue) currentValues[formSection][formProp][formProp2] = [''];
      else {
        const newObjectValue = {};
        Object.keys(currentValues[formSection]?.[formProp]?.[formProp2]?.[0])?.forEach((key) => { newObjectValue[key] = ''; })
        currentValues[formSection][formProp][formProp2] = [newObjectValue];
      }
    }
  }

  setGeneratorValues(currentValues);

  await initializeMainValues();
};

const addInputButtonClicked = async (e) => {
  const currentValues = getCurrentGeneratorValues();
  const typeValue = e.currentTarget?.dataset.typeValue;
  const isAnObjectValue = (typeValue === 'object');

  const index = Number(e.currentTarget?.dataset?.index || 0);
  const { formSection, formProp, formProp2 } = e.currentTarget?.parentElement?.parentElement?.parentElement?.dataset;

  if (!formProp2) {
    const newArray = [];
    currentValues[formSection]?.[formProp]?.forEach((row, i) => {
      newArray.push(row);

      if (i === index) {
        if (!isAnObjectValue) newArray.push('');
        else {
          const newObject = {};
          Object.keys(row).forEach((key) => { newObject[key] = ''; });
          newArray.push(newObject);
        }
      }
    });

    currentValues[formSection][formProp] = (newArray?.length) ? newArray : [''];
  } else {
    const newArray = [];
    currentValues[formSection]?.[formProp]?.[formProp2]?.forEach((row, i) => {
      newArray.push(row);
      if (i === index) {
        if (!isAnObjectValue) newArray.push('');
        else {
          const newObject = {};
          Object.keys(row).forEach((key) => { newObject[key] = ''; });
          newArray.push(newObject);
        }
      }
    });

    currentValues[formSection][formProp][formProp2] = (newArray?.length) ? newArray : [''];
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

const setAddInputButton = () => {
  addInputButtons?.forEach((addInputButton) => { addInputButton.addEventListener('click', addInputButtonClicked); });
  removeInputButtons?.forEach((removeInputButton) => { removeInputButton.addEventListener('click', removeInputButtonClicked); });

  addDecisionButtons?.forEach((button) => button.addEventListener('click', addDecisionButtonClicked));
  removeDecisionButtons?.forEach((button) => button.addEventListener('click', removeDecisionButtonClicked));

  presentationInputs?.forEach((input) => { input.addEventListener('keyup', inputUpdated); });
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

const getInputMultipleHtml = (value = '', index = 0) => (`
  <div class="inputContainer">
    <input type="text" class="input input--array" value="${value}" data-index="${index}">

    <div class="inputButtons">
      <button class="removeInputButton" type="button" data-index="${index}">
        <span class="removeInputButtonText">-</span>
      </button>

      <button class="addInputButton" type="button" data-index="${index}">
        <span class="addInputButtonText">+</span>
      </button>
    </div>
  </div>
`);

const getInputMultiple = (values = []) => {
  let html = '';

  if (!values?.length) html += getInputMultipleHtml();
  else values.forEach((value, i) => { html += getInputMultipleHtml(value, i); });

  return html;
};

const getInputMultipleAnswersHtml = (value = '', index = 0) => (`
  <div class="inputContainer">
    <input type="number" class="input input--text" style="width: auto; color: black; font-style: normal; font-size: 1rem; font-weight: bolder;" value="${value}" min="1" max="20" data-index="${index}">
  </div>
`);

const getInputMultipleAnswers = (values) => {
  let html = '';

  if (!values?.length) html += getInputMultipleAnswersHtml();
  else html += getInputMultipleAnswersHtml(values?.[0], 0);

  return html;
};

const getInputGlosaryHtml = ({ word, description }, index = 0) => (`
  <div class="inputContainer">
    <input type="text" class="input input--multiplePropValue" value="${word}" data-index="${index}" data-input-prop="word" >
    <input type="text" class="input input--array" value="${description}" data-index="${index}" data-input-prop="description">

    <div class="inputButtons">
      <button class="removeInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="removeInputButtonText">-</span>
      </button>

      <button class="addInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="addInputButtonText">+</span>
      </button>
    </div>
  </div>
`);

const getInputThematicsHtml = ({ thematic, descripcion }, index = 0) => (`
  <div class="inputContainer">
    <input type="text" class="input input--multiplePropValue" value="${thematic}" data-index="${index}" data-input-prop="thematic">
    <input type="text" class="input input--array" value="${descripcion}" data-index="${index}" data-input-prop="descripcion">

    <div class="inputButtons">
      <button class="removeInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="removeInputButtonText">-</span>
      </button>

      <button class="addInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="addInputButtonText">+</span>
      </button>
    </div>
  </div>
`);

const getInputThematics = (values) => {
  let html = '';

  if (!values?.length) html += getInputThematicsHtml();
  else values.forEach((value, i) => { html += getInputThematicsHtml(value, i); });

  return html;
};

const getInputsDecisionMaking = (values) => {
  let html = '';

  if (!values?.length) html += getInputsDecisionMakingHtml();
  else values.forEach((value, i) => { html += getInputsDecisionMakingHtml(value, i); });

  return html;
};

const getInputGlosary = (values) => {
  let html = '';

  if (!values?.length) html += getInputGlosaryHtml();
  else values.forEach((value, i) => { html += getInputGlosaryHtml(value, i); });

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
  `
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
  if (typeInput === 'multiple') return getInputMultiple(value);
  if (typeInput === 'multipleAnswers') return getInputMultipleAnswers(value);
  if (typeInput === 'glosary') return getInputGlosary(value);
  if (typeInput === 'thematics') return getInputThematics(value);
  if (typeInput === 'decisionMakingOptions') return getDecisionMakingOptions(value);
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

const getDecisionMakingOptionsHtml = ({ title, detail }, index = 0) => (`
  <div class="inputContainer">
    <label style="display: flex; align-items: center; justify-content: left; margin-right: 5px; font-weight: bolder; color: black;">
      ${index+1}. 
    </label>
    <input type="text" class="input input--multiplePropValue" value="${title}" data-index="${index}" data-input-prop="title">
    <input type="text" class="input input--array" value="${detail}" data-index="${index}" data-input-prop="detail">

    <div class="inputButtons">
      <button class="removeInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="removeInputButtonText">-</span>
      </button>

      <button class="addInputButton" type="button" data-type-value="object" data-index="${index}">
        <span class="addInputButtonText">+</span>
      </button>
    </div>
  </div>
`);

const getDecisionMakingOptions = (values) => {
  let html = '';

  if (!values?.length) html += getDecisionMakingOptionsHtml();
  else values.forEach((value, i) => { html += getDecisionMakingOptionsHtml(value, i); });

  return html;
};

const initializeDecisionMakingContainer = async () => {
  let html = '';
  const generatorValues = await getGeneratorValues();

  generatorValues.decisionMaking?.forEach((_decisionData, i) => {
    html += `
      <div class="decisionContainer">
        <h3 class="decisionMainTitle">
          <span class="addDecisionButton" data-decision-index="${i}">+</span>
          Decision ${i+1}
          <span class="removeDecisionButton" data-decision-index="${i}">-</span>
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
            <label class="inputLabel">Opciones (Titulo/detalle):</label>
            <div class="inputsContainer" data-type-input="decisionMakingOptions" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="options" data-type-value="object"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Número de la respuesta correcta:</label>
            <div class="inputsContainer" data-type-input="multipleAnswers" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="answers"></div>
          </div><br>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">El usuario acertó (Imagen):</label>
            <div class="inputsContainer" data-type-input="picture" data-form-section="decisionMaking" data-form-prop="picture" data-name="answersCompleted_${i+1}"></div>
          </div>

          <div class="inputAndLabelContainer" style="margin-top: 0">
            <label class="inputLabel">El usuario acertó (texto):</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="goodAnswerText"></div>
          </div><br>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">El usuario se equivocó (Imagen):</label>
            <div class="inputsContainer" data-type-input="picture" data-form-section="decisionMaking" data-form-prop="picture" data-name="incorrectAnswer_${i+1}"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">El usuario se equivocó (texto):</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="badAnswerText"></div>
          </div>
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