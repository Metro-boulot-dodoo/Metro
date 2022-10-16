"use strict";
// source code for the backend
exports.__esModule = true;
var File_1 = require("./File/File");
var getFile = function (fileName) {
    var file = File_1.File.read(fileName);
    console.log(file);
};
getFile('public/data/metro.txt');
