const invalidWordList = ["fuck", "18"];

export const showLoading = elem => {
  elem.classList.add('spin');
  elem.parentElement.classList.add('spin-bg');
};

export const hideLoading = elem => {
  elem.classList.remove('spin');
  elem.parentElement.classList.remove('spin-bg');
};

// 입력 단어 validation
export const validationInput = inputText => {
  const input = inputText.trim();

  if (!input || input === "") {
    alert("입력을 확인해 주세요");
    return false;
  } else if (invalidWordList.includes(input)) {
    alert("금지된 단어가 들어있습니다.")
    return false;
  }
  return true;
}