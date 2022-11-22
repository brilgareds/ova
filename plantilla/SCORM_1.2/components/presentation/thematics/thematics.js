let thematicHtml;
let thematicsList;
let thematicsTitles;

const getThematicHtml = async () => {
  const url = 'components/presentation/thematics/thematics.html';
  thematicHtml = await htmlFetch({ url });

  return thematicHtml;
};

const loadThematicHtml = () => {
  instruccionsMainContainer.innerHTML = thematicHtml;
};

const loadThematicGeneralConstants = () => {
  thematicsList = document.querySelector('.ovaObjectives__objectivesContainer');
  thematicsTitles = document.querySelector('.ovaObjectives__descriptionsTitles');
}

const loadTitleThematicsData = () => {
  let thematicTitleHtml = '';

  config?.instructionsAndObjectives?.thematics?.title?.forEach((title) => {
    thematicTitleHtml += `
      <p class="ovaObjectives__descriptionTitleContainer">
        <span class="ovaObjectives__descriptionTitle">${formatText(title)}</span>
      </p>
    `;
  });

  thematicsTitles.innerHTML = thematicTitleHtml;
};

const loadDetailThematicsData = () => {
  let thematicDetail = '';

  config?.instructionsAndObjectives?.thematics?.detail?.forEach(({ thematic, descripcion }) => {
    thematicDetail += `
      <li class="ovaObjectives__objectiveContainer" style="margin-bottom: 1rem">
        <div class="objetiveImageContainer">
          <img class="objetiveImage" src="assets/images/circle.png" alt="circle" >
        </div>

        <div class="objectiveDescriptionContainer">
          <span class="objectiveDescription">
            <span class="ovaObjectives__descriptionTitle">${(thematic) ? `${formatText(thematic)}:` : ''}</span>
            ${formatText(descripcion)}
          </span>
        </div>
      </li>
    `;
  });

  thematicsList.innerHTML = thematicDetail;
};

const loadThematicData = () => {
  loadTitleThematicsData();
  loadDetailThematicsData();
};

const initializeThematic = (e) => {
  updateTab(e.currentTarget);
  loadThematicHtml();
  loadThematicGeneralConstants();
  loadThematicData();
  resetExtraSection();
};
