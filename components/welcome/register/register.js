let formRegisterUser;
let userRegisterHtml;

const getUserRegisterHtml = async () => {
  const url = '/components/welcome/register/register.html';
  userRegisterHtml = await htmlFetch({ url });

  return userRegisterHtml;
};

const validateUserRegisterForm = (e) => {
  e.preventDefault();
  const formData = formDataToObject(new FormData(e.target));
  console.log('Form has: ', formData);

  const areValidData = true;
  if (!areValidData) return false;

  localStorage.setItem('ovaUser', JSON.stringify(formData));
  // formRegisterUser.reset();
  loadOvaPresentation();

  return false;
};

const loadRegisterUser = () => {
  mainContainer.setAttribute('class','mainContainer');
  mainContainer.innerHTML = userRegisterHtml;
  formRegisterUser = document.querySelector('.userRegistrationForm');
  formRegisterUser?.addEventListener('submit', (e) => { validateUserRegisterForm(e); });
};