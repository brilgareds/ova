let instructionDescriptionHtml;
let instructionsTitle;
let instructionsDetail;

const getInstructionDescriptionHtml = async () => {
  const url = 'components/presentation/instructions/instructionDescription/instructionDescription.html';
  instructionDescriptionHtml = await htmlFetch({ url });

  return instructionDescriptionHtml;
};

const showInstructionDescription = () => {
  instruccionsMainContainer.innerHTML = instructionDescriptionHtml;
};

const loadInstructionDescriptionConstants = () => {
  instructionsTitle = document.querySelector('.ovaObjectives__descriptionsTitles');
  instructionsDetail = document.querySelector('.ovaObjectives__objectivesContainer');
};

const loadInstructionDescriptionTitleData = () => {
  let instructionsTitleHtml = '';

  config?.instructionsAndObjectives?.instructions?.title?.forEach((title) => {
    instructionsTitleHtml += `
      <p class="ovaObjectives__descriptionTitleContainer">
        <span class="ovaObjectives__descriptionTitle">${(title) ? `${formatText(title)}:` : ''}</span>
      </p>
    `;
  });

  instructionsTitle.innerHTML = instructionsTitleHtml;
};

const loadInstructionDescriptionDetailData = () => {
  let instructionsDetailHtml = '';

  config?.instructionsAndObjectives?.instructions?.detail?.forEach((text) => {
    instructionsDetailHtml += `
      <li class="ovaObjectives__objectiveContainer" style="margin-bottom: 1rem">
        <div class="objetiveImageContainer">
          <img class="objetiveImage" src="assets/images/circle.png" alt="circle" >
        </div>

        <div class="objectiveDescriptionContainer">
          <span class="objectiveDescription">
            ${formatText(text)}
          </span>
        </div>
      </li>
    `;
  });

  instructionsDetail.innerHTML = instructionsDetailHtml;
};

const loadInstructionDescriptionData = () => {
  loadInstructionDescriptionTitleData();
  loadInstructionDescriptionDetailData();
};

const loadInstructionDescriptionHtml = () => {
  showInstructionDescription();
  loadInstructionDescriptionConstants();
  loadInstructionDescriptionData();
};