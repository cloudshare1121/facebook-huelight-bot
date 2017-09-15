"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

exports.allon = (sender, values) => {
    let hueId = values[1];
    console.log('DEBUG: hueid: '+hueId);
    messenger.getUserInfo(sender).then(response => {
        console.log('DEBUG: response: '+response);
        console.log('DEBUG: sender: '+sender);
        salesforce.createHueRequest(response.first_name + " " + response.first_name,hueId, response.message, response.current_location).then(() => {
            messenger.send({text: `Okay, ${response.first_name}, turning your lights on.`}, sender);
        });
    });
};

exports.alloff = (sender, values) => {
    
    messenger.getUserInfo(sender).then(response => {
        salesforce.createHueRequest(response.first_name + " " + response.first_name, sender).then(() => {
            messenger.send({text: `Okay, ${response.first_name}, turning your lights off.`}, sender);
        });
    });
};

exports.allred = (sender, values) => {
    
    messenger.getUserInfo(sender).then(response => {
        salesforce.createHueRequest(response.first_name + " " + response.first_name, sender).then(() => {
            messenger.send({text: `Wow! ${response.first_name}, that's romantic and cosy :) There you go, all red for you.`}, sender);
        });
    });
};

exports.random = (sender, values) => {    
    messenger.getUserInfo(sender).then(response => {
        salesforce.createHueRequest(response.first_name + " " + response.first_name, sender).then(() => {
            messenger.send({text: `Thanks, ${response.first_name}. Finally, I get to choose the mood for you ;)`}, sender);
        });
    });
};



