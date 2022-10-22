let resultsHtml;

const getResultsHtml = async () => {
  const url = '/components/results/results.html';
  resultsHtml = await htmlFetch({ url });

  return resultsHtml;
};

const loadResult = () => {
  mainContainer.innerHTML = resultsHtml;
};