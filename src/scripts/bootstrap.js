import '../styles/bundle.css';

const range = document.querySelector('#promo-range');
const inputValue = document.querySelector('#promo-value');
const fill = document.querySelector('.range-input-fill');
const valueWrapper = document.querySelector('.range-value');
const gameItems = document.querySelectorAll('.games-bundle-item');

const minValue = 0.99; //eslint-disable-line
const maxValue = 49.99;
const averageValue = 7.67;
const topValue = 18.31;
const rangeWidth = range.offsetWidth;

range.addEventListener('input', (e) => {
  const value = parseFloat(e.target.value);
  const percent = (value * 100) / maxValue;
  inputValue.value = value;
  fill.style.width = `${(rangeWidth * (percent / 100)) - 15}px`;
  valueWrapper.style.left = `${(rangeWidth * (percent / 100)) - 15}px`;

  if (value > averageValue) {
    gameItems[1].classList.add('active');
  }

  if (value > topValue) {
    gameItems[2].classList.add('active');
  }

  if (value < averageValue) {
    gameItems[1].classList.remove('active');
  }

  if (value < topValue) {
    gameItems[2].classList.remove('active');
  }
});
