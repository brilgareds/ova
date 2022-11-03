let glosary;
let glosaryHtml;
let buttonGlosary;
let instructionsGlosaryTitle;
let instructionsGlosaryHtml;

const getInstructionGlosaryHtml = async () => {
  const url = '/components/presentation/instructions/instructionsGlosary/instructionsGlosary.html';
  instructionsGlosaryHtml = await htmlFetch({ url });

  return instructionsGlosaryHtml;
};

const loadInstructionsGlosaryHtml = () => {
  instruccionsMainContainer.innerHTML = instructionsGlosaryHtml;
};

const loadExtraSection = () => {
  document.querySelector('.extraSection').innerHTML = glosaryHtml;

  document.querySelectorAll('.glosaryAlphabetContainer__letter')?.forEach((letterElement) => {
    letterElement.addEventListener('click', updateGlosary)
  });
};

const loadGlosary = () => {
  document.querySelector('.glosaryAlphabetContainer__letter')?.click();
};

const getWordsByLetter = (letter) => {
  const { words } = config.glosary;
  const newWordsArray = [];

  words.forEach((wordsObject) => {
    const { word, description } = wordsObject;
    const firstLetterOfWord = word?.[0]?.toLowerCase();
    const firstLetterOfDescription = description?.[0]?.toLowerCase();
    const startWithTheLetterRequired = (firstLetterOfWord === letter?.toLowerCase());

    if (startWithTheLetterRequired) {
      const newData = {
        word: `${firstLetterOfWord.toUpperCase()}${word.toLowerCase().substring(1)}`,
        description: `${firstLetterOfDescription.toUpperCase()}${description.toLowerCase().substring(1)}`,
      };

      newWordsArray.push(newData);
    }
  });

  return newWordsArray;
};

const filterGlosaryWithALetter = (letter) => {
  let newHtml = '';
  const wordsArray = getWordsByLetter(letter);

  wordsArray.forEach(({ word, description }) => {
    newHtml += `
      <li class="ovaObjectives__objectiveContainer" style="padding-bottom: 1rem">
        <div class="objectiveDescriptionContainer">
          <span class="objectiveDescription">
            <span class="ovaObjectives__descriptionTitle">${word}:</span> ${formatText(description)}
          </span>
        </div>
      </li>
    `;
  });

  document.querySelector('.ovaObjectives__objectivesContainer').innerHTML = newHtml;
};

const removeAllActiveGlosaryTabs = () => {
  document.querySelectorAll('.glosaryAlphabetContainer__letter')?.forEach((glosaryTab) => {
    glosaryTab.classList.remove('glosaryAlphabetContainer__letter--active');
  });
};

const activeNewGlosaryTab = (tab) => tab.classList.add('glosaryAlphabetContainer__letter--active');

const updataTabGlosary = (e) => {
  removeAllActiveGlosaryTabs();
  activeNewGlosaryTab(e.target);
};

const updateGlosary = (e) => {
  updataTabGlosary(e);
  filterGlosaryWithALetter(e.target.innerHTML);
};

const loadInstructionsGlosaryConstants = () => {
  instructionsGlosaryTitle = document.querySelector('.ovaObjectives__descriptionsTitles');
};

const loadInstructionsGlosaryData = () => {
  let titlesHtml = '';

  config?.instructionsAndObjectives?.glosary?.title?.forEach((title) => {
    titlesHtml += `
      <p class="ovaObjectives__descriptionTitleContainer">
        <span class="ovaObjectives__descriptionTitle">${formatText(title)}</span>
      </p>
    `;
  });

  instructionsGlosaryTitle.innerHTML = titlesHtml;
};

const initializeGlosary = (e) => {
 updateTab(e.currentTarget);
 loadInstructionsGlosaryHtml();
 loadInstructionsGlosaryConstants();
 loadInstructionsGlosaryData();
 loadExtraSection();
 loadGlosary();
};