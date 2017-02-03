'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _swipeJsIso = require('swipe-js-iso');

var _swipeJsIso2 = _interopRequireDefault(_swipeJsIso);

var _keydown = require('keydown');

var _keydown2 = _interopRequireDefault(_keydown);

var _bowser = require('bowser');

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

        var _this = _possibleConstructorReturn(this, (ReactSwipe.__proto__ || Object.getPrototypeOf(ReactSwipe)).call(this));

        _this.componentWillUnmount = function () {
            _this.unregisterHotkeys();
            _this.swipe.kill();
            _this.swipe = void 0;
        };

        _this.componentWillMount = function () {
            var filteredChildren = _this.filterForImages(_this, _this.prepareImageForLazyLoad);

            _this.applyLazyLoadRange(_this.props.swipeOptions.startSlide, {
                children: filteredChildren.props.children
            });
        };

        _this.componentDidUpdate = function () {
            _this.swipe && _this.swipe.setup();
        };

        _this.componentWillReceiveProps = function (props) {
            var filteredChildren = _this.filterForImages({ props: props }, _this.prepareImageForLazyLoad);

            // //debugger;
            _this.applyLazyLoadRange(_this.getPos(), {
                children: filteredChildren.props.children // todo: this removes the already loaded images and they have to be fetched again. 
            });
        };

        _this.unregisterHotkeys = function () {
            if (!_this.hotkeys instanceof Array) return;

            _this.hotkeys.map(function (ev) {
                ev.removeAllListeners('pressed');
            });
        };

        _this.sliderChanged = function () {
            //update lazy loading
            _this.applyLazyLoadRange(_this.getPos());

            // API to outside world


            _this.props.sliderChanged && _this.props.sliderChanged(_this.getPos(), _this.getNumSlides());
        };

        _this.next = function () {
            _this.swipe && _this.swipe.next();
        };

        _this.prev = function () {
            _this.swipe && _this.swipe.prev();
        };

        _this.slide = function () {
            var _this$swipe;

            _this.swipe && (_this$swipe = _this.swipe).slide.apply(_this$swipe, arguments);
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
            var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state;

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

            var _this$props = _this.props,
                id = _this$props.id,
                className = _this$props.className,
                style = _this$props.style;


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
                src: void 0,
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
            var _props = this.props,
                id = _props.id,
                className = _props.className,
                style = _props.style;


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
                top: '25%',
                border: 'none'
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
