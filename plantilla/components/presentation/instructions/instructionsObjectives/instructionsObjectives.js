let objectivesHtml;
let ovaObjectivesTitlesContainer;
let challengeAlertTitleContainer;
let challengeAlertDetailContainer;
let ovaObjectivesObjectivesContainer;

const getObjectivesHtml = async () => {
  const url = '/components/presentation/instructions/instructionsObjectives/instructionsObjectives.html';
  objectivesHtml = await htmlFetch({ url });

  return objectivesHtml;
};

const loadObjectivesHtml = () => {
  instruccionsMainContainer.innerHTML = objectivesHtml;
  ovaObjectivesObjectivesContainer = document.querySelector('.ovaObjectives__objectivesContainer');
  ovaObjectivesTitlesContainer = document.querySelector('.ovaObjectives__descriptionTitlesContainer');
  challengeAlertTitleContainer = document.querySelector('.challengeAlert__titleContainer');
  challengeAlertDetailContainer = document.querySelector('.challengeAlert__detailContainer');
};

const initializeInstructionsObjectives = (e) => {
  updateTab(e.currentTarget);
  loadObjectivesHtml();
  initializeOvaObjectivesData();
  resetExtraSection();
};

const initializeOvaObjectivesData = () => {
  if (!ovaObjectivesTitlesContainer) return;
  if (!ovaObjectivesObjectivesContainer) return;
  if (!challengeAlertDetailContainer) return;
  if (!challengeAlertTitleContainer) return;

  let title = '';
  let detail = '';
  let extraInfoTitle = '';
  let extraInfoDetail = '';

  config.instructionsAndObjectives?.objectives?.title?.forEach((text) => {
    title += `<p class="ovaObjectives__descriptionTitleContainer">${formatText(text)}</p>`;
  });

  config.instructionsAndObjectives?.objectives?.detail?.forEach((text) => {
    detail += `
      <li class="ovaObjectives__objectiveContainer">
        <div class="objetiveImageContainer">
          <img class="objetiveImage" src="/assets/images/circle.png" alt="something" >
        </div>

        <div class="objectiveDescriptionContainer">
          <p class="objectiveDescription">${formatText(text)}</p>
        </div>
      </li>
    `;
  });

  config.instructionsAndObjectives?.extraInfo?.title?.forEach((text) => {
    extraInfoTitle += `<h3 class="challengeAlert__title">${formatText(text)}</h3>`;
  });

  config.instructionsAndObjectives?.extraInfo?.detail?.forEach((text) => {
    extraInfoDetail += `<p class="challengeAlert__detail challengeAlert__detail--instructions">${formatText(text)}</p>`;
  });

  ovaObjectivesTitlesContainer.innerHTML = title;
  ovaObjectivesObjectivesContainer.innerHTML = detail;
  challengeAlertTitleContainer.innerHTML = extraInfoTitle;
  challengeAlertDetailContainer.innerHTML = extraInfoDetail;
};