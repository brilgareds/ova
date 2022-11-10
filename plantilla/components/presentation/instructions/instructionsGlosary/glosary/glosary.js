
const getGlosaryHtml = async () => {
  const url = '/components/presentation/instructions/instructionsGlosary/glosary/glosary.html';
  glosaryHtml = await htmlFetch({ url });

  return glosaryHtml;
};