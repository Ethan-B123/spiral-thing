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

var Game = /** @class */ (function () {
    function Game(canvas, displayRadius, rotFactor, rotSpeed, ringCount, currentAng) {
        if (currentAng === void 0) { currentAng = 0; }
        this.canvas = canvas;
        this.looping = false;
        this.forward = true;
        this.loop = this.loop.bind(this);
        this.ringGroup = new _RingGroup__WEBPACK_IMPORTED_MODULE_0__["default"](displayRadius, rotFactor, rotSpeed, ringCount, currentAng);
        this.play();
    }
    Game.prototype.setAngle = function (angle) {
        this.ringGroup.setAngle(angle);
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
    };
    Game.prototype.draw = function () {
        this.ringGroup.draw(this.canvas);
    };
    Game.prototype.loop = function () {
        this.frame = requestAnimationFrame(this.loop);
        this.tick();
        this.draw();
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
        ctx.strokeStyle = "#0005";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = "#f003";
        ctx.beginPath();
        ctx.arc(this.pointPos.x, this.pointPos.y, 2, 0, Math.PI * 2);
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
        this.createRings();
    }
    Object.defineProperty(RingGroup.prototype, "currentAng", {
        get: function () {
            return this._currentAng;
        },
        enumerable: true,
        configurable: true
    });
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
    RingGroup.prototype.draw = function (canvas) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.rings.forEach(function (ring) { return ring.draw(ctx); });
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(300, 300);
        this.rings
            .map(function (ring) { return ring.pointPos; })
            .forEach(function (_a) {
            var x = _a.x, y = _a.y;
            ctx.lineTo(x, y);
        });
        ctx.moveTo(300, 300);
        ctx.closePath();
        ctx.strokeStyle = "#000f";
        ctx.stroke();
        ctx.restore();
    };
    RingGroup.prototype.createRings = function (newRingCount) {
        if (newRingCount === void 0) { newRingCount = this.ringCount; }
        this.ringCount = newRingCount;
        this.rings = [];
        for (var i = 1; i <= this.ringCount; i++) {
            var radius = (i / this.ringCount) * this.displayRadius;
            var rotationFactor = (i / this.ringCount) * this.rotFactor;
            this.rings.push(new _Ring__WEBPACK_IMPORTED_MODULE_0__["default"](radius, rotationFactor, { x: 300, y: 300 }));
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
var RING_COUNT = 100;
var ROT_FACTOR = 1; // turns out this is dumb
var ROT_SPEED = Math.PI / 180;
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.querySelector("canvas");
    var game = new _Game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, DISPLAY_RADIUS, ROT_FACTOR, ROT_SPEED, RING_COUNT, 0);
    var input = document.querySelector("#text");
    document.querySelector("#set-angle").addEventListener("submit", function (e) {
        e.preventDefault();
        var value = parseFloat(input.value) * Math.PI * 2;
        if (isNaN(value)) {
            input.value = "";
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
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JpbmdHcm91cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQW9DO0FBRXBDO0lBS0UsY0FDVSxNQUF5QixFQUNqQyxhQUFxQixFQUNyQixTQUFpQixFQUNqQixRQUFnQixFQUNoQixTQUFpQixFQUNqQixVQUFzQjtRQUF0QiwyQ0FBc0I7UUFMZCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUwzQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFXOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJ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SSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IFJpbmdHcm91cCBmcm9tIFwiLi9SaW5nR3JvdXBcIjtcblxuY2xhc3MgR2FtZSB7XG4gIHByaXZhdGUgbG9vcGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGZvcndhcmQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIGZyYW1lOiBudW1iZXI7XG4gIHByaXZhdGUgcmluZ0dyb3VwOiBSaW5nR3JvdXA7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICBkaXNwbGF5UmFkaXVzOiBudW1iZXIsXG4gICAgcm90RmFjdG9yOiBudW1iZXIsXG4gICAgcm90U3BlZWQ6IG51bWJlcixcbiAgICByaW5nQ291bnQ6IG51bWJlcixcbiAgICBjdXJyZW50QW5nOiBudW1iZXIgPSAwXG4gICkge1xuICAgIHRoaXMubG9vcCA9IHRoaXMubG9vcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmluZ0dyb3VwID0gbmV3IFJpbmdHcm91cChcbiAgICAgIGRpc3BsYXlSYWRpdXMsXG4gICAgICByb3RGYWN0b3IsXG4gICAgICByb3RTcGVlZCxcbiAgICAgIHJpbmdDb3VudCxcbiAgICAgIGN1cnJlbnRBbmdcbiAgICApO1xuICAgIHRoaXMucGxheSgpO1xuICB9XG5cbiAgc2V0QW5nbGUoYW5nbGU6IG51bWJlcikge1xuICAgIHRoaXMucmluZ0dyb3VwLnNldEFuZ2xlKGFuZ2xlKTtcbiAgfVxuXG4gIHJldmVyc2UoKSB7XG4gICAgdGhpcy5mb3J3YXJkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMubG9vcGluZykgcmV0dXJuO1xuICAgIHRoaXMubG9vcGluZyA9IHRydWU7XG4gICAgdGhpcy5mcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLmZvcndhcmQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmxvb3BpbmcpIHJldHVybjtcbiAgICB0aGlzLmxvb3BpbmcgPSB0cnVlO1xuICAgIHRoaXMuZnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLmxvb3BpbmcpIHtcbiAgICAgIHRoaXMubG9vcGluZyA9IGZhbHNlO1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9vcGluZyA9IHRydWU7XG4gICAgICB0aGlzLmZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcCk7XG4gICAgfVxuICB9XG5cbiAgdGljaygpIHtcbiAgICBpZiAodGhpcy5mb3J3YXJkKSB7XG4gICAgICB0aGlzLnJpbmdHcm91cC50aWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmluZ0dyb3VwLnVudGljaygpO1xuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhpcy5yaW5nR3JvdXAuZHJhdyh0aGlzLmNhbnZhcyk7XG4gIH1cblxuICBwcml2YXRlIGxvb3AoKSB7XG4gICAgdGhpcy5mcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApO1xuICAgIHRoaXMudGljaygpO1xuICAgIHRoaXMuZHJhdygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJpbnRlcmZhY2UgdmVjdG9yIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59XG5cbmNsYXNzIFJpbmcge1xuICBjdXJyZW50QW5nOiBudW1iZXIgPSAwO1xuICBwb2ludFBvczogdmVjdG9yID0geyB4OiAwLCB5OiAwIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJhZGl1czogbnVtYmVyLFxuICAgIHB1YmxpYyByb3RhdGlvbkZhY3RvcjogbnVtYmVyLFxuICAgIHB1YmxpYyBjZW50ZXI6IHZlY3RvclxuICApIHtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmN1cnJlbnRBbmcpO1xuICB9XG5cbiAgdXBkYXRlKG5ld0FuZzogbnVtYmVyKTogdmVjdG9yIHtcbiAgICB0aGlzLmN1cnJlbnRBbmcgPSBuZXdBbmc7XG4gICAgY29uc3Qgcm90YXRlZEFuZyA9IG5ld0FuZyAqIHRoaXMucm90YXRpb25GYWN0b3I7XG4gICAgY29uc3QgeCA9IE1hdGguY29zKHJvdGF0ZWRBbmcpICogdGhpcy5yYWRpdXMgKyB0aGlzLmNlbnRlci54O1xuICAgIGNvbnN0IHkgPSBNYXRoLnNpbihyb3RhdGVkQW5nKSAqIHRoaXMucmFkaXVzICsgdGhpcy5jZW50ZXIueTtcbiAgICB0aGlzLnBvaW50UG9zID0geyB4LCB5IH07XG4gICAgcmV0dXJuIHsgeCwgeSB9O1xuICB9XG5cbiAgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwNVwiO1xuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHRoaXMuY2VudGVyLngsIHRoaXMuY2VudGVyLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmMDAzXCI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy5wb2ludFBvcy54LCB0aGlzLnBvaW50UG9zLnksIDIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmluZzsiLCJpbXBvcnQgUmluZyBmcm9tIFwiLi9SaW5nXCI7XG5cbmNsYXNzIFJpbmdHcm91cCB7XG4gIHByaXZhdGUgcmluZ3M6IFJpbmdbXSA9IFtdO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpc3BsYXlSYWRpdXM6IG51bWJlcixcbiAgICBwcml2YXRlIHJvdEZhY3RvcjogbnVtYmVyLFxuICAgIHByaXZhdGUgcm90U3BlZWQ6IG51bWJlcixcbiAgICBwcml2YXRlIHJpbmdDb3VudDogbnVtYmVyLFxuICAgIHByaXZhdGUgX2N1cnJlbnRBbmc6IG51bWJlciA9IDBcbiAgKSB7XG4gICAgdGhpcy5jcmVhdGVSaW5ncygpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRBbmcgKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50QW5nO1xuICB9XG5cbiAgdGljaygpIHtcbiAgICB0aGlzLl9jdXJyZW50QW5nICs9IHRoaXMucm90U3BlZWQ7XG4gICAgdGhpcy51cGRhdGVSaW5ncygpO1xuICB9XG5cbiAgdW50aWNrKCkge1xuICAgIHRoaXMuX2N1cnJlbnRBbmcgLT0gdGhpcy5yb3RTcGVlZDtcbiAgICB0aGlzLnVwZGF0ZVJpbmdzKCk7XG4gIH1cblxuICBzZXRSaW5nQ291bnQobmV3UmluZ0NvdW50OiBudW1iZXIpIHtcbiAgICB0aGlzLmNyZWF0ZVJpbmdzKG5ld1JpbmdDb3VudCk7XG4gICAgdGhpcy51cGRhdGVSaW5ncygpO1xuICB9XG5cbiAgc2V0QW5nbGUobmV3QW5nbGVSYWQ6IG51bWJlcikge1xuICAgIHRoaXMuX2N1cnJlbnRBbmcgPSBuZXdBbmdsZVJhZDtcbiAgICB0aGlzLnVwZGF0ZVJpbmdzKCk7XG4gIH1cblxuICBkcmF3KGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLnJpbmdzLmZvckVhY2gocmluZyA9PiByaW5nLmRyYXcoY3R4KSk7XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDMwMCwgMzAwKTtcbiAgICB0aGlzLnJpbmdzXG4gICAgICAubWFwKHJpbmcgPT4gcmluZy5wb2ludFBvcylcbiAgICAgIC5mb3JFYWNoKCh7IHgsIHkgfSkgPT4ge1xuICAgICAgICBjdHgubGluZVRvKHgsIHkpO1xuICAgICAgfSk7XG4gICAgY3R4Lm1vdmVUbygzMDAsIDMwMCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMGZcIjtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUmluZ3MobmV3UmluZ0NvdW50OiBudW1iZXIgPSB0aGlzLnJpbmdDb3VudCkge1xuICAgIHRoaXMucmluZ0NvdW50ID0gbmV3UmluZ0NvdW50O1xuICAgIHRoaXMucmluZ3MgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnJpbmdDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCByYWRpdXMgPSAoaSAvIHRoaXMucmluZ0NvdW50KSAqIHRoaXMuZGlzcGxheVJhZGl1cztcbiAgICAgIGNvbnN0IHJvdGF0aW9uRmFjdG9yID0gKGkgLyB0aGlzLnJpbmdDb3VudCkgKiB0aGlzLnJvdEZhY3RvcjtcbiAgICAgIHRoaXMucmluZ3MucHVzaChuZXcgUmluZyhyYWRpdXMsIHJvdGF0aW9uRmFjdG9yLCB7IHg6IDMwMCwgeTogMzAwIH0pKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVJpbmdzKCkge1xuICAgIHRoaXMucmluZ3MuZm9yRWFjaChyaW5nID0+IHJpbmcudXBkYXRlKHRoaXMuX2N1cnJlbnRBbmcpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSaW5nR3JvdXA7XG4iLCIvLyBodHRwczovL3d3dy5yZWRkaXQuY29tL3IvcGVyZmVjdGxvb3BzL2NvbW1lbnRzL2J6YmdoNC9pX2NhbnRfc3RvcF93YXRjaGluZy9cblxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xuXG5jb25zdCBESVNQTEFZX1JBRElVUyA9IDI1MDtcbmNvbnN0IFJJTkdfQ09VTlQgPSAxMDA7XG5jb25zdCBST1RfRkFDVE9SID0gMTsgLy8gdHVybnMgb3V0IHRoaXMgaXMgZHVtYlxuY29uc3QgUk9UX1NQRUVEID0gTWF0aC5QSSAvIDE4MDtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpO1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoXG4gICAgY2FudmFzLFxuICAgIERJU1BMQVlfUkFESVVTLFxuICAgIFJPVF9GQUNUT1IsXG4gICAgUk9UX1NQRUVELFxuICAgIFJJTkdfQ09VTlQsXG4gICAgMFxuICApO1xuXG4gIGNvbnN0IGlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZXh0XCIpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NldC1hbmdsZVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB2YWx1ZSA9IHBhcnNlRmxvYXQoaW5wdXQudmFsdWUpICogTWF0aC5QSSAqIDI7XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgaW5wdXQudmFsdWUgPSBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBnYW1lLnNldEFuZ2xlKHZhbHVlKTtcbiAgICAgIGdhbWUuZHJhdygpO1xuICAgIH1cbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUucGxheSgpO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXVzZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUucGF1c2UoKTtcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmV2ZXJzZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUucmV2ZXJzZSgpO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aWNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZ2FtZS50aWNrKCk7XG4gICAgZ2FtZS5kcmF3KCk7XG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9