/**
 * Get DOM element by selector
 *
 * @param  {String} selector
 * @return {DOMNode}
 */
const qs = (selector, context = document) =>
  context.querySelector(selector);

/**
 * Get all DOM elements by given selector as array
 *
 * @param  {String} selector
 * @return {Array}
 */
const qsa = (selector, context = document) =>
  Array.prototype.slice.call(
    context.querySelectorAll(selector)
  );

/**
 * Chek if object is a DOM element
 * @param  {Object}
 * @return {Boolean}
 */
const isDomElement = (object) => object instanceof HTMLElement;

/**
 * Creates an object composed of the picked object properties.
 *
 * @param  {Object} object source object
 * @param  {Array}  props  array of properties that should be picked
 * @return {Object}
 */
const pick = (object, props) => {
  return props.reduce((result, prop) => {
    const value = object[prop];
    if (typeof value !== 'undefined') {
      result[prop] = value;
    }
    return result;
  }, {});
};

/**
 * Check if object is empty
 *
 * @param  {Object} obj
 * @return {Boolean}
 */
const isEmptyObject = (object) =>
  Object.keys(object).length === 0 && object.constructor === Object;

/**
 * Attach a handler to an event for all elements matching a selector.
 *
 * @param  {Element} target    - Element which the event must bubble to
 * @param  {string} selector   - Selector to match
 * @param  {string} type       - Event name
 * @param  {Function} handler  - Function called when the event bubbles to target
 *                               from an element matching selector
 * @param  {boolean} [capture] - Capture the event
 * @return {Function}          - Function for removing listener
 */
const delegate = (target, type, selector, handler, capture) => {
  const dispatchEvent = (event) => {
    // console.time('delegate');
    let targetElement = event.target;

    while (targetElement && targetElement !== target ) {
      if (targetElement.matches(selector)) {
        event.delegateTarget = event.delegateTarget || targetElement;
        handler.call(targetElement, event);
        break;
      }
      targetElement = targetElement.parentNode;
    }
    // console.timeEnd('delegate');
  };

  target.addEventListener(type, dispatchEvent, !!capture);

  return () => target.removeEventListener(type, dispatchEvent, !!capture);
};

/**
 * Empty function
 */
const noop = () => {};

/**
 * Generate unique ID
 *
 * @param  {String} prefix - Prefix for ID
 * @param  {Number} len    - Lenght of ID string
 * @return {String}        - ID
 */
const generateID = (prefix = '', len = 6) =>
  prefix + Math.random().toString(36).slice(2, len + 2);

/**
 * Iteration over key-value pairs in target object
 *
 * @param  {Object|Array} target - Target object.
 * @param  {Function} fn         - Iterator
 * @return {Void}
 */
const each = (target, fn) => {
  if (Array.isArray(target)) {
    target.forEach(fn);
  } else {
    Object.keys(target).forEach((key, i, arr) => {
      fn(key, target[key], i, arr);
    });
  }
};

/**
 * Get list of keys of target object
 *
 * @param  {Object} target
 * @return {Array}
 */
const keys = (target) => {
  return Object.keys(target);
};

/**
 * Get list of values of target object
 *
 * @param  {Object} target
 * @return {Array}
 */
const values = (target) => {
  return Object.keys(target).map(key => target[key]);
};

/**
 * Sort collection of objects by given property name
 *
 * @param  {Array|Object} collection - Collection with objects
 * @param  {string} propName         - Property name by which collection should be sorted
 * @param  {boolean} invert          - Invert sorting direction.
 * @return {Array}                   - Sorted collection.
 */
const sortBy = (collection = [], propName, invert) => {
  console.time('sort');
  const copy = Array.isArray(collection)
    ? collection.slice()
    : Object.keys(collection).map(k => collection[k]);

  const sorted = copy.sort((a, b) => {
    if (!(propName in a) || !(propName in b)) return -1;
    if (a[propName] === b[propName]) return 0;
    return a[propName] > b[propName] ? 1 : -1;
  });

  // strict equal with 'true' here is required
  // because Handlebars helper always will be invoked
  // with 'options' as last parameter, and when 'invert'
  // is omited then 'invert' === 'options'
  if (invert === true) sorted.reverse();
  console.timeEnd('sort');
  return sorted;
};

/**
 * Default error handler for async network actions
 *
 * @param  {Error} err
 * @return {Void}
 */
const defaultErrorHandler = err => {
  console.log(err);
  alert('Oops!:)\n' + err.message || 'Seems like something is broken. Please, try again.');
};
