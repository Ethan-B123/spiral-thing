/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RingGroup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RingGroup */ "./src/RingGroup.ts");
/* harmony import */ var _helperFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helperFunctions */ "./src/helperFunctions.ts");


var Game = /** @class */ (function () {
    function Game(canvas, displayRadius, rotFactor, rotSpeed, ringCount, currentAng, onTick) {
        var _this = this;
        this.canvas = canvas;
        this.onTick = onTick;
        this.looping = false;
        this.forward = true;
        this.dims = { x: -1, y: -1 };
        this.resizeLoop = function () {
            _this.resizeFrame = requestAnimationFrame(_this.resizeLoop);
            _this.draw();
            _this.resize();
        };
        this.loop = this.loop.bind(this);
        this.ringGroup = new _RingGroup__WEBPACK_IMPORTED_MODULE_0__["default"](displayRadius, rotFactor, rotSpeed, ringCount, currentAng);
        this.resizeLoop();
        this.play();
    }
    Object.defineProperty(Game.prototype, "rotationCount", {
        get: function () {
            return this.ringGroup.currentAng / Math.PI / 2;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.resize = function () {
        var dims = Object(_helperFunctions__WEBPACK_IMPORTED_MODULE_1__["dimensions"])(this.canvas);
        var dpr = window.devicePixelRatio || 1;
        dims.x *= dpr;
        dims.y *= dpr;
        if (dims.x === this.dims.x && dims.y === this.dims.y)
            return;
        this.canvas.width = dims.x;
        this.canvas.height = dims.y;
        this.dims = dims;
        this.ringGroup.updateRingSize(dims);
        this.ringGroup.updateRings();
    };
    Game.prototype.setSpeed = function (radiansPerFrame) {
        this.ringGroup.setRotSpeed(radiansPerFrame);
    };
    Game.prototype.setAngle = function (angle) {
        this.ringGroup.setAngle(angle);
        this.onTick(this.rotationCount);
    };
    Game.prototype.reverse = function () {
        this.forward = false;
        if (this.looping)
            return;
        this.looping = true;
        this.frame = requestAnimationFrame(this.loop);
    };
    Game.prototype.play = function () {
        this.forward = true;
        if (this.looping)
            return;
        this.looping = true;
        this.frame = requestAnimationFrame(this.loop);
    };
    Game.prototype.pause = function () {
        if (this.looping) {
            this.looping = false;
            cancelAnimationFrame(this.frame);
        }
        else {
            this.looping = true;
            this.frame = requestAnimationFrame(this.loop);
        }
    };
    Game.prototype.tick = function () {
        if (this.forward) {
            this.ringGroup.tick();
        }
        else {
            this.ringGroup.untick();
        }
        this.onTick(this.rotationCount);
    };
    Game.prototype.draw = function () {
        this.ringGroup.draw(this.canvas);
    };
    Game.prototype.loop = function () {
        this.frame = requestAnimationFrame(this.loop);
        this.tick();
    };
    return Game;
}());
/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./src/Ring.ts":
/*!*********************!*\
  !*** ./src/Ring.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Ring = /** @class */ (function () {
    function Ring(radius, rotationFactor, center) {
        this.radius = radius;
        this.rotationFactor = rotationFactor;
        this.center = center;
        this.currentAng = 0;
        this.pointPos = { x: 0, y: 0 };
        this.update(this.currentAng);
    }
    Ring.prototype.update = function (newAng) {
        this.currentAng = newAng;
        var rotatedAng = newAng * this.rotationFactor;
        var x = Math.cos(rotatedAng) * this.radius + this.center.x;
        var y = Math.sin(rotatedAng) * this.radius + this.center.y;
        this.pointPos = { x: x, y: y };
        return { x: x, y: y };
    };
    Ring.prototype.draw = function (ctx) {
        ctx.save();
        ctx.strokeStyle = "#f0f0f0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = "#000f";
        ctx.beginPath();
        ctx.arc(this.pointPos.x, this.pointPos.y, 1, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    };
    return Ring;
}());
/* harmony default export */ __webpack_exports__["default"] = (Ring);


/***/ }),

/***/ "./src/RingGroup.ts":
/*!**************************!*\
  !*** ./src/RingGroup.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Ring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ring */ "./src/Ring.ts");

var RingGroup = /** @class */ (function () {
    function RingGroup(displayRadius, rotFactor, rotSpeed, ringCount, _currentAng) {
        if (_currentAng === void 0) { _currentAng = 0; }
        this.displayRadius = displayRadius;
        this.rotFactor = rotFactor;
        this.rotSpeed = rotSpeed;
        this.ringCount = ringCount;
        this._currentAng = _currentAng;
        this.rings = [];
        this.center = { x: 300, y: 300 };
        this.createRings();
    }
    Object.defineProperty(RingGroup.prototype, "currentAng", {
        get: function () {
            return this._currentAng;
        },
        enumerable: true,
        configurable: true
    });
    RingGroup.prototype.updateRingSize = function (newCanvasSize) {
        this.center = {
            x: newCanvasSize.x / 2,
            y: newCanvasSize.y / 2
        };
        var minDim = newCanvasSize.x < newCanvasSize.y ? newCanvasSize.x : newCanvasSize.y;
        this.displayRadius = minDim / 2 - 3;
        this.createRings();
    };
    RingGroup.prototype.tick = function () {
        this._currentAng += this.rotSpeed;
        this.updateRings();
    };
    RingGroup.prototype.untick = function () {
        this._currentAng -= this.rotSpeed;
        this.updateRings();
    };
    RingGroup.prototype.setRingCount = function (newRingCount) {
        this.createRings(newRingCount);
        this.updateRings();
    };
    RingGroup.prototype.setAngle = function (newAngleRad) {
        this._currentAng = newAngleRad;
        this.updateRings();
    };
    RingGroup.prototype.setRotSpeed = function (newRotSpeed) {
        this.rotSpeed = newRotSpeed;
    };
    RingGroup.prototype.draw = function (canvas) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.rings.forEach(function (ring) { return ring.draw(ctx); });
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.rings[0].pointPos.x, this.rings[0].pointPos.y);
        this.rings
            .map(function (ring) { return ring.pointPos; })
            .forEach(function (_a) {
            var x = _a.x, y = _a.y;
            ctx.lineTo(x, y);
        });
        ctx.moveTo(this.rings[0].pointPos.x, this.rings[0].pointPos.y);
        ctx.closePath();
        ctx.strokeStyle = "#000f";
        ctx.stroke();
        ctx.restore();
    };
    RingGroup.prototype.createRings = function (newRingCount) {
        if (newRingCount === void 0) { newRingCount = this.ringCount; }
        this.ringCount = newRingCount;
        this.rings = [];
        for (var i = 1; i < this.ringCount; i++) {
            var radius = (i / this.ringCount) * this.displayRadius;
            var rotationFactor = // (i / this.ringCount) * this.rotFactor;
             ((this.ringCount - i) / this.ringCount) * this.rotFactor;
            this.rings.push(new _Ring__WEBPACK_IMPORTED_MODULE_0__["default"](radius, rotationFactor, { x: this.center.x, y: this.center.y }));
        }
    };
    RingGroup.prototype.updateRings = function () {
        var _this = this;
        this.rings.forEach(function (ring) { return ring.update(_this._currentAng); });
    };
    return RingGroup;
}());
/* harmony default export */ __webpack_exports__["default"] = (RingGroup);


/***/ }),

/***/ "./src/helperFunctions.ts":
/*!********************************!*\
  !*** ./src/helperFunctions.ts ***!
  \********************************/
/*! exports provided: minDimension, dimensions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minDimension", function() { return minDimension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dimensions", function() { return dimensions; });
function minDimension(el) {
    return el.offsetWidth < el.offsetHeight ? el.offsetWidth : el.offsetHeight;
}
function dimensions(el) {
    var retVal = {
        x: el.offsetWidth,
        y: el.offsetHeight,
    };
    return retVal;
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/Game.ts");
// https://www.reddit.com/r/perfectloops/comments/bzbgh4/i_cant_stop_watching/

var DISPLAY_RADIUS = 250;
var RING_COUNT = 50;
var ROT_FACTOR = 1;
var ROT_SPEED = (Math.PI / 180) * 3.422;
document.addEventListener("DOMContentLoaded", function () {
    var rotationsTextElement = document.querySelector("#angle-display");
    var speedTextElement = document.querySelector("#speed-display");
    var canvas = document.querySelector("canvas");
    var game = new _Game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, DISPLAY_RADIUS, ROT_FACTOR, ROT_SPEED, RING_COUNT, 0, function (rotations) {
        var truncated = Math.floor(rotations * 1000) / 1000;
        rotationsTextElement.innerText = "" + truncated;
    });
    var textInput = document.querySelector("#text");
    var speedSlider = document.querySelector("#speed");
    document.querySelector("#set-angle").addEventListener("submit", function (e) {
        e.preventDefault();
        var value = parseFloat(textInput.value) * Math.PI * 2;
        if (isNaN(value)) {
            textInput.value = "";
        }
        else {
            game.setAngle(value);
            game.draw();
        }
    });
    document.querySelector("#play").addEventListener("click", function () {
        game.play();
    });
    document.querySelector("#pause").addEventListener("click", function () {
        game.pause();
    });
    document.querySelector("#reverse").addEventListener("click", function () {
        game.reverse();
    });
    document.querySelector("#tick").addEventListener("click", function () {
        game.tick();
        game.draw();
    });
    document.querySelector("#speed").addEventListener("input", function (e) {
        var degPerFrame = Math.pow(parseFloat(speedSlider.value), 2);
        var radiansPerFrame = degPerFrame * (Math.PI / 180);
        var truncated = Math.floor(degPerFrame * 1000) / 1000;
        speedTextElement.innerText = "" + truncated;
        game.setSpeed(radiansPerFrame);
    });
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JpbmdHcm91cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVyRnVuY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFvQztBQUNXO0FBRS9DO0lBT0UsY0FDVSxNQUF5QixFQUNqQyxhQUFxQixFQUNyQixTQUFpQixFQUNqQixRQUFnQixFQUNoQixTQUFpQixFQUNqQixVQUFrQixFQUNYLE1BQXVDO1FBUGhELGlCQW1CQztRQWxCUyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQU0xQixXQUFNLEdBQU4sTUFB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LENBQUMsT0FBTyxFQUFFLFdBQUM7UUFDMUQsSUFBTSxXQUFXLEdBQUcsbUJBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUksQ0FBQyxFQUFDO1FBQ3ZELElBQU0sZUFBZSxHQUFHLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hELGdCQUFnQixDQUFDLFNBQVMsR0FBRyxLQUFHLFNBQVcsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgUmluZ0dyb3VwIGZyb20gXCIuL1JpbmdHcm91cFwiO1xuaW1wb3J0IHsgZGltZW5zaW9ucyB9IGZyb20gXCIuL2hlbHBlckZ1bmN0aW9uc1wiO1xuXG5jbGFzcyBHYW1lIHtcbiAgcHJpdmF0ZSBsb29waW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgZm9yd2FyZDogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgZnJhbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSByZXNpemVGcmFtZTogbnVtYmVyO1xuICBwcml2YXRlIHJpbmdHcm91cDogUmluZ0dyb3VwO1xuICBwcml2YXRlIGRpbXM6IHZlY3RvciA9IHsgeDogLTEsIHk6IC0xIH07XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICBkaXNwbGF5UmFkaXVzOiBudW1iZXIsXG4gICAgcm90RmFjdG9yOiBudW1iZXIsXG4gICAgcm90U3BlZWQ6IG51bWJlcixcbiAgICByaW5nQ291bnQ6IG51bWJlcixcbiAgICBjdXJyZW50QW5nOiBudW1iZXIsXG4gICAgcHVibGljIG9uVGljazogKHJvdGF0aW9uQ291bnQ6IG51bWJlcikgPT4gdm9pZFxuICApIHtcbiAgICB0aGlzLmxvb3AgPSB0aGlzLmxvb3AuYmluZCh0aGlzKTtcbiAgICB0aGlzLnJpbmdHcm91cCA9IG5ldyBSaW5nR3JvdXAoXG4gICAgICBkaXNwbGF5UmFkaXVzLFxuICAgICAgcm90RmFjdG9yLFxuICAgICAgcm90U3BlZWQsXG4gICAgICByaW5nQ291bnQsXG4gICAgICBjdXJyZW50QW5nXG4gICAgKTtcbiAgICB0aGlzLnJlc2l6ZUxvb3AoKTtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxuXG4gIHJlc2l6ZUxvb3AgPSAoKSA9PiB7XG4gICAgdGhpcy5yZXNpemVGcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlc2l6ZUxvb3ApO1xuICAgIHRoaXMuZHJhdygpO1xuICAgIHRoaXMucmVzaXplKCk7XG4gIH07XG5cbiAgZ2V0IHJvdGF0aW9uQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmluZ0dyb3VwLmN1cnJlbnRBbmcgLyBNYXRoLlBJIC8gMjtcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICBjb25zdCBkaW1zID0gZGltZW5zaW9ucyh0aGlzLmNhbnZhcyk7XG4gICAgY29uc3QgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICBkaW1zLnggKj0gZHByO1xuICAgIGRpbXMueSAqPSBkcHI7XG4gICAgaWYgKGRpbXMueCA9PT0gdGhpcy5kaW1zLnggJiYgZGltcy55ID09PSB0aGlzLmRpbXMueSkgcmV0dXJuO1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gZGltcy54O1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGRpbXMueTtcbiAgICB0aGlzLmRpbXMgPSBkaW1zO1xuICAgIHRoaXMucmluZ0dyb3VwLnVwZGF0ZVJpbmdTaXplKGRpbXMpO1xuICAgIHRoaXMucmluZ0dyb3VwLnVwZGF0ZVJpbmdzKCk7XG4gIH1cblxuICBzZXRTcGVlZChyYWRpYW5zUGVyRnJhbWU6IG51bWJlcikge1xuICAgIHRoaXMucmluZ0dyb3VwLnNldFJvdFNwZWVkKHJhZGlhbnNQZXJGcmFtZSk7XG4gIH1cblxuICBzZXRBbmdsZShhbmdsZTogbnVtYmVyKSB7XG4gICAgdGhpcy5yaW5nR3JvdXAuc2V0QW5nbGUoYW5nbGUpO1xuICAgIHRoaXMub25UaWNrKHRoaXMucm90YXRpb25Db3VudCk7XG4gIH1cblxuICByZXZlcnNlKCkge1xuICAgIHRoaXMuZm9yd2FyZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmxvb3BpbmcpIHJldHVybjtcbiAgICB0aGlzLmxvb3BpbmcgPSB0cnVlO1xuICAgIHRoaXMuZnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wKTtcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5mb3J3YXJkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5sb29waW5nKSByZXR1cm47XG4gICAgdGhpcy5sb29waW5nID0gdHJ1ZTtcbiAgICB0aGlzLmZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcCk7XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZiAodGhpcy5sb29waW5nKSB7XG4gICAgICB0aGlzLmxvb3BpbmcgPSBmYWxzZTtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvb3BpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5mcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApO1xuICAgIH1cbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgaWYgKHRoaXMuZm9yd2FyZCkge1xuICAgICAgdGhpcy5yaW5nR3JvdXAudGljaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJpbmdHcm91cC51bnRpY2soKTtcbiAgICB9XG4gICAgdGhpcy5vblRpY2sodGhpcy5yb3RhdGlvbkNvdW50KTtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhpcy5yaW5nR3JvdXAuZHJhdyh0aGlzLmNhbnZhcyk7XG4gIH1cblxuICBwcml2YXRlIGxvb3AoKSB7XG4gICAgdGhpcy5mcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApO1xuICAgIHRoaXMudGljaygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjbGFzcyBSaW5nIHtcbiAgY3VycmVudEFuZzogbnVtYmVyID0gMDtcbiAgcG9pbnRQb3M6IHZlY3RvciA9IHsgeDogMCwgeTogMCB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByYWRpdXM6IG51bWJlcixcbiAgICBwdWJsaWMgcm90YXRpb25GYWN0b3I6IG51bWJlcixcbiAgICBwdWJsaWMgY2VudGVyOiB2ZWN0b3JcbiAgKSB7XG4gICAgdGhpcy51cGRhdGUodGhpcy5jdXJyZW50QW5nKTtcbiAgfVxuXG4gIHVwZGF0ZShuZXdBbmc6IG51bWJlcik6IHZlY3RvciB7XG4gICAgdGhpcy5jdXJyZW50QW5nID0gbmV3QW5nO1xuICAgIGNvbnN0IHJvdGF0ZWRBbmcgPSBuZXdBbmcgKiB0aGlzLnJvdGF0aW9uRmFjdG9yO1xuICAgIGNvbnN0IHggPSBNYXRoLmNvcyhyb3RhdGVkQW5nKSAqIHRoaXMucmFkaXVzICsgdGhpcy5jZW50ZXIueDtcbiAgICBjb25zdCB5ID0gTWF0aC5zaW4ocm90YXRlZEFuZykgKiB0aGlzLnJhZGl1cyArIHRoaXMuY2VudGVyLnk7XG4gICAgdGhpcy5wb2ludFBvcyA9IHsgeCwgeSB9O1xuICAgIHJldHVybiB7IHgsIHkgfTtcbiAgfVxuXG4gIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2YwZjBmMFwiO1xuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHRoaXMuY2VudGVyLngsIHRoaXMuY2VudGVyLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBmXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy5wb2ludFBvcy54LCB0aGlzLnBvaW50UG9zLnksIDEsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmluZzsiLCJpbXBvcnQgUmluZyBmcm9tIFwiLi9SaW5nXCI7XG5cbmNsYXNzIFJpbmdHcm91cCB7XG4gIHByaXZhdGUgcmluZ3M6IFJpbmdbXSA9IFtdO1xuICBwcml2YXRlIGNlbnRlcjogdmVjdG9yID0geyB4OiAzMDAsIHk6IDMwMCB9O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpc3BsYXlSYWRpdXM6IG51bWJlcixcbiAgICBwcml2YXRlIHJvdEZhY3RvcjogbnVtYmVyLFxuICAgIHByaXZhdGUgcm90U3BlZWQ6IG51bWJlcixcbiAgICBwcml2YXRlIHJpbmdDb3VudDogbnVtYmVyLFxuICAgIHByaXZhdGUgX2N1cnJlbnRBbmc6IG51bWJlciA9IDBcbiAgKSB7XG4gICAgdGhpcy5jcmVhdGVSaW5ncygpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRBbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRBbmc7XG4gIH1cblxuICB1cGRhdGVSaW5nU2l6ZShuZXdDYW52YXNTaXplOiB2ZWN0b3IpIHtcbiAgICB0aGlzLmNlbnRlciA9IHtcbiAgICAgIHg6IG5ld0NhbnZhc1NpemUueCAvIDIsXG4gICAgICB5OiBuZXdDYW52YXNTaXplLnkgLyAyXG4gICAgfTtcbiAgICBjb25zdCBtaW5EaW0gPVxuICAgICAgbmV3Q2FudmFzU2l6ZS54IDwgbmV3Q2FudmFzU2l6ZS55ID8gbmV3Q2FudmFzU2l6ZS54IDogbmV3Q2FudmFzU2l6ZS55O1xuICAgIHRoaXMuZGlzcGxheVJhZGl1cyA9IG1pbkRpbSAvIDIgLSAzO1xuICAgIHRoaXMuY3JlYXRlUmluZ3MoKTtcbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgdGhpcy5fY3VycmVudEFuZyArPSB0aGlzLnJvdFNwZWVkO1xuICAgIHRoaXMudXBkYXRlUmluZ3MoKTtcbiAgfVxuXG4gIHVudGljaygpIHtcbiAgICB0aGlzLl9jdXJyZW50QW5nIC09IHRoaXMucm90U3BlZWQ7XG4gICAgdGhpcy51cGRhdGVSaW5ncygpO1xuICB9XG5cbiAgc2V0UmluZ0NvdW50KG5ld1JpbmdDb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5jcmVhdGVSaW5ncyhuZXdSaW5nQ291bnQpO1xuICAgIHRoaXMudXBkYXRlUmluZ3MoKTtcbiAgfVxuXG4gIHNldEFuZ2xlKG5ld0FuZ2xlUmFkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50QW5nID0gbmV3QW5nbGVSYWQ7XG4gICAgdGhpcy51cGRhdGVSaW5ncygpO1xuICB9XG5cbiAgc2V0Um90U3BlZWQobmV3Um90U3BlZWQ6IG51bWJlcikge1xuICAgIHRoaXMucm90U3BlZWQgPSBuZXdSb3RTcGVlZDtcbiAgfVxuXG4gIGRyYXcoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMucmluZ3MuZm9yRWFjaChyaW5nID0+IHJpbmcuZHJhdyhjdHgpKTtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8odGhpcy5yaW5nc1swXS5wb2ludFBvcy54LCB0aGlzLnJpbmdzWzBdLnBvaW50UG9zLnkpO1xuICAgIHRoaXMucmluZ3NcbiAgICAgIC5tYXAocmluZyA9PiByaW5nLnBvaW50UG9zKVxuICAgICAgLmZvckVhY2goKHsgeCwgeSB9KSA9PiB7XG4gICAgICAgIGN0eC5saW5lVG8oeCwgeSk7XG4gICAgICB9KTtcbiAgICBjdHgubW92ZVRvKHRoaXMucmluZ3NbMF0ucG9pbnRQb3MueCwgdGhpcy5yaW5nc1swXS5wb2ludFBvcy55KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwZlwiO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSaW5ncyhuZXdSaW5nQ291bnQ6IG51bWJlciA9IHRoaXMucmluZ0NvdW50KSB7XG4gICAgdGhpcy5yaW5nQ291bnQgPSBuZXdSaW5nQ291bnQ7XG4gICAgdGhpcy5yaW5ncyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5yaW5nQ291bnQ7IGkrKykge1xuICAgICAgY29uc3QgcmFkaXVzID0gKGkgLyB0aGlzLnJpbmdDb3VudCkgKiB0aGlzLmRpc3BsYXlSYWRpdXM7XG4gICAgICBjb25zdCByb3RhdGlvbkZhY3RvciA9IC8vIChpIC8gdGhpcy5yaW5nQ291bnQpICogdGhpcy5yb3RGYWN0b3I7XG4gICAgICAgICgodGhpcy5yaW5nQ291bnQgLSBpKSAvIHRoaXMucmluZ0NvdW50KSAqIHRoaXMucm90RmFjdG9yO1xuICAgICAgdGhpcy5yaW5ncy5wdXNoKFxuICAgICAgICBuZXcgUmluZyhyYWRpdXMsIHJvdGF0aW9uRmFjdG9yLCB7IHg6IHRoaXMuY2VudGVyLngsIHk6IHRoaXMuY2VudGVyLnkgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUmluZ3MoKSB7XG4gICAgdGhpcy5yaW5ncy5mb3JFYWNoKHJpbmcgPT4gcmluZy51cGRhdGUodGhpcy5fY3VycmVudEFuZykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJpbmdHcm91cDtcbiIsImV4cG9ydCBmdW5jdGlvbiBtaW5EaW1lbnNpb24oZWw6IEhUTUxFbGVtZW50KSB7XG4gIHJldHVybiBlbC5vZmZzZXRXaWR0aCA8IGVsLm9mZnNldEhlaWdodCA/IGVsLm9mZnNldFdpZHRoIDogZWwub2Zmc2V0SGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGltZW5zaW9ucyhlbDogSFRNTEVsZW1lbnQpOiB2ZWN0b3Ige1xuICBjb25zdCByZXRWYWw6IHZlY3RvciA9IHtcbiAgICB4OiBlbC5vZmZzZXRXaWR0aCxcbiAgICB5OiBlbC5vZmZzZXRIZWlnaHQsXG4gIH1cbiAgcmV0dXJuIHJldFZhbFxufVxuIiwiLy8gaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9yL3BlcmZlY3Rsb29wcy9jb21tZW50cy9iemJnaDQvaV9jYW50X3N0b3Bfd2F0Y2hpbmcvXG5cbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxuY29uc3QgRElTUExBWV9SQURJVVMgPSAyNTA7XG5jb25zdCBSSU5HX0NPVU5UID0gNTA7XG5jb25zdCBST1RfRkFDVE9SID0gMTtcbmNvbnN0IFJPVF9TUEVFRCA9IChNYXRoLlBJIC8gMTgwKSAqIDMuNDIyO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IHJvdGF0aW9uc1RleHRFbGVtZW50OiBIVE1MUGFyYWdyYXBoRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIjYW5nbGUtZGlzcGxheVwiXG4gICk7XG4gIGNvbnN0IHNwZWVkVGV4dEVsZW1lbnQ6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIiNzcGVlZC1kaXNwbGF5XCJcbiAgKTtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKTtcbiAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKFxuICAgIGNhbnZhcyxcbiAgICBESVNQTEFZX1JBRElVUyxcbiAgICBST1RfRkFDVE9SLFxuICAgIFJPVF9TUEVFRCxcbiAgICBSSU5HX0NPVU5ULFxuICAgIDAsXG4gICAgKHJvdGF0aW9uczogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCB0cnVuY2F0ZWQgPSBNYXRoLmZsb29yKHJvdGF0aW9ucyAqIDEwMDApIC8gMTAwMDtcbiAgICAgIHJvdGF0aW9uc1RleHRFbGVtZW50LmlubmVyVGV4dCA9IGAke3RydW5jYXRlZH1gO1xuICAgIH1cbiAgKTtcblxuICBjb25zdCB0ZXh0SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RleHRcIik7XG4gIGNvbnN0IHNwZWVkU2xpZGVyOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcGVlZFwiKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZXQtYW5nbGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHZhbHVlID0gcGFyc2VGbG9hdCh0ZXh0SW5wdXQudmFsdWUpICogTWF0aC5QSSAqIDI7XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgdGV4dElucHV0LnZhbHVlID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZS5zZXRBbmdsZSh2YWx1ZSk7XG4gICAgICBnYW1lLmRyYXcoKTtcbiAgICB9XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lLnBsYXkoKTtcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGF1c2VcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lLnBhdXNlKCk7XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JldmVyc2VcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lLnJldmVyc2UoKTtcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGlja1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUudGljaygpO1xuICAgIGdhbWUuZHJhdygpO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcGVlZFwiKS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZSA9PiB7XG4gICAgY29uc3QgZGVnUGVyRnJhbWUgPSBwYXJzZUZsb2F0KHNwZWVkU2xpZGVyLnZhbHVlKSAqKiAyO1xuICAgIGNvbnN0IHJhZGlhbnNQZXJGcmFtZSA9IGRlZ1BlckZyYW1lICogKE1hdGguUEkgLyAxODApO1xuICAgIGNvbnN0IHRydW5jYXRlZCA9IE1hdGguZmxvb3IoZGVnUGVyRnJhbWUgKiAxMDAwKSAvIDEwMDA7XG4gICAgc3BlZWRUZXh0RWxlbWVudC5pbm5lclRleHQgPSBgJHt0cnVuY2F0ZWR9YDtcbiAgICBnYW1lLnNldFNwZWVkKHJhZGlhbnNQZXJGcmFtZSk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9