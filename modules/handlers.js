"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

exports.searchLights = (sender) => {
    messenger.send({text: `Looking for all the devices that you can operate...`}, sender);
    salesforce.findLights().then(lights => {
        messenger.send(formatter.formatLights(lights), sender);
    });
};


exports.hi = (sender) => {
    messenger.getUserInfo(sender).then(response => {
        messenger.send({text: `Hi, ${response.first_name}!`}, sender);
    });
};

exports.hello = (sender) => {
    messenger.getUserInfo(sender).then(response => {
        messenger.send({text: `Hello, ${response.first_name}!`}, sender);
    });
};

exports.help = (sender) => {
    messenger.send({text: `You can ask me questions like "Find my devices", "Search device" `}, sender);
};
