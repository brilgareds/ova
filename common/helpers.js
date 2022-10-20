
const formDataToObject = function (formData) {
  const obj = {};

  for (const key of formData.keys()) {
    obj[key] = formData.get(key);
  }

  return obj;
};

const getFullAlphabet = () => config.general?.alphabet;

const getALetterOfAlphabet = (i) => {
  const alphabet = getFullAlphabet();

  return alphabet[i];
};

const validateCustomSymbolText = (data) => {
  const { text, customSymbol, startCustomStyle, endCustomStyle } = data;
  if (!text || !customSymbol) return text;

  const startOfFirtCustomStyle = text.indexOf(customSymbol);
  const endOfFirtCustomStyle = startOfFirtCustomStyle + customSymbol.length;
  const startOfSecondCustomStyle = text.indexOf(customSymbol, startOfFirtCustomStyle + 1);
  const endOfSecondCustomStyle = startOfSecondCustomStyle + customSymbol.length;

  if (startOfFirtCustomStyle === -1 || startOfSecondCustomStyle === -1) return text;

  const firtPart = text.substring(0, startOfFirtCustomStyle);
  const secondPart = `${startCustomStyle}${text.substring(endOfFirtCustomStyle, startOfSecondCustomStyle)}${endCustomStyle}`;
  const thirdPart = text.substring(endOfSecondCustomStyle);

  const newData = {
    text: `${firtPart}${secondPart}${thirdPart}`,
    customSymbol,
    startCustomStyle,
    endCustomStyle
  };

  const newText = validateCustomSymbolText(newData);

  return newText;
};

const formatStrongFont = (text) => {
  const data = {
    text,
    customSymbol: '***',
    startCustomStyle: '<span class="strong-font">',
    endCustomStyle: '</span>'
  };

  const newText = validateCustomSymbolText(data);

  return newText;
};

const formatText = (text) => {
  if (!text) return text;

  const newText = formatStrongFont(text);
  return newText
};

const formatToStrongText = (text) => formatText(`***${text}***`);

const initializePolyfill = () => {
  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  }

  NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
      for(var i = this.length - 1; i >= 0; i--) {
          if(this[i] && this[i].parentElement) {
              this[i].parentElement.removeChild(this[i]);
          }
      }
  }
};

initializePolyfill();