let instructionDescriptionHtml;

const getInstructionDescriptionHtml = async () => {
  const url = '/components/presentation/instructions/instructionDescription/instructionDescription.html';
  instructionDescriptionHtml = await htmlFetch({ url });

  return instructionDescriptionHtml;
};

const loadInstructionDescriptionHtml = () => {
  instruccionsMainContainer.innerHTML = instructionDescriptionHtml;
};