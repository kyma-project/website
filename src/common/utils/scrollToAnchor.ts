// courtesy of @jlengstorf, found at
// https://github.com/jlengstorf/marisamorby.com/blob/f16e4165ba67ae096d907e1cfa477664a2f7e81f/src/utils/scroll-to-anchor.js

/**
 * Browser workaround to avoid a bug where scrollTop doesn’t work.
 * @return {Element}  the scrollable root element
 */
const getScrollableElement = () =>
  document.body.scrollTop ? document.body : document.documentElement;

/**
 * Easing, using sinusoidal math (or some shit).
 *
 * I know; this makes my head hurt, too. Math is hard. This formula was copied
 * (I reformatted for legibility) from here: <http://gizma.com/easing/#sin3>
 *
 * @param  {Number} elapsed how much time has elapsed already
 * @param  {Number} start   the starting position
 * @param  {Number} change  the desired step size
 * @param  {Number} length  the duration length
 * @return {Number}         the new position based on the easing formula
 */
const easeInOutSine = (
  elapsed: number,
  start: number,
  change: number,
  length: number,
) => (-change / 2) * (Math.cos((Math.PI * elapsed) / length) - 1) + start;

const cumulativeOffset = (element: any) => {
  let top = 0;
  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);

  return top;
};

// Sets up a loop that executes for the length of time set in duration
const animateScroll = (
  element: any,
  elapsedTime: number,
  { position, stepSize, increment, duration, callback }: any,
) => {
  const nextTime = elapsedTime + increment;

  // Set the new element position using an easing formula.
  // eslint-disable-next-line no-param-reassign
  element.scrollTop = easeInOutSine(nextTime, position, stepSize, duration);

  if (!(nextTime < duration)) {
    callback && callback();
    return;
  }

  setTimeout(() => {
    animateScroll(element, nextTime, {
      position,
      stepSize,
      increment,
      duration,
      callback,
    });
  }, increment);
};

const scrollToLocation = (targetPos: number, callback?: () => void) => {
  window.scrollTo(0, targetPos);
  callback && callback();
};

const scrollToLocationSmooth = async (
  element: any,
  targetPos: number,
  duration: number,
  callback?: () => void,
) =>
  new Promise(resolve => {
    animateScroll(element, 0, {
      position: element.scrollTop,
      stepSize: targetPos - element.scrollTop,
      increment: 20,
      callback: () => {
        callback && callback();
        resolve();
      },
      duration,
    });
  });

interface ScrollToAnchorProps {
  target: any;
  timeout?: number;
  callback?: () => void;
  smooth?: boolean;
}

export const scrollToAnchor = ({
  target,
  callback = () => null,
  smooth = true,
  timeout = 750,
}: ScrollToAnchorProps) => (event?: any) => {
  if (event) {
    event.preventDefault();
  }
  const rootElement = getScrollableElement();
  const targetOffset = cumulativeOffset(target);

  smooth
    ? scrollToLocationSmooth(rootElement, targetOffset, timeout, callback)
    : scrollToLocation(targetOffset, callback);
};
