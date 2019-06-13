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
    Game.prototype.setSpeed = function (radiansPerFrame) {
        this.ringGroup.setRotSpeed(radiansPerFrame);
    };
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
    RingGroup.prototype.setRotSpeed = function (newRotSpeed) {
        this.rotSpeed = newRotSpeed;
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
        for (var i = 1; i < this.ringCount; i++) {
            var radius = (i / this.ringCount) * this.displayRadius;
            var rotationFactor = // (i / this.ringCount) * this.rotFactor;
             ((this.ringCount - i) / this.ringCount) * this.rotFactor;
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
var ROT_SPEED = Math.PI / 22.5;
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.querySelector("canvas");
    var game = new _Game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, DISPLAY_RADIUS, ROT_FACTOR, ROT_SPEED, RING_COUNT, 0);
    var textInput = document.querySelector("#text");
    var slider = document.querySelector("#speed");
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
        var degPerFrame = parseFloat(slider.value);
        var radiansPerFrame = degPerFrame * (Math.PI / 180);
        game.setSpeed(radiansPerFrame);
    });
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JpbmdHcm91cC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQW9DO0FBRXBDO0lBS0UsY0FDVSxNQUF5QixFQUNqQyxhQUFxQixFQUNyQixTQUFpQixFQUNqQixRQUFnQixFQUNoQixTQUFpQixFQUNqQixVQUFzQjtRQUF0QiwyQ0FBc0I7UUFMZCxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUwzQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFXOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJ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QyxPQUFPLEVBQUU7UUFDekQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUMzRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDSCxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUN4RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBQztRQUMzRCxJQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM1QyxJQUFNLGVBQWUsR0FBRyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IFJpbmdHcm91cCBmcm9tIFwiLi9SaW5nR3JvdXBcIjtcblxuY2xhc3MgR2FtZSB7XG4gIHByaXZhdGUgbG9vcGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGZvcndhcmQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIGZyYW1lOiBudW1iZXI7XG4gIHByaXZhdGUgcmluZ0dyb3VwOiBSaW5nR3JvdXA7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgICBkaXNwbGF5UmFkaXVzOiBudW1iZXIsXG4gICAgcm90RmFjdG9yOiBudW1iZXIsXG4gICAgcm90U3BlZWQ6IG51bWJlcixcbiAgICByaW5nQ291bnQ6IG51bWJlcixcbiAgICBjdXJyZW50QW5nOiBudW1iZXIgPSAwXG4gICkge1xuICAgIHRoaXMubG9vcCA9IHRoaXMubG9vcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMucmluZ0dyb3VwID0gbmV3IFJpbmdHcm91cChcbiAgICAgIGRpc3BsYXlSYWRpdXMsXG4gICAgICByb3RGYWN0b3IsXG4gICAgICByb3RTcGVlZCxcbiAgICAgIHJpbmdDb3VudCxcbiAgICAgIGN1cnJlbnRBbmdcbiAgICApO1xuICAgIHRoaXMucGxheSgpO1xuICB9XG5cbiAgc2V0U3BlZWQocmFkaWFuc1BlckZyYW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLnJpbmdHcm91cC5zZXRSb3RTcGVlZChyYWRpYW5zUGVyRnJhbWUpO1xuICB9XG5cbiAgc2V0QW5nbGUoYW5nbGU6IG51bWJlcikge1xuICAgIHRoaXMucmluZ0dyb3VwLnNldEFuZ2xlKGFuZ2xlKTtcbiAgfVxuXG4gIHJldmVyc2UoKSB7XG4gICAgdGhpcy5mb3J3YXJkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMubG9vcGluZykgcmV0dXJuO1xuICAgIHRoaXMubG9vcGluZyA9IHRydWU7XG4gICAgdGhpcy5mcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApO1xuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLmZvcndhcmQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmxvb3BpbmcpIHJldHVybjtcbiAgICB0aGlzLmxvb3BpbmcgPSB0cnVlO1xuICAgIHRoaXMuZnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wKTtcbiAgfVxuXG4gIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLmxvb3BpbmcpIHtcbiAgICAgIHRoaXMubG9vcGluZyA9IGZhbHNlO1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9vcGluZyA9IHRydWU7XG4gICAgICB0aGlzLmZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcCk7XG4gICAgfVxuICB9XG5cbiAgdGljaygpIHtcbiAgICBpZiAodGhpcy5mb3J3YXJkKSB7XG4gICAgICB0aGlzLnJpbmdHcm91cC50aWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmluZ0dyb3VwLnVudGljaygpO1xuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhpcy5yaW5nR3JvdXAuZHJhdyh0aGlzLmNhbnZhcyk7XG4gIH1cblxuICBwcml2YXRlIGxvb3AoKSB7XG4gICAgdGhpcy5mcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApO1xuICAgIHRoaXMudGljaygpO1xuICAgIHRoaXMuZHJhdygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJpbnRlcmZhY2UgdmVjdG9yIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59XG5cbmNsYXNzIFJpbmcge1xuICBjdXJyZW50QW5nOiBudW1iZXIgPSAwO1xuICBwb2ludFBvczogdmVjdG9yID0geyB4OiAwLCB5OiAwIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJhZGl1czogbnVtYmVyLFxuICAgIHB1YmxpYyByb3RhdGlvbkZhY3RvcjogbnVtYmVyLFxuICAgIHB1YmxpYyBjZW50ZXI6IHZlY3RvclxuICApIHtcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmN1cnJlbnRBbmcpO1xuICB9XG5cbiAgdXBkYXRlKG5ld0FuZzogbnVtYmVyKTogdmVjdG9yIHtcbiAgICB0aGlzLmN1cnJlbnRBbmcgPSBuZXdBbmc7XG4gICAgY29uc3Qgcm90YXRlZEFuZyA9IG5ld0FuZyAqIHRoaXMucm90YXRpb25GYWN0b3I7XG4gICAgY29uc3QgeCA9IE1hdGguY29zKHJvdGF0ZWRBbmcpICogdGhpcy5yYWRpdXMgKyB0aGlzLmNlbnRlci54O1xuICAgIGNvbnN0IHkgPSBNYXRoLnNpbihyb3RhdGVkQW5nKSAqIHRoaXMucmFkaXVzICsgdGhpcy5jZW50ZXIueTtcbiAgICB0aGlzLnBvaW50UG9zID0geyB4LCB5IH07XG4gICAgcmV0dXJuIHsgeCwgeSB9O1xuICB9XG5cbiAgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZjBmMGYwXCI7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy5jZW50ZXIueCwgdGhpcy5jZW50ZXIueSwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMGZcIjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh0aGlzLnBvaW50UG9zLngsIHRoaXMucG9pbnRQb3MueSwgMSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSaW5nOyIsImltcG9ydCBSaW5nIGZyb20gXCIuL1JpbmdcIjtcblxuY2xhc3MgUmluZ0dyb3VwIHtcbiAgcHJpdmF0ZSByaW5nczogUmluZ1tdID0gW107XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGlzcGxheVJhZGl1czogbnVtYmVyLFxuICAgIHByaXZhdGUgcm90RmFjdG9yOiBudW1iZXIsXG4gICAgcHJpdmF0ZSByb3RTcGVlZDogbnVtYmVyLFxuICAgIHByaXZhdGUgcmluZ0NvdW50OiBudW1iZXIsXG4gICAgcHJpdmF0ZSBfY3VycmVudEFuZzogbnVtYmVyID0gMFxuICApIHtcbiAgICB0aGlzLmNyZWF0ZVJpbmdzKCk7XG4gIH1cblxuICBnZXQgY3VycmVudEFuZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEFuZztcbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgdGhpcy5fY3VycmVudEFuZyArPSB0aGlzLnJvdFNwZWVkO1xuICAgIHRoaXMudXBkYXRlUmluZ3MoKTtcbiAgfVxuXG4gIHVudGljaygpIHtcbiAgICB0aGlzLl9jdXJyZW50QW5nIC09IHRoaXMucm90U3BlZWQ7XG4gICAgdGhpcy51cGRhdGVSaW5ncygpO1xuICB9XG5cbiAgc2V0UmluZ0NvdW50KG5ld1JpbmdDb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5jcmVhdGVSaW5ncyhuZXdSaW5nQ291bnQpO1xuICAgIHRoaXMudXBkYXRlUmluZ3MoKTtcbiAgfVxuXG4gIHNldEFuZ2xlKG5ld0FuZ2xlUmFkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50QW5nID0gbmV3QW5nbGVSYWQ7XG4gICAgdGhpcy51cGRhdGVSaW5ncygpO1xuICB9XG5cbiAgc2V0Um90U3BlZWQobmV3Um90U3BlZWQ6IG51bWJlcikge1xuICAgIHRoaXMucm90U3BlZWQgPSBuZXdSb3RTcGVlZDtcbiAgfVxuXG4gIGRyYXcoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMucmluZ3MuZm9yRWFjaChyaW5nID0+IHJpbmcuZHJhdyhjdHgpKTtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMzAwLCAzMDApO1xuICAgIHRoaXMucmluZ3NcbiAgICAgIC5tYXAocmluZyA9PiByaW5nLnBvaW50UG9zKVxuICAgICAgLmZvckVhY2goKHsgeCwgeSB9KSA9PiB7XG4gICAgICAgIGN0eC5saW5lVG8oeCwgeSk7XG4gICAgICB9KTtcbiAgICBjdHgubW92ZVRvKDMwMCwgMzAwKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwZlwiO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSaW5ncyhuZXdSaW5nQ291bnQ6IG51bWJlciA9IHRoaXMucmluZ0NvdW50KSB7XG4gICAgdGhpcy5yaW5nQ291bnQgPSBuZXdSaW5nQ291bnQ7XG4gICAgdGhpcy5yaW5ncyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5yaW5nQ291bnQ7IGkrKykge1xuICAgICAgY29uc3QgcmFkaXVzID0gKGkgLyB0aGlzLnJpbmdDb3VudCkgKiB0aGlzLmRpc3BsYXlSYWRpdXM7XG4gICAgICBjb25zdCByb3RhdGlvbkZhY3RvciA9IC8vIChpIC8gdGhpcy5yaW5nQ291bnQpICogdGhpcy5yb3RGYWN0b3I7XG4gICAgICAgICgodGhpcy5yaW5nQ291bnQgLSBpKSAvIHRoaXMucmluZ0NvdW50KSAqIHRoaXMucm90RmFjdG9yO1xuICAgICAgdGhpcy5yaW5ncy5wdXNoKG5ldyBSaW5nKHJhZGl1cywgcm90YXRpb25GYWN0b3IsIHsgeDogMzAwLCB5OiAzMDAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUmluZ3MoKSB7XG4gICAgdGhpcy5yaW5ncy5mb3JFYWNoKHJpbmcgPT4gcmluZy51cGRhdGUodGhpcy5fY3VycmVudEFuZykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJpbmdHcm91cDtcbiIsIi8vIGh0dHBzOi8vd3d3LnJlZGRpdC5jb20vci9wZXJmZWN0bG9vcHMvY29tbWVudHMvYnpiZ2g0L2lfY2FudF9zdG9wX3dhdGNoaW5nL1xuXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9HYW1lXCI7XG5cbmNvbnN0IERJU1BMQVlfUkFESVVTID0gMjUwO1xuY29uc3QgUklOR19DT1VOVCA9IDEwMDtcbmNvbnN0IFJPVF9GQUNUT1IgPSAxOyAvLyB0dXJucyBvdXQgdGhpcyBpcyBkdW1iXG5jb25zdCBST1RfU1BFRUQgPSBNYXRoLlBJIC8gMjIuNTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpO1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoXG4gICAgY2FudmFzLFxuICAgIERJU1BMQVlfUkFESVVTLFxuICAgIFJPVF9GQUNUT1IsXG4gICAgUk9UX1NQRUVELFxuICAgIFJJTkdfQ09VTlQsXG4gICAgMFxuICApO1xuXG4gIGNvbnN0IHRleHRJbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGV4dFwiKTtcbiAgY29uc3Qgc2xpZGVyOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcGVlZFwiKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZXQtYW5nbGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHZhbHVlID0gcGFyc2VGbG9hdCh0ZXh0SW5wdXQudmFsdWUpICogTWF0aC5QSSAqIDI7XG4gICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgdGV4dElucHV0LnZhbHVlID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2FtZS5zZXRBbmdsZSh2YWx1ZSk7XG4gICAgICBnYW1lLmRyYXcoKTtcbiAgICB9XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lLnBsYXkoKTtcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGF1c2VcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lLnBhdXNlKCk7XG4gIH0pO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JldmVyc2VcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBnYW1lLnJldmVyc2UoKTtcbiAgfSk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGlja1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGdhbWUudGljaygpO1xuICAgIGdhbWUuZHJhdygpO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcGVlZFwiKS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKGUpID0+IHtcbiAgICBjb25zdCBkZWdQZXJGcmFtZSA9IHBhcnNlRmxvYXQoc2xpZGVyLnZhbHVlKVxuICAgIGNvbnN0IHJhZGlhbnNQZXJGcmFtZSA9IGRlZ1BlckZyYW1lICogKE1hdGguUEkgLyAxODApXG4gICAgZ2FtZS5zZXRTcGVlZChyYWRpYW5zUGVyRnJhbWUpXG4gIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9