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
  const { formSection, formProp, formProp2, formProp3, formProp4 } = allInputsContainer?.dataset;
  const currentValues = getCurrentGeneratorValues();

  if (index2) {
    if (formProp4) currentValues[formSection][formProp][formProp2][formProp3][formProp4][index][index2] = value;
    else if (formProp3) currentValues[formSection][formProp][formProp2][formProp3][index][index2] = value;
    else if (formProp2) currentValues[formSection][formProp][formProp2][index][index2] = value;
    else if (formProp) currentValues[formSection][formProp][index][index2] = value;
  } else if (index) {
    if (formProp4) currentValues[formSection][formProp][formProp2][formProp3][formProp4][index] = value;
    else if (formProp3) currentValues[formSection][formProp][formProp2][formProp3][index] = value;
    else if (formProp2) currentValues[formSection][formProp][formProp2][index] = value;
    else if (formProp) currentValues[formSection][formProp][index] = value;
  } else {
    if (formProp4) currentValues[formSection][formProp][formProp2][formProp3][formProp4] = value;
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
  const { formSection, formProp, formProp2, formProp3, formProp4 } = data;

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
  const typeValue = e.currentTarget?.dataset?.typeValue;
  const index = Number(e.currentTarget?.dataset?.index || 0);
  const { formSection, formProp, formProp2, formProp3, formProp4 } = e.currentTarget?.dataset;

  if (formProp4) {
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
  const { formSection, formProp, formProp2, formProp3, formProp4 } = e.currentTarget?.dataset;

  if (formProp4) {
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
  const type = e.current?.dataset?.type || '';

  typeModalButtons.forEach((button) => {
    
  });
  document.querySelector(`.inputsContainer--${type}`);
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
    <input type="number" class="input input--text" style="width: auto; color: black; font-style: normal; font-size: 1rem; font-weight: bolder;" value="${value}" min="1" max="20" data-index="${index}">
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

const getDecisionMakingOptionsHtml = ({ title, detail, badAnswerText }, index = 0, decisionPosition = 0, data) => {
  const { formSection, formProp, formProp2 } = data;

  return `
    ${(index !== 0) ? '<br><hr><br><br>' : '' }

    <div class="inputsContainer" style="width: 37%;" data-type-input="multiple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="title">
      <div class="inputContainer">
        <label style="display: flex;align-items: center;justify-content: left;margin-right: 1rem;font-weight: bolder;font-size: 1.2rem;color: black;">
          ${index+1}. 
        </label>
        <input type="text" class="input input--multiplePropValue" style="margin-top: 0.2rem;" value="${title}">
      </div>
    </div>

    <div class="inputsContainer" data-type-input="multiple" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-form-prop3="${index}" data-form-prop4="detail">
      <div class="inputContainer">
        <input type="text" class="input input--array" value="${detail}">

        <div class="inputButtons">
          <button class="removeInputButton removeInputButton--inInput" type="button" data-type-value="object" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-index="${index}">
            <span class="removeInputButtonText">-</span>
          </button>

          <button class="addInputButton addInputButton--inInput" type="button" data-type-value="object" data-form-section="${formSection}" data-form-prop="${formProp}" data-form-prop2="${formProp2}" data-index="${index}">
            <span class="addInputButtonText">+</span>
          </button>
        </div>
      </div>
    </div>

    <div class="inputsContainer" style="width: 100%;">
      <div class="inputContainer" style="flex-wrap: wrap;">
        <button class="incorrectAnswer__typeModalButton" data-type="feedback">Retroalimentación</button>
        <button class="incorrectAnswer__typeModalButton" data-type="newDecision">Nueva Decision</button>
      </div>
    </div>

    <div class="inputsContainer inputsContainer--newDecision" style="width: 100%;">
      <div class="inputContainer">
        TEST
      </div>
    </div>

    <div class="inputsContainer inputsContainer--feedback" style="width: 100%;">
      <div class="inputContainer">
        <div class="inputAndLabelContainer" style="margin-right: 0">
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
  `;
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
      <label class="inputLabel" style="line-height: 1rem; margin-bottom: 1rem;">Pantalla de referencia:</label>

      <div style="height: calc(100% - 2rem);">
        <img src="assets/referencia_decisionMaking.png" alt="referencia_decisionMaking" style="width: 100%; height: 100%;">
      </div>
    </div>

    <div class="inputAndLabelContainer" style="width: 70%;margin-left: 0;margin-right: 0;">
      <label class="inputLabel" style="line-height: 1rem; margin-bottom: 1rem;">Pantalla de referencia:</label>

      <div style="height: calc(100% - 2rem);">
        <img src="assets/referencia_badAnswer.jpg" alt="referencia_badAnswer" style="width: 100%; height: 100%;">
      </div>
    </div>

    <div class="inputAndLabelContainer" style="width: 70%;margin-left: 0;margin-right: 0;">
      <label class="inputLabel" style="line-height: 1rem; margin-bottom: 1rem;">Pantalla de referencia:</label>

      <div style="height: calc(100% - 2rem);">
        <img src="assets/referencia_goodAnswer.jpg" alt="referencia_goodAnswer" style="width: 100%; height: 100%;">
      </div>
    </div>
  `;
  const generatorValues = await getGeneratorValues();

  generatorValues.decisionMaking?.forEach((_decisionData, i) => {
    html += `
      <div class="decisionContainer">
        <h3 class="decisionMainTitle">
          <span class="addInputButton addInputButton--inWindow" data-form-section="decisionMaking" data-index="${i}">+</span>
          Decision ${i+1}
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

          <div class="inputAndLabelContainer" style="margin-top: 2rem">
            <label class="inputLabel">Opciones (Titulo/detalle):</label>
            <div class="inputsContainer" style="display: block;width: 90%;margin: 0 auto 0 auto;margin: 0;margin-top: 1rem;margin-bottom: 3rem;padding: 1rem 1rem 1rem 1rem;border: 1px solid #dedede;border-radius: 10px;" data-type-input="decisionMakingOptions" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="options" data-type-value="object"></div>
          </div>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">Número de la respuesta correcta:</label>
            <div class="inputsContainer" data-type-input="multipleAnswers" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="answers"></div>
          </div><br>

          <div class="inputAndLabelContainer">
            <label class="inputLabel">El estudiante acertó (Imagen):</label>
            <div class="inputsContainer" data-type-input="picture" data-form-section="decisionMaking" data-form-prop="picture" data-name="answersCompleted_${i+1}"></div>
          </div>

          <div class="inputAndLabelContainer" style="margin-top: 0">
            <label class="inputLabel">El estudiante acertó (texto):</label>
            <div class="inputsContainer" data-type-input="multiple" data-form-section="decisionMaking" data-form-prop="${i}" data-form-prop2="goodAnswerText"></div>
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