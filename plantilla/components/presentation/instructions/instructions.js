let tabs;
let instructionsHtml;
let buttonObjectives;
let instruccionsMainContainer;
let buttonThematic;
let buttonInstruction;
let buttonNext;
let buttonPrevious;

const getInstructionsHtml = async () => {
  const url = '/components/presentation/instructions/instructions.html';
  instructionsHtml = await htmlFetch({ url });

  return instructionsHtml;
};

const selectFirstTab = () => buttonObjectives?.click();

const activeNewTab = (tab) => {
  tab?.classList.add('tabsContainer__button--active');
};

const removeAllActiveTabs = () => {
  tabs?.forEach((tab) => tab.classList.remove('tabsContainer__button--active'));
};

const cleanMainContainer = () => {
  instruccionsMainContainer.innerHTML = '';
};

const updateTab = (tab) => {
  removeAllActiveTabs();
  cleanMainContainer();
  activeNewTab(tab);
};

const initializeInstructions = (e) => {
  updateTab(e.currentTarget);
  loadInstructionDescriptionHtml();
  resetExtraSection();
};

const initializeOvaInstructionsEvents = () => {
  buttonObjectives?.addEventListener('click', initializeInstructionsObjectives);
  buttonThematic?.addEventListener('click', initializeThematic);
  buttonInstruction?.addEventListener('click', initializeInstructions);
  buttonGlosary?.addEventListener('click', initializeGlosary);
  buttonNext?.addEventListener('click', loadOvaContext2Html);
  buttonPrevious?.addEventListener('click', loadOvaPresentation);
};

const initializeOvaInstructionsValues = () => {
  tabs = document.querySelectorAll('.tabsContainer__button');
  buttonNext = document.querySelector('.instructionsNextButton');
  buttonGlosary = document.querySelector('.tabsContainer__buttonGlosary');
  buttonPrevious = document.querySelector('.instructionsPreviousButton');
  buttonThematic = document.querySelector('.tabsContainer__buttonThematic');
  buttonObjectives = document.querySelector('.tabsContainer__buttonObjectives');
  buttonInstruction = document.querySelector('.tabsContainer__buttonInstruction');
  instruccionsMainContainer = document.querySelector('.mainInstructionsContainer');
};

const resetExtraSection = () => { document.querySelector('.extraSection').innerHTML = ''; }

const showOvaInstructionsInMainContainer = () => {
  mainContainer.setAttribute('class', 'mainContainer');
  mainContainer.innerHTML = instructionsHtml;
  animateMainContainer();
};

const loadInstructionsHtml = () => {
  showOvaInstructionsInMainContainer();
  initializeOvaInstructionsValues();
  initializeOvaInstructionsEvents();
  selectFirstTab();
};