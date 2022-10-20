let instructionDescriptionHtml;

const getInstructionDescriptionHtml = async () => {
  const url = '/components/instructionDescription/instructionDescription.html';
  instructionDescriptionHtml = await htmlFetch({ url });

  return instructionDescriptionHtml;
};

const loadInstructionDescriptionHtml = () => {
  instruccionsMainContainer.innerHTML = instructionDescriptionHtml;
};