export const showLoading = elem => {
  elem.classList.add('spin');
  elem.parentElement.classList.add('spin-bg');
};

export const hideLoading = elem => {
  elem.classList.remove('spin');
  elem.parentElement.classList.remove('spin-bg');
};