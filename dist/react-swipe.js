(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("swipe-js-iso"));
	else if(typeof define === 'function' && define.amd)
		define("ReactSwipe", ["react", "swipe-js-iso"], factory);
	else if(typeof exports === 'object')
		exports["ReactSwipe"] = factory(require("react"), require("swipe-js-iso"));
	else
		root["ReactSwipe"] = factory(root["React"], root["Swipe"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _swipeJsIso = __webpack_require__(2);

	var _swipeJsIso2 = _interopRequireDefault(_swipeJsIso);

	var _keydown = __webpack_require__(3);

	var _keydown2 = _interopRequireDefault(_keydown);

	var _bowser = __webpack_require__(6);

	var _bowser2 = _interopRequireDefault(_bowser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactSwipe = function (_Component) {
	    _inherits(ReactSwipe, _Component);

	    function ReactSwipe() {
	        _classCallCheck(this, ReactSwipe);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactSwipe).call(this));

	        _this.componentWillMount = function () {
	            var filteredChildren = _this.filterForImages(_this.props.children, _this.prepareImageForLazyLoad);

	            _this.applyLazyLoadRange(_this.props.swipeOptions.startSlide, {
	                children: filteredChildren
	            });
	        };

	        _this.componentDidUpdate = function () {
	            _this.swipe.setup();
	        };

	        _this.componentWillReceiveProps = function (props) {
	            var filteredChildren = _this.filterForImages(props.children, _this.prepareImageForLazyLoad);

	            // //debugger;
	            _this.applyLazyLoadRange(_this.getPos(), {
	                children: filteredChildren
	            });
	        };

	        _this.sliderChanged = function () {
	            //update lazy loading
	            _this.applyLazyLoadRange(_this.getPos());

	            // API to outside world

	            _this.props.sliderChanged && _this.props.sliderChanged(_this.getPos(), _this.getNumSlides());
	        };

	        _this.next = function () {
	            _this.swipe.next();
	        };

	        _this.prev = function () {
	            _this.swipe.prev();
	        };

	        _this.slide = function () {
	            var _this$swipe;

	            (_this$swipe = _this.swipe).slide.apply(_this$swipe, arguments);
	        };

	        _this.getPos = function () {
	            if (!_this.swipe) // not initiated yet, (first render)
	                return _this.props.swipeOptions.startSlide;

	            return _this.swipe.getPos();
	        };

	        _this.getNumSlides = function () {
	            if (!_this.swipe) // not initiated yet, (first render)
	                return _this.props.children.length;

	            return _this.swipe.getNumSlides();
	        };

	        _this.applyLazyLoadRange = function (currentIndex) {
	            var state = arguments.length <= 1 || arguments[1] === undefined ? _this.state : arguments[1];

	            var padding = 2;

	            var start = Math.max(currentIndex - padding, 0);
	            var end = Math.min(state.children.length);

	            var clone = state.children.slice();

	            var childsToUpdate = clone.slice(start, Math.min(state.children.length, currentIndex + 1 + padding));

	            childsToUpdate = childsToUpdate.map(function (tree) {
	                return _this.filterForImages(tree, _this.executeImageLazyLoad);
	            });

	            clone.splice.apply(clone, [start, childsToUpdate.length].concat(_toConsumableArray(childsToUpdate)));

	            _this.setState({
	                children: clone
	            });
	        };

	        _this._renderNavigation = function () {
	            if (_bowser2.default.mobile || _bowser2.default.tablet) return null;

	            var _this$props = _this.props;
	            var id = _this$props.id;
	            var className = _this$props.className;
	            var style = _this$props.style;


	            return [_react2.default.createElement(
	                'button',
	                { onClick: _this.prev, style: _extends({ left: 0, opacity: _this.getPos() === 0 ? 0.2 : 1 }, style.navButton.wrap) },
	                _react2.default.createElement(
	                    'svg',
	                    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 27 44', style: style.navButton.svg },
	                    _react2.default.createElement('path', { d: 'M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z', fill: '#007aff' })
	                )
	            ), _react2.default.createElement(
	                'button',
	                { onClick: _this.next, style: _extends({ right: 0, opacity: _this.getPos() === _this.getNumSlides() ? 0.2 : 1 }, style.navButton.wrap) },
	                _react2.default.createElement(
	                    'svg',
	                    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 27 44', style: style.navButton.svg },
	                    _react2.default.createElement('path', { d: 'M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z', fill: '#007aff' })
	                )
	            )];
	        };

	        _this.state = {};
	        return _this;
	    }

	    _createClass(ReactSwipe, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var swipeOptions = this.props.swipeOptions;


	            var mergedOptions = _extends({}, swipeOptions, {
	                callback: this.sliderChanged
	            });

	            this.swipe = (0, _swipeJsIso2.default)(this.refs.container, mergedOptions);

	            this.registerHotkeys();

	            typeof this.props.sliderMounted == 'function' && this.props.sliderMounted(this);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.swipe.kill();
	            this.swipe = void 0;
	        }
	    }, {
	        key: 'registerHotkeys',
	        value: function registerHotkeys() {
	            var _this2 = this;

	            this.hotkeys = [];

	            var kdLeft = (0, _keydown2.default)('<left>');
	            this.hotkeys.push(kdLeft);

	            kdLeft.on('pressed', function () {
	                _this2.prev();
	            });

	            var kdRight = (0, _keydown2.default)('<right>');
	            this.hotkeys.push(kdRight);

	            kdRight.on('pressed', function () {
	                _this2.next();
	            });
	        }
	    }, {
	        key: 'unregisterHotkeys',
	        value: function unregisterHotkeys() {
	            // this.hotkeys.map(ev => {
	            //     ev.removeAllListeners('pressed');
	            // })
	        }
	    }, {
	        key: 'filterForImages',


	        // first param is the whole vdom tree to be searched, second parameter is a function will get found img as parameter and can return a modified img component
	        value: function filterForImages(component, fn) {
	            var filter = function filter(comp) {

	                if (!comp.props || !comp.props.children) return comp;

	                var currentChildren = [];
	                _react2.default.Children.map(comp.props.children, function (child) {

	                    if (child.type !== 'img') {
	                        child = filter(child);
	                        currentChildren.push(child);
	                    } else currentChildren.push(fn(child));
	                });

	                return _react2.default.cloneElement(comp, {}, currentChildren);
	            };

	            return filter(component);
	        }
	    }, {
	        key: 'prepareImageForLazyLoad',
	        value: function prepareImageForLazyLoad(component) {
	            if (component.props.lazyLoaded) return component;

	            var src = component.props.src;
	            return _react2.default.cloneElement(component, {
	                src: 'http://www.ajaxload.info/cache/FF/FF/FF/00/00/00/1-0.gif', // void 0,
	                dataSrc: src
	            });
	        }
	    }, {
	        key: 'executeImageLazyLoad',
	        value: function executeImageLazyLoad(component) {
	            if (!component.props.dataSrc) return component;

	            var src = component.props.dataSrc;
	            return _react2.default.cloneElement(component, {
	                src: src,
	                dataSrc: void 0,
	                lazyLoaded: true
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var id = _props.id;
	            var className = _props.className;
	            var style = _props.style;


	            return _react2.default.createElement(
	                'div',
	                { ref: 'container', id: id, className: 'react-swipe-container ' + className, style: style.container },
	                _react2.default.createElement(
	                    'div',
	                    { style: style.wrapper },
	                    _react2.default.Children.map(this.state.children, function (child) {
	                        return _react2.default.cloneElement(child, { style: style.child });
	                    })
	                ),
	                this._renderNavigation()
	            );
	        }
	    }]);

	    return ReactSwipe;
	}(_react.Component);

	ReactSwipe.propTypes = {
	    swipeOptions: _react.PropTypes.shape({
	        startSlide: _react.PropTypes.number,
	        speed: _react.PropTypes.number,
	        auto: _react.PropTypes.number,
	        continuous: _react.PropTypes.bool,
	        disableScroll: _react.PropTypes.bool,
	        stopPropagation: _react.PropTypes.bool,
	        swiping: _react.PropTypes.func,
	        callback: _react.PropTypes.func,
	        transitionEnd: _react.PropTypes.func
	    }),
	    style: _react.PropTypes.shape({
	        container: _react.PropTypes.object,
	        wrapper: _react.PropTypes.object,
	        child: _react.PropTypes.object
	    }),
	    id: _react.PropTypes.string,
	    className: _react.PropTypes.string
	};
	ReactSwipe.defaultProps = {
	    swipeOptions: {},
	    style: {
	        container: {
	            overflow: 'hidden',
	            visibility: 'hidden',
	            position: 'relative'
	        },

	        wrapper: {
	            overflow: 'hidden',
	            position: 'relative'
	        },

	        child: {
	            float: 'left',
	            width: '100%',
	            position: 'relative',
	            transitionProperty: 'transform'
	        },

	        navButton: {
	            wrap: {
	                width: '10%',
	                height: '50%',
	                background: 'transparent',
	                boxShadow: 'none',
	                outline: 'none',
	                position: 'absolute',
	                top: '25%'
	            },

	            svg: {
	                width: '32px'
	            }

	        }
	    },
	    className: ''
	};
	exports.default = ReactSwipe;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Emitter = __webpack_require__(4).EventEmitter
	var vkey = __webpack_require__(5)

	module.exports = function(keys, el) {
	  if (typeof keys === 'string') keys = [keys]
	  if (!el) el = window

	  var emitter = new Emitter()
	  emitter.pressed = {}
	  
	  el.addEventListener('blur', clearPressed)
	  el.addEventListener('focus', clearPressed)
	  
	  el.addEventListener('keydown', function(ev) {
	    var key = vkey[ev.keyCode]
	    emitter.pressed[key] = true
	    var allPressed = true
	    keys.forEach(function(k) {
	      if (!emitter.pressed[k]) allPressed = false
	    })
	    if (allPressed) {
	      emitter.emit('pressed', emitter.pressed)

	      // this seems to be necessary as keyup doesn't always fire during combos :/
	      clearPressed()
	    }
	  })

	  el.addEventListener('keyup', function(ev) {
	    delete emitter.pressed[vkey[ev.keyCode]]
	  })
	  
	  function clearPressed() {
	    emitter.pressed = {}
	  }
	  
	  return emitter
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var ua = typeof window !== 'undefined' ? window.navigator.userAgent : ''
	  , isOSX = /OS X/.test(ua)
	  , isOpera = /Opera/.test(ua)
	  , maybeFirefox = !/like Gecko/.test(ua) && !isOpera

	var i, output = module.exports = {
	  0:  isOSX ? '<menu>' : '<UNK>'
	, 1:  '<mouse 1>'
	, 2:  '<mouse 2>'
	, 3:  '<break>'
	, 4:  '<mouse 3>'
	, 5:  '<mouse 4>'
	, 6:  '<mouse 5>'
	, 8:  '<backspace>'
	, 9:  '<tab>'
	, 12: '<clear>'
	, 13: '<enter>'
	, 16: '<shift>'
	, 17: '<control>'
	, 18: '<alt>'
	, 19: '<pause>'
	, 20: '<caps-lock>'
	, 21: '<ime-hangul>'
	, 23: '<ime-junja>'
	, 24: '<ime-final>'
	, 25: '<ime-kanji>'
	, 27: '<escape>'
	, 28: '<ime-convert>'
	, 29: '<ime-nonconvert>'
	, 30: '<ime-accept>'
	, 31: '<ime-mode-change>'
	, 27: '<escape>'
	, 32: '<space>'
	, 33: '<page-up>'
	, 34: '<page-down>'
	, 35: '<end>'
	, 36: '<home>'
	, 37: '<left>'
	, 38: '<up>'
	, 39: '<right>'
	, 40: '<down>'
	, 41: '<select>'
	, 42: '<print>'
	, 43: '<execute>'
	, 44: '<snapshot>'
	, 45: '<insert>'
	, 46: '<delete>'
	, 47: '<help>'
	, 91: '<meta>'  // meta-left -- no one handles left and right properly, so we coerce into one.
	, 92: '<meta>'  // meta-right
	, 93: isOSX ? '<meta>' : '<menu>'      // chrome,opera,safari all report this for meta-right (osx mbp).
	, 95: '<sleep>'
	, 106: '<num-*>'
	, 107: '<num-+>'
	, 108: '<num-enter>'
	, 109: '<num-->'
	, 110: '<num-.>'
	, 111: '<num-/>'
	, 144: '<num-lock>'
	, 145: '<scroll-lock>'
	, 160: '<shift-left>'
	, 161: '<shift-right>'
	, 162: '<control-left>'
	, 163: '<control-right>'
	, 164: '<alt-left>'
	, 165: '<alt-right>'
	, 166: '<browser-back>'
	, 167: '<browser-forward>'
	, 168: '<browser-refresh>'
	, 169: '<browser-stop>'
	, 170: '<browser-search>'
	, 171: '<browser-favorites>'
	, 172: '<browser-home>'

	  // ff/osx reports '<volume-mute>' for '-'
	, 173: isOSX && maybeFirefox ? '-' : '<volume-mute>'
	, 174: '<volume-down>'
	, 175: '<volume-up>'
	, 176: '<next-track>'
	, 177: '<prev-track>'
	, 178: '<stop>'
	, 179: '<play-pause>'
	, 180: '<launch-mail>'
	, 181: '<launch-media-select>'
	, 182: '<launch-app 1>'
	, 183: '<launch-app 2>'
	, 186: ';'
	, 187: '='
	, 188: ','
	, 189: '-'
	, 190: '.'
	, 191: '/'
	, 192: '`'
	, 219: '['
	, 220: '\\'
	, 221: ']'
	, 222: "'"
	, 223: '<meta>'
	, 224: '<meta>'       // firefox reports meta here.
	, 226: '<alt-gr>'
	, 229: '<ime-process>'
	, 231: isOpera ? '`' : '<unicode>'
	, 246: '<attention>'
	, 247: '<crsel>'
	, 248: '<exsel>'
	, 249: '<erase-eof>'
	, 250: '<play>'
	, 251: '<zoom>'
	, 252: '<no-name>'
	, 253: '<pa-1>'
	, 254: '<clear>'
	}

	for(i = 58; i < 65; ++i) {
	  output[i] = String.fromCharCode(i)
	}

	// 0-9
	for(i = 48; i < 58; ++i) {
	  output[i] = (i - 48)+''
	}

	// A-Z
	for(i = 65; i < 91; ++i) {
	  output[i] = String.fromCharCode(i)
	}

	// num0-9
	for(i = 96; i < 106; ++i) {
	  output[i] = '<num-'+(i - 96)+'>'
	}

	// F1-F24
	for(i = 112; i < 136; ++i) {
	  output[i] = 'F'+(i-111)
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  * Bowser - a browser detector
	  * https://github.com/ded/bowser
	  * MIT License | (c) Dustin Diaz 2015
	  */

	!function (name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition()
	  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else this[name] = definition()
	}('bowser', function () {
	  /**
	    * See useragents.js for examples of navigator.userAgent
	    */

	  var t = true

	  function detect(ua) {

	    function getFirstMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[1]) || '';
	    }

	    function getSecondMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[2]) || '';
	    }

	    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
	      , likeAndroid = /like android/i.test(ua)
	      , android = !likeAndroid && /android/i.test(ua)
	      , chromeBook = /CrOS/.test(ua)
	      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
	      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
	      , tablet = /tablet/i.test(ua)
	      , mobile = !tablet && /[^-]mobi/i.test(ua)
	      , result

	    if (/opera|opr/i.test(ua)) {
	      result = {
	        name: 'Opera'
	      , opera: t
	      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/yabrowser/i.test(ua)) {
	      result = {
	        name: 'Yandex Browser'
	      , yandexbrowser: t
	      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/windows phone/i.test(ua)) {
	      result = {
	        name: 'Windows Phone'
	      , windowsphone: t
	      }
	      if (edgeVersion) {
	        result.msedge = t
	        result.version = edgeVersion
	      }
	      else {
	        result.msie = t
	        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/msie|trident/i.test(ua)) {
	      result = {
	        name: 'Internet Explorer'
	      , msie: t
	      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
	      }
	    } else if (chromeBook) {
	      result = {
	        name: 'Chrome'
	      , chromeBook: t
	      , chrome: t
	      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      }
	    } else if (/chrome.+? edge/i.test(ua)) {
	      result = {
	        name: 'Microsoft Edge'
	      , msedge: t
	      , version: edgeVersion
	      }
	    }
	    else if (/chrome|crios|crmo/i.test(ua)) {
	      result = {
	        name: 'Chrome'
	      , chrome: t
	      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (iosdevice) {
	      result = {
	        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
	      }
	      // WTF: version is not part of user agent in web apps
	      if (versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    }
	    else if (/sailfish/i.test(ua)) {
	      result = {
	        name: 'Sailfish'
	      , sailfish: t
	      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/seamonkey\//i.test(ua)) {
	      result = {
	        name: 'SeaMonkey'
	      , seamonkey: t
	      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/firefox|iceweasel/i.test(ua)) {
	      result = {
	        name: 'Firefox'
	      , firefox: t
	      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
	      }
	      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
	        result.firefoxos = t
	      }
	    }
	    else if (/silk/i.test(ua)) {
	      result =  {
	        name: 'Amazon Silk'
	      , silk: t
	      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (android) {
	      result = {
	        name: 'Android'
	      , version: versionIdentifier
	      }
	    }
	    else if (/phantom/i.test(ua)) {
	      result = {
	        name: 'PhantomJS'
	      , phantom: t
	      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
	      result = {
	        name: 'BlackBerry'
	      , blackberry: t
	      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
	      }
	    }
	    else if (/(web|hpw)os/i.test(ua)) {
	      result = {
	        name: 'WebOS'
	      , webos: t
	      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
	      };
	      /touchpad\//i.test(ua) && (result.touchpad = t)
	    }
	    else if (/bada/i.test(ua)) {
	      result = {
	        name: 'Bada'
	      , bada: t
	      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/tizen/i.test(ua)) {
	      result = {
	        name: 'Tizen'
	      , tizen: t
	      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/safari/i.test(ua)) {
	      result = {
	        name: 'Safari'
	      , safari: t
	      , version: versionIdentifier
	      }
	    }
	    else {
	      result = {
	        name: getFirstMatch(/^(.*)\/(.*) /),
	        version: getSecondMatch(/^(.*)\/(.*) /)
	     };
	   }

	    // set webkit or gecko flag for browsers based on these engines
	    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
	      result.name = result.name || "Webkit"
	      result.webkit = t
	      if (!result.version && versionIdentifier) {
	        result.version = versionIdentifier
	      }
	    } else if (!result.opera && /gecko\//i.test(ua)) {
	      result.name = result.name || "Gecko"
	      result.gecko = t
	      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
	    }

	    // set OS flags for platforms that have multiple browsers
	    if (!result.msedge && (android || result.silk)) {
	      result.android = t
	    } else if (iosdevice) {
	      result[iosdevice] = t
	      result.ios = t
	    }

	    // OS version extraction
	    var osVersion = '';
	    if (result.windowsphone) {
	      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
	    } else if (iosdevice) {
	      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
	      osVersion = osVersion.replace(/[_\s]/g, '.');
	    } else if (android) {
	      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
	    } else if (result.webos) {
	      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
	    } else if (result.blackberry) {
	      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
	    } else if (result.bada) {
	      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
	    } else if (result.tizen) {
	      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
	    }
	    if (osVersion) {
	      result.osversion = osVersion;
	    }

	    // device type extraction
	    var osMajorVersion = osVersion.split('.')[0];
	    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
	      result.tablet = t
	    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
	      result.mobile = t
	    }

	    // Graded Browser Support
	    // http://developer.yahoo.com/yui/articles/gbs
	    if (result.msedge ||
	        (result.msie && result.version >= 10) ||
	        (result.yandexbrowser && result.version >= 15) ||
	        (result.chrome && result.version >= 20) ||
	        (result.firefox && result.version >= 20.0) ||
	        (result.safari && result.version >= 6) ||
	        (result.opera && result.version >= 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
	        (result.blackberry && result.version >= 10.1)
	        ) {
	      result.a = t;
	    }
	    else if ((result.msie && result.version < 10) ||
	        (result.chrome && result.version < 20) ||
	        (result.firefox && result.version < 20.0) ||
	        (result.safari && result.version < 6) ||
	        (result.opera && result.version < 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
	        ) {
	      result.c = t
	    } else result.x = t

	    return result
	  }

	  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

	  bowser.test = function (browserList) {
	    for (var i = 0; i < browserList.length; ++i) {
	      var browserItem = browserList[i];
	      if (typeof browserItem=== 'string') {
	        if (browserItem in bowser) {
	          return true;
	        }
	      }
	    }
	    return false;
	  }

	  /*
	   * Set our detect method to the main bowser object so we can
	   * reuse it to test other user agents.
	   * This is needed to implement future tests.
	   */
	  bowser._detect = detect;

	  return bowser
	});


/***/ }
/******/ ])
});
;