"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var dragMaker = function dragMaker(providedPosition, providedCB, dragStartCB, dragDuringCB) {
  ///////// INITIALIZE DRAG FUNCTIONS
  var dragBuild = providedPosition === 'fixed' ? function (event) {
    event.stopPropagation();
    var moveY = event.clientY - this.state.diffY;
    var moveX = event.clientX - this.state.diffX;

    if (event.clientX || event.clientY) {
      event.target.style.top = moveY + 'px';
      event.target.style.left = moveX + 'px';
    }
  } : function (event) {
    event.stopPropagation();
    var moveX = event.clientX - this.state.diffX;
    var moveY = event.clientY - this.state.diffY;
    var parentWidth = this.cachedPerimeters.parentWidth;
    var parentHeight = this.cachedPerimeters.parentHeight;
    var left = moveX < this.cachedPerimeters.leftFence ? this.cachedPerimeters.leftFence : Math.min(moveX, parentWidth - this.cachedPerimeters.rightFence);
    var top = moveY < this.cachedPerimeters.topFence ? this.cachedPerimeters.topFence : Math.min(moveY, parentHeight - this.cachedPerimeters.bottomFence);

    if (event.clientX || event.clientY) {
      event.target.style.top = top + 'px';
      event.target.style.left = left + 'px';
    }
  };
  var dragFunction = dragDuringCB ? function (event) {
    dragBuild.bind(this)(event);
    dragDuringCB(event);
  } : dragBuild;
  var dragStartBuild = providedPosition === 'fixed' ? function (event) {
    if (!this.state.hasBeenDragged) {
      event.target.style.position = 'fixed';
      this.cachedPerimeters.parentWidth = 0;
      this.cachedPerimeters.parentHeight = 0;
      this.setState({
        hasBeenDragged: true
      });
    }

    this.setState({
      diffX: event.clientX - event.target.offsetLeft,
      diffY: event.clientY - event.target.offsetTop
    });
  } : function (event) {
    if (!this.state.hasBeenDragged) {
      event.target.style.position = 'absolute';
      this.setState({
        hasBeenDragged: true
      });
    }

    if (this.cachedPerimeters.parentWidth !== event.target.parentElement.clientWidth || this.cachedPerimeters.parentHeight !== event.target.parentElement.clientHeight) {
      this.cachedPerimeters.parentWidth = event.target.parentElement.clientWidth;
      this.cachedPerimeters.parentHeight = event.target.parentElement.clientHeight || window.innerHeight;
    }

    this.setState({
      diffX: event.clientX - event.target.offsetLeft,
      diffY: event.clientY - event.target.offsetTop
    });
  };
  var dragStartFunction = dragStartCB ? function (event) {
    dragStartBuild.bind(this)(event);
    dragStartCB(event);
    return false;
  } : dragStartBuild; ////////// COMPONENT LOGIC BEGINS HERE

  return function (WrappedComponent) {
    return (
      /*#__PURE__*/
      function (_React$Component) {
        _inherits(ModDrag, _React$Component);

        function ModDrag(props) {
          var _this;

          _classCallCheck(this, ModDrag);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(ModDrag).call(this, props));
          _this.state = {
            top: null,
            left: null,
            diffX: null,
            diffY: null,
            hasBeenDragged: false
          };
          _this.dragFunction = dragFunction.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.dragStartFunction = dragStartFunction.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          return _this;
        }

        _createClass(ModDrag, [{
          key: "componentDidMount",
          value: function componentDidMount() {
            var draggableNode = _reactDom.default.findDOMNode(this.myRef);

            this.cachedPerimeters = {
              leftFence: 0,
              rightFence: draggableNode.getBoundingClientRect().width,
              topFence: 0,
              bottomFence: draggableNode.getBoundingClientRect().height
            };
            draggableNode.setAttribute('draggable', true);
            draggableNode.addEventListener('drag', this.dragFunction);
            draggableNode.addEventListener('dragstart', this.dragStartFunction);
            if (providedCB) draggableNode.addEventListener('dragend', providedCB);
          }
        }, {
          key: "render",
          value: function render() {
            var _this2 = this;

            return _react.default.createElement(WrappedComponent, {
              ref: function ref(myRef) {
                _this2.myRef = myRef;
              }
            });
          }
        }]);

        return ModDrag;
      }(_react.default.Component)
    );
  };
};

module.exports = dragMaker;