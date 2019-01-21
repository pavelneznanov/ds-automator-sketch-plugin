var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages.js":
/*!**********************!*\
  !*** ./src/pages.js ***!
  \**********************/
/*! exports provided: pages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pages", function() { return pages; });
function pages(context) {
  var doc = context.document;
  var pages = doc.pages();
  var selection = context.selection;

  var ui = __webpack_require__(/*! sketch/ui */ "sketch/ui");

  var checkCyrillic;
  pages.forEach(function (page) {
    var pageName = page.name();
    var cyrillicRegex = /[а-яА-Я]/g;

    if (pageName.search(cyrillicRegex) != -1) {
      checkCyrillic = true;
    }
  });

  if (checkCyrillic) {
    ui.alert('Attention!', 'Page names should not contain Cyrillic characters');
  } else {
    pages.sort(function (a, b) {
      var pageA = a.name().toLowerCase();
      var pageB = b.name().toLowerCase();
      var numberFilter = /(\d+)-([a-zA-Zа-яА-Я]+|\d+)-*/g;

      if (pageA.search(numberFilter) == -1 || pageB.search(numberFilter) == -1) {
        if (pageA < pageB) {
          return -1;
        }

        if (pageA > pageB) {
          return 1;
        }

        return 0;
      }
    });
    pages.forEach(function (page, i) {
      var pageName = page.name();
      var docRegex = /documentation/g;
      var comRegex = /components|Symbols/g;

      if (pageName !== '1-components') {
        if (pageName.search(comRegex) != -1) {
          var pageMemo = pages[i];
          pageMemo.setName('1-components');
          pages.splice(i, 1);
          pages.unshift(pageMemo);
        }
      }
    });
    pages.forEach(function (page, i) {
      var pageName = page.name();
      pageName = pageName.trim().replace(' ', '-');
      pageName = pageName.replace(/(_+)|(-)|(\s)/g, '-');
      pageName = pageName.replace(/-+/g, '-');
      pageName = pageName.toLowerCase();
      var numberFilter = /(\d+)-([a-zA-Zа-яА-Я]+|\d+)-*/g;

      if (pageName.search(numberFilter) == -1) {
        page.setName(i + 1 + '-' + pageName);
      }
    });
    doc.showMessage('All pages has been formatted');
  }
}

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['pages'] = __skpm_run.bind(this, 'pages');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=pages.js.map