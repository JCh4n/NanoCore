/*******************************************************************************

    uBlock Origin - a browser extension to block requests.
    Copyright (C) 2017 The uBlock Origin authors

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

'use strict';

/* global HTMLDocument, XMLDocument */

// For background page, auxiliary pages, and content scripts.

/******************************************************************************/

// https://bugzilla.mozilla.org/show_bug.cgi?id=1408996#c9
var vAPI = window.vAPI; // jshint ignore:line

// https://github.com/chrisaljoudi/uBlock/issues/464
// https://github.com/chrisaljoudi/uBlock/issues/1528
//   A XMLDocument can be a valid HTML document.

// https://github.com/gorhill/uBlock/issues/1124
//   Looks like `contentType` is on track to be standardized:
//   https://dom.spec.whatwg.org/#concept-document-content-type

// https://forums.lanik.us/viewtopic.php?f=64&t=31522
//   Skip text/plain documents.

if (
    (document instanceof HTMLDocument ||
      document instanceof XMLDocument &&
      document.createElement('div') instanceof HTMLDivElement
    ) &&
    (/^image\/|^text\/plain/.test(document.contentType || '') === false)
) {
    vAPI = window.vAPI = vAPI instanceof Object && vAPI.uBO === true
        ? vAPI
        : { uBO: true };
}

/******************************************************************************/

// Patch 2018-01-05: Add compatibility shims

// Works fine so far, must not delete 'browser' as it craches Microsoft's code
// Might have some problems with code that depends on the difference between
// 'chrome' and 'browser'
self.edge = self.chrome || {};
self.chrome = self.browser;

// Edge does not accept 'fullwide' and inserts weird Unicode character that
// breaks the syntax highlighter
(function() {
    var _toLocaleString = Date.prototype.toLocaleString;
    Date.prototype.toLocaleString = function () {
        var args = Array.prototype.slice.call(arguments);
        if (args[0] === 'fullwide') {
            args.shift();
        }
        return _toLocaleString.apply(this, args).replace(/\u200E|\u200F/g, '');
    };
})();

// Edge returns a weird DOM object instead of something iterable
(function() {
    var _querySelectorAll = document.querySelectorAll;
    document.querySelectorAll = function () {
        var result = _querySelectorAll.apply(this, arguments);
        return Array.prototype.slice.call(result);
    };
})();
(function() {
    var _querySelectorAll = Element.prototype.querySelectorAll;
    Element.prototype.querySelectorAll = function () {
        var result = _querySelectorAll.apply(this, arguments);
        return Array.prototype.slice.call(result);
    };
})();

/******************************************************************************/
