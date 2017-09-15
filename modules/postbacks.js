"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

exports.allon = (sender, values) => {
    let hueId = values[1];
    let hueMessage = values[0];
     
    messenger.getUserInfo(sender).then(response => { 
        console.log('DEBUG: response: '+response.length);    
    console.log('DEBUG: response0: '+response[0]);    
    console.log('DEBUG: response1: '+response[1]);   
        salesforce.createHueRequest(response.first_name,response.last_name,sender, hueMessage).then(() => {
            messenger.send({text: `Okay, ${response.first_name}, turning your lights on.`}, sender);
        });
    });
};

exports.alloff = (sender, values) => {
    let hueMessage = values[0];
    messenger.getUserInfo(sender).then(response => {
        salesforce.createHueRequest(response.first_name,response.last_name,sender, hueMessage).then(() => {
            messenger.send({text: `Okay, ${response.first_name}, turning your lights off.`}, sender);
        });
    });
};

exports.allred = (sender, values) => {
    let hueMessage = values[0];
    messenger.getUserInfo(sender).then(response => {
        salesforce.createHueRequest(response.first_name,response.last_name,sender, hueMessage).then(() => {
            messenger.send({text: `Wow! ${response.first_name}, that's romantic and cosy :) There you go, all red for you.`}, sender);
        });
    });
};

exports.random = (sender, values) => {   
    let hueMessage = values[0];
    messenger.getUserInfo(sender).then(response => {
        salesforce.createHueRequest(response.first_name,response.last_name,sender, hueMessage).then(() => {
            messenger.send({text: `Thanks, ${response.first_name}. Finally, I get to choose the mood for you ;)`}, sender);
        });
    });
};



