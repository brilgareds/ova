let decisionMakingHtml;
let decisionMakingOptions;

const getDecisionMakingHtml = async () => {
  const url = '/components/decisionMakings/decisionMaking_v1/decisionMaking_v1.html';
  decisionMakingHtml = await htmlFetch({ url });

  return decisionMakingHtml;
};

const removeAllOptionsSelected = () => {
  document.querySelectorAll('.decisionMakingOptions__label--active')?.forEach((e) => {
    e?.classList.remove('decisionMakingOptions__label--active');
  });

  document.querySelectorAll('.decisionMakingOptions__input--active')?.forEach((e) => {
    e?.classList.remove('decisionMakingOptions__input--active');
  })
};

const updateOptionSelected = (e) => {
  const id = e?.target?.getAttribute('id');

  removeAllOptionsSelected();
  e?.currentTarget?.querySelector('.decisionMakingOptions__label')?.classList.add('decisionMakingOptions__label--active');

  e?.currentTarget?.querySelector('.decisionMakingOptions__input')?.classList.add('decisionMakingOptions__input--active');
};

const initializeDecisionMakingValues = () => {
  mainContainer.setAttribute('class','mainContainer');
  mainContainer.innerHTML = decisionMakingHtml;

  decisionMakingOptions = document.querySelectorAll('.decisionMakingOption');
};

const initializeDecisionMakingEvents = () => {
  decisionMakingOptions?.forEach((option) => option?.addEventListener('click', updateOptionSelected));
};

const loadDecisionMakingHtml = () => {
  initializeDecisionMakingValues();
  initializeDecisionMakingEvents();
};