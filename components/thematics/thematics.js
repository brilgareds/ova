let thematicHtml;

const getThematicHtml = async () => {
  const url = '/components/thematics/thematics.html';
  thematicHtml = await htmlFetch({ url });

  return thematicHtml;
};

const loadThematicHtml = () => {
  instruccionsMainContainer.innerHTML = thematicHtml;
};

const initializeThematic = (e) => {
  updateTab(e.currentTarget);
  loadThematicHtml();
  resetExtraSection();
};
