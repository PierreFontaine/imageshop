/*
 * Authoring.js
 */

'use strict';

var Authoring = function () {
    this._author = Authoring.Default_author;
    swal({
        showConfirmButton: false,
        title: 'Application',
        text: 'UV_mapping_three.js',
        timer: 2000
    });
};

Authoring.prototype.get = function () {
    return this._author;
};

Authoring.prototype.set = function (author) {
    this._author = author;
};

/** Browserify */
// Note: useless when using 'browserify-shim':
//module.exports = Authoring;
/** End of Browserify */

