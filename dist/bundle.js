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
        var dpr = window.devicePixelRatio || 1;
        ctx.save();
        ctx.strokeStyle = "#f0f0f0";
        ctx.lineWidth = dpr;
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
        var dpr = window.devicePixelRatio || 1;
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
        ctx.lineWidth = dpr;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JpbmdHcm91cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVyRnVuY3Rpb25zLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFvQztBQUNXO0FBRS9DO0lBT0UsY0FDVSxNQUF5QixFQUNqQyxhQUFxQixFQUNyQixTQUFpQixFQUNqQixRQUFnQixFQUNoQixTQUFpQixFQUNqQixVQUFrQixFQUNYLE1BQXVDO1FBUGhELGlCQW1CQztRQWxCUyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQU0xQixXQUFNLEdBQU4sTUFB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Q0FBQyxPQUFPLEVBQUU7UUFDeEQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxXQUFDO1FBQzFELElBQU0sV0FBVyxHQUFHLG1CQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFJLENBQUMsRUFBQztRQUN2RCxJQUFNLGVBQWUsR0FBRyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4RCxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsS0FBRyxTQUFXLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IFJpbmdHcm91cCBmcm9tIFwiLi9SaW5nR3JvdXBcIjtcbmltcG9ydCB7IGRpbWVuc2lvbnMgfSBmcm9tIFwiLi9oZWxwZXJGdW5jdGlvbnNcIjtcblxuY2xhc3MgR2FtZSB7XG4gIHByaXZhdGUgbG9vcGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGZvcndhcmQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIGZyYW1lOiBudW1iZXI7XG4gIHByaXZhdGUgcmVzaXplRnJhbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSByaW5nR3JvdXA6IFJpbmdHcm91cDtcbiAgcHJpdmF0ZSBkaW1zOiB2ZWN0b3IgPSB7IHg6IC0xLCB5OiAtMSB9O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsXG4gICAgZGlzcGxheVJhZGl1czogbnVtYmVyLFxuICAgIHJvdEZhY3RvcjogbnVtYmVyLFxuICAgIHJvdFNwZWVkOiBudW1iZXIsXG4gICAgcmluZ0NvdW50OiBudW1iZXIsXG4gICAgY3VycmVudEFuZzogbnVtYmVyLFxuICAgIHB1YmxpYyBvblRpY2s6IChyb3RhdGlvbkNvdW50OiBudW1iZXIpID0+IHZvaWRcbiAgKSB7XG4gICAgdGhpcy5sb29wID0gdGhpcy5sb29wLmJpbmQodGhpcyk7XG4gICAgdGhpcy5yaW5nR3JvdXAgPSBuZXcgUmluZ0dyb3VwKFxuICAgICAgZGlzcGxheVJhZGl1cyxcbiAgICAgIHJvdEZhY3RvcixcbiAgICAgIHJvdFNwZWVkLFxuICAgICAgcmluZ0NvdW50LFxuICAgICAgY3VycmVudEFuZ1xuICAgICk7XG4gICAgdGhpcy5yZXNpemVMb29wKCk7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cblxuICByZXNpemVMb29wID0gKCkgPT4ge1xuICAgIHRoaXMucmVzaXplRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZXNpemVMb29wKTtcbiAgICB0aGlzLmRyYXcoKTtcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICB9O1xuXG4gIGdldCByb3RhdGlvbkNvdW50KCkge1xuICAgIHJldHVybiB0aGlzLnJpbmdHcm91cC5jdXJyZW50QW5nIC8gTWF0aC5QSSAvIDI7XG4gIH1cblxuICByZXNpemUoKSB7XG4gICAgY29uc3QgZGltcyA9IGRpbWVuc2lvbnModGhpcy5jYW52YXMpO1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gICAgZGltcy54ICo9IGRwcjtcbiAgICBkaW1zLnkgKj0gZHByO1xuICAgIGlmIChkaW1zLnggPT09IHRoaXMuZGltcy54ICYmIGRpbXMueSA9PT0gdGhpcy5kaW1zLnkpIHJldHVybjtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IGRpbXMueDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBkaW1zLnk7XG4gICAgdGhpcy5kaW1zID0gZGltcztcbiAgICB0aGlzLnJpbmdHcm91cC51cGRhdGVSaW5nU2l6ZShkaW1zKTtcbiAgICB0aGlzLnJpbmdHcm91cC51cGRhdGVSaW5ncygpO1xuICB9XG5cbiAgc2V0U3BlZWQocmFkaWFuc1BlckZyYW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLnJpbmdHcm91cC5zZXRSb3RTcGVlZChyYWRpYW5zUGVyRnJhbWUpO1xuICB9XG5cbiAgc2V0QW5nbGUoYW5nbGU6IG51bWJlcikge1xuICAgIHRoaXMucmluZ0dyb3VwLnNldEFuZ2xlKGFuZ2xlKTtcbiAgICB0aGlzLm9uVGljayh0aGlzLnJvdGF0aW9uQ291bnQpO1xuICB9XG5cbiAgcmV2ZXJzZSgpIHtcbiAgICB0aGlzLmZvcndhcmQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5sb29waW5nKSByZXR1cm47XG4gICAgdGhpcy5sb29waW5nID0gdHJ1ZTtcbiAgICB0aGlzLmZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcCk7XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuZm9yd2FyZCA9IHRydWU7XG4gICAgaWYgKHRoaXMubG9vcGluZykgcmV0dXJuO1xuICAgIHRoaXMubG9vcGluZyA9IHRydWU7XG4gICAgdGhpcy5mcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgaWYgKHRoaXMubG9vcGluZykge1xuICAgICAgdGhpcy5sb29waW5nID0gZmFsc2U7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb29waW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuZnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wKTtcbiAgICB9XG4gIH1cblxuICB0aWNrKCkge1xuICAgIGlmICh0aGlzLmZvcndhcmQpIHtcbiAgICAgIHRoaXMucmluZ0dyb3VwLnRpY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yaW5nR3JvdXAudW50aWNrKCk7XG4gICAgfVxuICAgIHRoaXMub25UaWNrKHRoaXMucm90YXRpb25Db3VudCk7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHRoaXMucmluZ0dyb3VwLmRyYXcodGhpcy5jYW52YXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb29wKCkge1xuICAgIHRoaXMuZnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wKTtcbiAgICB0aGlzLnRpY2soKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY2xhc3MgUmluZyB7XG4gIGN1cnJlbnRBbmc6IG51bWJlciA9IDA7XG4gIHBvaW50UG9zOiB2ZWN0b3IgPSB7IHg6IDAsIHk6IDAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmFkaXVzOiBudW1iZXIsXG4gICAgcHVibGljIHJvdGF0aW9uRmFjdG9yOiBudW1iZXIsXG4gICAgcHVibGljIGNlbnRlcjogdmVjdG9yXG4gICkge1xuICAgIHRoaXMudXBkYXRlKHRoaXMuY3VycmVudEFuZyk7XG4gIH1cblxuICB1cGRhdGUobmV3QW5nOiBudW1iZXIpOiB2ZWN0b3Ige1xuICAgIHRoaXMuY3VycmVudEFuZyA9IG5ld0FuZztcbiAgICBjb25zdCByb3RhdGVkQW5nID0gbmV3QW5nICogdGhpcy5yb3RhdGlvbkZhY3RvcjtcbiAgICBjb25zdCB4ID0gTWF0aC5jb3Mocm90YXRlZEFuZykgKiB0aGlzLnJhZGl1cyArIHRoaXMuY2VudGVyLng7XG4gICAgY29uc3QgeSA9IE1hdGguc2luKHJvdGF0ZWRBbmcpICogdGhpcy5yYWRpdXMgKyB0aGlzLmNlbnRlci55O1xuICAgIHRoaXMucG9pbnRQb3MgPSB7IHgsIHkgfTtcbiAgICByZXR1cm4geyB4LCB5IH07XG4gIH1cblxuICBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgY29uc3QgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2YwZjBmMFwiO1xuICAgIGN0eC5saW5lV2lkdGggPSBkcHI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy5jZW50ZXIueCwgdGhpcy5jZW50ZXIueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMGZcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh0aGlzLnBvaW50UG9zLngsIHRoaXMucG9pbnRQb3MueSwgMSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSaW5nO1xuIiwiaW1wb3J0IFJpbmcgZnJvbSBcIi4vUmluZ1wiO1xuXG5jbGFzcyBSaW5nR3JvdXAge1xuICBwcml2YXRlIHJpbmdzOiBSaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBjZW50ZXI6IHZlY3RvciA9IHsgeDogMzAwLCB5OiAzMDAgfTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkaXNwbGF5UmFkaXVzOiBudW1iZXIsXG4gICAgcHJpdmF0ZSByb3RGYWN0b3I6IG51bWJlcixcbiAgICBwcml2YXRlIHJvdFNwZWVkOiBudW1iZXIsXG4gICAgcHJpdmF0ZSByaW5nQ291bnQ6IG51bWJlcixcbiAgICBwcml2YXRlIF9jdXJyZW50QW5nOiBudW1iZXIgPSAwXG4gICkge1xuICAgIHRoaXMuY3JlYXRlUmluZ3MoKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50QW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50QW5nO1xuICB9XG5cbiAgdXBkYXRlUmluZ1NpemUobmV3Q2FudmFzU2l6ZTogdmVjdG9yKSB7XG4gICAgdGhpcy5jZW50ZXIgPSB7XG4gICAgICB4OiBuZXdDYW52YXNTaXplLnggLyAyLFxuICAgICAgeTogbmV3Q2FudmFzU2l6ZS55IC8gMlxuICAgIH07XG4gICAgY29uc3QgbWluRGltID1cbiAgICAgIG5ld0NhbnZhc1NpemUueCA8IG5ld0NhbnZhc1NpemUueSA/IG5ld0NhbnZhc1NpemUueCA6IG5ld0NhbnZhc1NpemUueTtcbiAgICB0aGlzLmRpc3BsYXlSYWRpdXMgPSBtaW5EaW0gLyAyIC0gMztcbiAgICB0aGlzLmNyZWF0ZVJpbmdzKCk7XG4gIH1cblxuICB0aWNrKCkge1xuICAgIHRoaXMuX2N1cnJlbnRBbmcgKz0gdGhpcy5yb3RTcGVlZDtcbiAgICB0aGlzLnVwZGF0ZVJpbmdzKCk7XG4gIH1cblxuICB1bnRpY2soKSB7XG4gICAgdGhpcy5fY3VycmVudEFuZyAtPSB0aGlzLnJvdFNwZWVkO1xuICAgIHRoaXMudXBkYXRlUmluZ3MoKTtcbiAgfVxuXG4gIHNldFJpbmdDb3VudChuZXdSaW5nQ291bnQ6IG51bWJlcikge1xuICAgIHRoaXMuY3JlYXRlUmluZ3MobmV3UmluZ0NvdW50KTtcbiAgICB0aGlzLnVwZGF0ZVJpbmdzKCk7XG4gIH1cblxuICBzZXRBbmdsZShuZXdBbmdsZVJhZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY3VycmVudEFuZyA9IG5ld0FuZ2xlUmFkO1xuICAgIHRoaXMudXBkYXRlUmluZ3MoKTtcbiAgfVxuXG4gIHNldFJvdFNwZWVkKG5ld1JvdFNwZWVkOiBudW1iZXIpIHtcbiAgICB0aGlzLnJvdFNwZWVkID0gbmV3Um90U3BlZWQ7XG4gIH1cblxuICBkcmF3KGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICBjb25zdCBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMucmluZ3MuZm9yRWFjaChyaW5nID0+IHJpbmcuZHJhdyhjdHgpKTtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8odGhpcy5yaW5nc1swXS5wb2ludFBvcy54LCB0aGlzLnJpbmdzWzBdLnBvaW50UG9zLnkpO1xuICAgIHRoaXMucmluZ3NcbiAgICAgIC5tYXAocmluZyA9PiByaW5nLnBvaW50UG9zKVxuICAgICAgLmZvckVhY2goKHsgeCwgeSB9KSA9PiB7XG4gICAgICAgIGN0eC5saW5lVG8oeCwgeSk7XG4gICAgICB9KTtcbiAgICBjdHgubW92ZVRvKHRoaXMucmluZ3NbMF0ucG9pbnRQb3MueCwgdGhpcy5yaW5nc1swXS5wb2ludFBvcy55KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LmxpbmVXaWR0aCA9IGRwcjtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBmXCI7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJpbmdzKG5ld1JpbmdDb3VudDogbnVtYmVyID0gdGhpcy5yaW5nQ291bnQpIHtcbiAgICB0aGlzLnJpbmdDb3VudCA9IG5ld1JpbmdDb3VudDtcbiAgICB0aGlzLnJpbmdzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnJpbmdDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCByYWRpdXMgPSAoaSAvIHRoaXMucmluZ0NvdW50KSAqIHRoaXMuZGlzcGxheVJhZGl1cztcbiAgICAgIGNvbnN0IHJvdGF0aW9uRmFjdG9yID0gLy8gKGkgLyB0aGlzLnJpbmdDb3VudCkgKiB0aGlzLnJvdEZhY3RvcjtcbiAgICAgICAgKCh0aGlzLnJpbmdDb3VudCAtIGkpIC8gdGhpcy5yaW5nQ291bnQpICogdGhpcy5yb3RGYWN0b3I7XG4gICAgICB0aGlzLnJpbmdzLnB1c2goXG4gICAgICAgIG5ldyBSaW5nKHJhZGl1cywgcm90YXRpb25GYWN0b3IsIHsgeDogdGhpcy5jZW50ZXIueCwgeTogdGhpcy5jZW50ZXIueSB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVSaW5ncygpIHtcbiAgICB0aGlzLnJpbmdzLmZvckVhY2gocmluZyA9PiByaW5nLnVwZGF0ZSh0aGlzLl9jdXJyZW50QW5nKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmluZ0dyb3VwO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIG1pbkRpbWVuc2lvbihlbDogSFRNTEVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsLm9mZnNldFdpZHRoIDwgZWwub2Zmc2V0SGVpZ2h0ID8gZWwub2Zmc2V0V2lkdGggOiBlbC5vZmZzZXRIZWlnaHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaW1lbnNpb25zKGVsOiBIVE1MRWxlbWVudCk6IHZlY3RvciB7XG4gIGNvbnN0IHJldFZhbDogdmVjdG9yID0ge1xuICAgIHg6IGVsLm9mZnNldFdpZHRoLFxuICAgIHk6IGVsLm9mZnNldEhlaWdodCxcbiAgfVxuICByZXR1cm4gcmV0VmFsXG59XG4iLCIvLyBodHRwczovL3d3dy5yZWRkaXQuY29tL3IvcGVyZmVjdGxvb3BzL2NvbW1lbnRzL2J6YmdoNC9pX2NhbnRfc3RvcF93YXRjaGluZy9cblxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xuXG5jb25zdCBESVNQTEFZX1JBRElVUyA9IDI1MDtcbmNvbnN0IFJJTkdfQ09VTlQgPSA1MDtcbmNvbnN0IFJPVF9GQUNUT1IgPSAxO1xuY29uc3QgUk9UX1NQRUVEID0gKE1hdGguUEkgLyAxODApICogMy40MjI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc3Qgcm90YXRpb25zVGV4dEVsZW1lbnQ6IEhUTUxQYXJhZ3JhcGhFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICBcIiNhbmdsZS1kaXNwbGF5XCJcbiAgKTtcbiAgY29uc3Qgc3BlZWRUZXh0RWxlbWVudDogSFRNTFBhcmFncmFwaEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiI3NwZWVkLWRpc3BsYXlcIlxuICApO1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpO1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoXG4gICAgY2FudmFzLFxuICAgIERJU1BMQVlfUkFESVVTLFxuICAgIFJPVF9GQUNUT1IsXG4gICAgUk9UX1NQRUVELFxuICAgIFJJTkdfQ09VTlQsXG4gICAgMCxcbiAgICAocm90YXRpb25zOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IHRydW5jYXRlZCA9IE1hdGguZmxvb3Iocm90YXRpb25zICogMTAwMCkgLyAxMDAwO1xuICAgICAgcm90YXRpb25zVGV4dEVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7dHJ1bmNhdGVkfWA7XG4gICAgfVxuICApO1xuXG4gIGNvbnN0IHRleHRJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGV4dFwiKTtcbiAgY29uc3Qgc3BlZWRTbGlkZXI6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NwZWVkXCIpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NldC1hbmdsZVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdmFsdWUgPSBwYXJzZUZsb2F0KHRleHRJbnB1dC52YWx1ZSkgKiBNYXRoLlBJICogMjtcbiAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICB0ZXh0SW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBnYW1lLnNldEFuZ2xlKHZhbHVlKTtcbiAgICAgIGdhbWUuZHJhdygpO1xuICAgIH1cbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUucGxheSgpO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXVzZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUucGF1c2UoKTtcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmV2ZXJzZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUucmV2ZXJzZSgpO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aWNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZ2FtZS50aWNrKCk7XG4gICAgZ2FtZS5kcmF3KCk7XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NwZWVkXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBlID0+IHtcbiAgICBjb25zdCBkZWdQZXJGcmFtZSA9IHBhcnNlRmxvYXQoc3BlZWRTbGlkZXIudmFsdWUpICoqIDI7XG4gICAgY29uc3QgcmFkaWFuc1BlckZyYW1lID0gZGVnUGVyRnJhbWUgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgY29uc3QgdHJ1bmNhdGVkID0gTWF0aC5mbG9vcihkZWdQZXJGcmFtZSAqIDEwMDApIC8gMTAwMDtcbiAgICBzcGVlZFRleHRFbGVtZW50LmlubmVyVGV4dCA9IGAke3RydW5jYXRlZH1gO1xuICAgIGdhbWUuc2V0U3BlZWQocmFkaWFuc1BlckZyYW1lKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=