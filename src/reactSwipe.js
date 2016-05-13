import React, { Component, PropTypes } from 'react';
import Swipe from 'swipe-js-iso';

import keydown from 'keydown';
import browser from 'bowser';

class ReactSwipe extends Component {
    static propTypes = {
        swipeOptions: PropTypes.shape({
            startSlide: PropTypes.number,
            speed: PropTypes.number,
            auto: PropTypes.number,
            continuous: PropTypes.bool,
            disableScroll: PropTypes.bool,
            stopPropagation: PropTypes.bool,
            swiping: PropTypes.func,
            callback: PropTypes.func,
            transitionEnd: PropTypes.func
        }),
        style: PropTypes.shape({
            container: PropTypes.object,
            wrapper: PropTypes.object,
            child: PropTypes.object
        }),
        id: PropTypes.string,
        className: PropTypes.string
    };

    static defaultProps = {
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
                    top:   '25%',
                    border: 'none'
                },

                svg: {
                    width: '32px'
                }

            }
        },
        className: ''
    };

    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        const { swipeOptions } = this.props;

        const mergedOptions = Object.assign({}, swipeOptions, {
            callback: this.sliderChanged
        });

        this.swipe = Swipe(this.refs.container, mergedOptions);


        this.registerHotkeys();

        typeof this.props.sliderMounted == 'function' && this.props.sliderMounted(this);
    }

    componentWillUnmount() {
        this.swipe.kill();
        this.swipe = void 0;
    }

    componentWillMount = () => {
        let filteredChildren = this.filterForImages(this, this.prepareImageForLazyLoad);

        this.applyLazyLoadRange(this.props.swipeOptions.startSlide, {
            children: filteredChildren.props.children
        });

    }

    componentDidUpdate = () => {
        this.swipe.setup();

    };
    componentWillReceiveProps = (props) => {
        let filteredChildren = this.filterForImages(props.children, this.prepareImageForLazyLoad);

        // //debugger;
        this.applyLazyLoadRange(this.getPos(), {
            children: filteredChildren
        });

    }

    registerHotkeys() {
        this.hotkeys = [];




        const kdLeft = keydown('<left>');
        this.hotkeys.push(kdLeft);

        kdLeft.on('pressed', () => {
            this.prev();
        });


        const kdRight = keydown('<right>');
        this.hotkeys.push(kdRight);

        kdRight.on('pressed', () => {
            this.next();
        });


    }

    unregisterHotkeys() {
        // this.hotkeys.map(ev => {
        //     ev.removeAllListeners('pressed');
        // })
    }

    sliderChanged = () => {
        //update lazy loading
        this.applyLazyLoadRange(this.getPos());

        // API to outside world



        this.props.sliderChanged && this.props.sliderChanged(this.getPos(), this.getNumSlides());
    }

    next = () => {
        this.swipe.next();
    }

    prev = () => {
        this.swipe.prev();
    }

    slide = (...args) => {
        this.swipe.slide(...args);
    }

    getPos = () => {
        if (!this.swipe) // not initiated yet, (first render)
            return this.props.swipeOptions.startSlide;

        return this.swipe.getPos();
    }

    getNumSlides = () => {
        if (!this.swipe) // not initiated yet, (first render)
            return this.props.children.length;

        return this.swipe.getNumSlides();
    }


    // first param is the whole vdom tree to be searched, second parameter is a function will get found img as parameter and can return a modified img component
    filterForImages(component, fn) {
        const filter = (comp) => {


            if (!comp.props || !comp.props.children)
                return comp;



            let currentChildren = [];
            React.Children.map(comp.props.children, child => {

                if (child.type !== 'img') {
                    child = filter(child);
                    currentChildren.push(child);
                }

                else
                    currentChildren.push(fn(child));

            });



            return React.cloneElement(comp, {}, currentChildren);
        };

        return filter(component);
    }


    applyLazyLoadRange = (currentIndex, state = this.state) => {
        const padding = 2;

        const start = Math.max(currentIndex - padding, 0);
        const end = Math.min(state.children.length);


        let clone = state.children.slice();

        let childsToUpdate = clone.slice(start, Math.min(state.children.length, currentIndex + 1 + padding));

        childsToUpdate = childsToUpdate.map(tree => this.filterForImages(tree, this.executeImageLazyLoad));




        clone.splice(start, childsToUpdate.length, ...childsToUpdate);

        this.setState({
            children: clone
        });
    }
    prepareImageForLazyLoad(component) {
        if (component.props.lazyLoaded)
            return component;

        let src = component.props.src;
        return React.cloneElement(component,
            {
                src: void 0,
                dataSrc: src
            });
    }
    executeImageLazyLoad(component) {
        if (!component.props.dataSrc)
            return component;


        let src = component.props.dataSrc;
        return React.cloneElement(component,
            {
                src,
                dataSrc: void 0,
                lazyLoaded: true
            });
    }


    _renderNavigation = () => {
        if (browser.mobile || browser.tablet)
            return null;

        const { id, className, style } = this.props;

        return [
            <button onClick={this.prev} style={Object.assign({left: 0, opacity: this.getPos() === 0 ? 0.2 : 1}, style.navButton.wrap)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44" style={style.navButton.svg}><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z" fill="#007aff"/></svg>
            </button>,
            <button onClick={this.next} style={Object.assign({right: 0, opacity: this.getPos() === this.getNumSlides() ? 0.2 : 1}, style.navButton.wrap)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 44" style={style.navButton.svg}><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z" fill="#007aff"/></svg>
            </button>
        ];
    }

    render() {
        const { id, className, style } = this.props;



        return (
            <div ref="container" id={id} className={`react-swipe-container ${className}`} style={style.container}>
                <div style={style.wrapper}>
                    {React.Children.map(this.state.children, child => {
                        return React.cloneElement(child, {style: style.child});
                    })}
                </div>

            {this._renderNavigation()}

            </div>
        );
    }
}

export default ReactSwipe;
