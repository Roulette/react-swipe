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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _swipeJsIso = __webpack_require__(2);

	var _swipeJsIso2 = _interopRequireDefault(_swipeJsIso);

	var _keydown = __webpack_require__(3);

	var _keydown2 = _interopRequireDefault(_keydown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactSwipe = function (_Component) {
	    _inherits(ReactSwipe, _Component);

	    function ReactSwipe() {
	        var _Object$getPrototypeO;

	        var _temp, _this, _ret;

	        _classCallCheck(this, ReactSwipe);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactSwipe)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.registerHotkeys = function () {
	            _this.hotkeys = [];

	            var kdLeft = (0, _keydown2.default)('<left>');
	            _this.hotkeys.push(kdLeft);

	            kdLeft.on('pressed', function () {
	                _this.prev();
	            });
	        }, _this.unregisterHotkeys = function () {
	            // this.hotkeys.map(ev => {
	            //     ev.removeAllListeners('pressed');
	            // })
	        }, _temp), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(ReactSwipe, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var swipeOptions = this.props.swipeOptions;

	            this.swipe = (0, _swipeJsIso2.default)(this.refs.container, swipeOptions);

	            this.registerHotkeys();
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.swipe.kill();
	            this.swipe = void 0;
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            this.swipe.next();
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            this.swipe.prev();
	        }
	    }, {
	        key: 'slide',
	        value: function slide() {
	            var _swipe;

	            (_swipe = this.swipe).slide.apply(_swipe, arguments);
	        }
	    }, {
	        key: 'getPos',
	        value: function getPos() {
	            return this.swipe.getPos();
	        }
	    }, {
	        key: 'getNumSlides',
	        value: function getNumSlides() {
	            return this.swipe.getNumSlides();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var id = _props.id;
	            var className = _props.className;
	            var style = _props.style;
	            var children = _props.children;

	            return _react2.default.createElement(
	                'div',
	                { ref: 'container', id: id, className: 'react-swipe-container ' + className, style: style.container },
	                _react2.default.createElement(
	                    'div',
	                    { style: style.wrapper },
	                    _react2.default.Children.map(children, function (child) {
	                        return _react2.default.cloneElement(child, { style: style.child });
	                    })
	                )
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


/***/ }
/******/ ])
});
;