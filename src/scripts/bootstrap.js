import '../styles/bundle.css';

const bundles = document.querySelector('.games-bundle');
const marksTemplates = {
  average: '$%value% (Average)',
  top: '$%value% (Top 10%)',
};
const gamesInfoTemplate = '(from $%value%)';

/** simulate server request **/
const getValues = () => ({
  current: 13.99,
  min: 0.99,
  max: 49.99,
  marks: {
    average: 7.99,
    top: 12.99,
  },
});

/**
 * @param {Number} value
 * @param {Number} max
 * @return {Number}
 */
const getPercent = ({ value, max }) => ((value * 100) / max);

/**
 *
 * @param {Node} element
 * @param {Number} value
 * @param {Number} max
 * @param {Number} offset -- offset in pixels
 */
const updatePosition = ({ element, value, max, offset }) => {
  const el = element;
  const percent = getPercent({ value, max });
  if (!offset) {
    el.style.left = `${percent}%`;
  } else {
    el.style.left = `calc(${percent}% + ${offset}px)`;
  }
};

/**
 *
 * @param {Node} element
 * @param {Number} value
 * @param {Number} max
 * @param {Number} offset -- offset in pixels
 */
const updateWidth = ({ element, value, max, offset }) => {
  const el = element;
  const percent = getPercent({ value, max });
  if (!offset) {
    el.style.width = `${percent}%`;
  } else {
    el.style.width = `calc(${percent}% + ${offset}px)`;
  }
};

/**
 * updates mark placement and text
 * @param {Node} wrapper
 * @param {Object} state -- getValues() function returns this state
 */
const updateMarks = ({ wrapper, state }) => {
  const marks = wrapper;
  const average = marks[0];
  const top = marks[1];
  updatePosition({ element: marks[0], value: state.marks.average, max: state.max, offset: -11 });
  updatePosition({ element: marks[1], value: state.marks.top, max: state.max, offset: -11 });

  if (state.marks.top - state.marks.average < 4.5) {
    [].forEach.call(marks, (mark) => {
      mark.classList.add('range-marks-item-narrow');
    });
  }

  const averageTooltip = average.querySelector('span');
  const topTooltip = top.querySelector('span');
  averageTooltip.innerText = marksTemplates.average.replace('%value%', state.marks.average.toString());
  topTooltip.innerText = marksTemplates.top.replace('%value%', state.marks.top.toString());
};

const updateValue = ({ element, value }) => {
  const input = element;
  input.value = value;
};

/**
 * updates games representation
 * @param {Number} currentValue
 * @param {Node} element
 * @param {Object} state -- getValues() function returns this state
 */
const updateGames = ({ currentValue, element, state }) => {
  const bd = element[1];
  const d2 = element[2];

  if (currentValue >= state.marks.average) {
    if (!bd.classList.contains('active')) {
      bd.classList.add('active');
    }
  }

  if (currentValue >= state.marks.top) {
    if (!d2.classList.contains('active')) {
      d2.classList.add('active');
    }
  }

  if (currentValue < state.marks.average) {
    bd.classList.remove('active');
  }

  if (currentValue < state.marks.top) {
    d2.classList.remove('active');
  }
};

/**
 * updates position of related to slider elements
 * @param {Node} valueElement -- element which contains input with current value and checkout button
 * @param {Node} fillElement -- fill track element
 * @param {Node} thumbElement -- thumb track element
 * @param {NodeList} gamesList -- collection with games nodes
 * @param {Number} currentValue
 * @param state -- getValues() function returns this state
 */
const updateElements = ({
    valueElement, fillElement, thumbElement, gamesList, currentValue, state,
  }) => {
  if (currentValue < 7.5) {
    updatePosition({ element: valueElement, value: 7.49, max: state.max });
  } else if (currentValue > 43) {
    updatePosition({ element: valueElement, value: 43.99, max: state.max });
  } else {
    updatePosition({ element: valueElement, value: currentValue, max: state.max });
  }
  updatePosition({ element: thumbElement, value: currentValue, max: state.max });
  updateWidth({ element: fillElement, value: currentValue, max: state.max });
  updateGames({ currentValue, element: gamesList, state });
};

/**
 * inits slider
 * @param {Node} wrapper -- dom element which contains required for slider elements
 */
const initSlider = (wrapper) => {
  const state = getValues();
  const range = wrapper.querySelector('[type=range]');
  const input = wrapper.querySelector('[type=text]');
  const valueBox = wrapper.querySelector('.range-value');
  const fill = wrapper.querySelector('.range-input-fill');
  const thumb = wrapper.querySelector('.range-input-thumb');
  const marks = wrapper.querySelectorAll('.range-marks-item');
  const games = wrapper.querySelectorAll('.games-bundle-item');

  const rangeStart = wrapper.querySelector('.range-input-start');
  const rangeEnd = wrapper.querySelector('.range-input-end');

  const gamesAverage = games[1].querySelector('.games-bundle-item-status strong');
  const gamesTop = games[2].querySelector('.games-bundle-item-status strong');

  rangeStart.innerText = `$${state.min}`;
  rangeEnd.innerText = `$${state.max}`;
  gamesAverage.innerText = gamesInfoTemplate.replace('%value%', state.marks.average.toString());
  gamesTop.innerText = gamesInfoTemplate.replace('%value%', state.marks.top.toString());
  range.min = state.min;
  range.max = state.max;
  range.value = state.current;
  input.value = state.current + 10;

  updateMarks({ wrapper: marks, state });
  updateValue({ element: input, value: state.current });
  updatePosition({ element: thumb, value: state.current, max: state.max });
  updatePosition({ element: valueBox, value: state.current, max: state.max });
  updateWidth({ element: fill, value: state.current, max: state.max });
  updateGames({ currentValue: state.current, element: games, state });

  range.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value);
    input.value = value;

    updateElements({
      valueElement: valueBox,
      fillElement: fill,
      thumbElement: thumb,
      gamesList: games,
      currentValue: value,
      state,
    });
  });

  input.addEventListener('input', (e) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) {
      value = 0.99;
    }
    if (value > state.max) {
      range.value = state.max;
    } else {
      range.value = value;
      input.value = value;
    }

    const currentValue = range.value;

    updateElements({
      valueElement: valueBox,
      fillElement: fill,
      thumbElement: thumb,
      gamesList: games,
      currentValue,
      state,
    });
  });
};

initSlider(bundles);
