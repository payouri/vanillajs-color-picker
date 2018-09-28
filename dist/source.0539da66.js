// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"source.js":[function(require,module,exports) {
"use strict";

require("./style.scss");

document.addEventListener('DOMContentLoaded', function (_) {
  var colorPicker = document.querySelector('.color--picker'),
      inputs = colorPicker.querySelectorAll('.color--picker--input'),
      areas = colorPicker.querySelectorAll('.color--picker--visualizer--area'),
      saveBtn = colorPicker.querySelector('.color--picker--save--button'),
      info = colorPicker.querySelector('.color--picker--user--info'),
      states = {
    errUp: false,
    lastError: '',
    lastColor: inputs[0].value,
    selectedArea: false
  },
      exp = /^(#?([a-f\d]{3}|[a-f\d]{6})|rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)|rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0?\.\d|1(\.0)?)\)|hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d)\s?,\s?(0|100|\d{1,2})%\s?,\s?(0|100|\d{1,2})%\)|hsla\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d)\s?,\s?(0|100|\d{1,2})%\s?,\s?(0|100|\d{1,2})%\s?,\s?(0?\.\d|1(\.0)?)\))$/;
  inputs[1].value = inputs[0].value;
  areas.forEach(function (area) {
    // area.style.backgroundColor = '#333333';
    var bgColor = window.getComputedStyle(area, null).getPropertyValue('background-color');
    console.log(bgColor);
    bgColor = rgbToHex(bgColor);
    area.setAttribute('data-color', bgColor);
  });
  var delay = '';

  function chooseTimeout(fun, nbr) {
    return setTimeout(fun, nbr);
  }

  function displayMessage(str) {
    if (str !== '') {
      var toggleMessage = function toggleMessage() {
        info.classList.toggle('shown', false);
        states.errUp = false;
      };

      if (delay && states.errUp === true) {
        clearTimeout(delay);
      }

      delay = chooseTimeout(toggleMessage, 3000);
      info.innerText = str;
      info.classList.toggle('shown', true);
      states.errUp = true;
    }
  }

  console.log(hslToHex('hsl(200, 10%, 20%)'));

  function hslToHex(hslColor) {
    hslColor = hslColor.replace(/\D/g, ' ');
    hslColor = hslColor.split(' ');
    hslColor = hslColor.filter(function (value) {
      return value !== '';
    });
    console.log(hslColor);
    var h = hslColor[0],
        s = hslColor[1],
        l = hslColor[2],
        r,
        g,
        b;
    h /= 360;
    s /= 100;
    l /= 100;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    var toHex = function toHex(x) {
      var hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return "#".concat(toHex(r)).concat(toHex(g)).concat(toHex(b));
  }

  function rgbToHex(rgbColor) {
    rgbColor = rgbColor.replace(/\D/g, ' ');
    rgbColor = rgbColor.split(' ');
    rgbColor = rgbColor.filter(function (value) {
      return value !== '';
    });
    var r = rgbColor[0],
        g = rgbColor[1],
        b = rgbColor[2];
    var hexStr = '#',
        err = '';

    if (r > 0 && r <= 255) {
      r = Number(r);
      if (r < 16) hexStr += "0";
      hexStr += r.toString(16);

      if (g > 0 && g <= 255) {
        g = Number(g);
        if (g < 16) hexStr += "0";
        hexStr += g.toString(16);

        if (b > 0 && b <= 255) {
          b = Number(b);
          if (b < 16) hexStr += "0";
          hexStr += b.toString(16);
        } else {
          err = 'blue value is invalid';
        }
      } else {
        err = 'green value is invalid';
      }
    } else {
      err = 'red value is invalid';
    }

    if (err) displayMessage(err);
    return hexStr;
  }

  function setUpListeners() {
    inputs[1].addEventListener('change', function (e) {
      var msg = '';

      if (!states.validTextInput) {
        msg = "Please enter a valid hex, rgb, hsl color.";
      } else {// if(states.selectedArea) {
        //   states.selectedArea.style.backgroundColor = inputs[0].value;
        //   states.selectedArea.setAttribute('data-color', inputs[0].value);
        //   msg = 'Color saved :)';
        // }else {
        //   msg = 'Please select an area';
        // }
        // states.lastColor = inputs[1].value = inputs[0].value;
      }

      displayMessage(msg);
    });
    inputs[1].addEventListener('blur', function (e) {
      e.target.style.outline = '';
    }, false);
  }

  function hex3ToHex6(hexStr) {
    hexStr = '#' + hexStr.substr(1, 1) + hexStr.substr(1, 1) + hexStr.substr(2, 1) + hexStr.substr(2, 1) + hexStr.substr(3, 1) + hexStr.substr(3, 1);
    return hexStr;
  } // console.log(rgbToHex(255, 20, 30));


  inputs.forEach(function (input, index, inputs) {
    input.addEventListener('input', function (e) {
      if (input.getAttribute('type') === 'text') {
        if (input.value !== '' && exp.exec(input.value) !== null) {
          // console.log(input.value);
          var color = input.value,
              msg;

          if (color.substr(0, 1) === '#') {
            if (color.length === 4) {
              color = hex3ToHex6(color);
            }

            inputs[0].value = color;
            inputs[1].style.outline = '1px solid green';
          } // rgba(1,1,1,1)


          if (color.substr(0, 3) === 'rgb' && color.substr(3, 1) !== 'a') {
            var hexColor = rgbToHex(color);
            inputs[0].value = hexColor;
            inputs[1].style.outline = '1px solid green';
          } else if (color.substr(0, 3) === 'hsl' && color.substr(3, 1) !== 'a') {
            var _hexColor = hslToHex(color);

            inputs[0].value = _hexColor;
            inputs[1].style.outline = '1px solid green';
          } else if (color.substr(0, 4) === 'rgba') {
            var _hexColor2 = rgbToHex(color);

            console.log(_hexColor2);
            inputs[0].value = _hexColor2;
            inputs[1].style.outline = '1px solid green';
          } else if (color.substr(0, 4) === 'hsla') {
            console.log(color);
            color = color.replace(/\s+/g, '');
            inputs[1].style.outline = '1px solid green';
          }

          states.validTextInput = true;
        } else {
          states.validTextInput = false;
          inputs[1].style.outline = '1px solid red';
        }
      }

      if (input.getAttribute('type') === 'color') {
        inputs[1].value = inputs[0].value;
      }
    }, false);
  });

  function unselect(e) {
    if (states.selectedArea && !e.path.includes(states.selectedArea) && !e.path.includes(inputs[0]) && !e.path.includes(inputs[1]) && !e.path.includes(saveBtn)) {
      console.log(e.path);
      states.selectedArea.classList.toggle('selected', false);
      states.selectedArea = false;
    } else {
      console.log(e.path);
    }
  }

  areas.forEach(function (area, index, areas) {
    area.addEventListener('click', function (e) {
      states.selectedArea = e.target;
      areas.forEach(function (area) {
        area.classList.toggle('selected', false);
      });
      area.classList.add('selected');
    }, false);
  });
  window.addEventListener('click', unselect, false);
  saveBtn.addEventListener('click', function (e) {
    var msg = '';

    if (states.selectedArea) {
      states.selectedArea.style.backgroundColor = inputs[0].value;
      states.selectedArea.setAttribute('data-color', inputs[0].value);
      msg = 'Color saved :)';
    } else {
      msg = 'Please select an area';
    }

    states.lastColor = inputs[1].value = inputs[0].value;
    displayMessage(msg);
    console.log(states);
  });
  setUpListeners(); // console.log(inputs);
});
},{"./style.scss":"style.scss"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "4377" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","source.js"], null)
//# sourceMappingURL=/source.0539da66.map