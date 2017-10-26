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
            /*setTimeout(function() {
                console.log('Blah blah blah blah extra-blah');
                messenger.send({text: `Hey, ${response.first_name}, no one seems to be in the room. Do you want me to switch off the lights`}, sender);                
                //messenger.send(formatter.confirmRequest('test'), sender);
                salesforce.findLights().then(lights => {
                    messenger.send(formatter.confirmRequest(lights), sender);
                });
            }, 10000);*/
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

exports.home = (sender, values) => {   
    let thermoMessage = values[0];    
    messenger.getUserInfo(sender).then(response => {        
        salesforce.createThermostatRequest(response.first_name,response.last_name,sender, thermoMessage).then(() => {
            messenger.send({text: `Hi, ${response.first_name}. Glad you are home`}, sender);
        });
    });
};

exports.away = (sender, values) => {   
    let thermoMessage = values[0];    
    messenger.getUserInfo(sender).then(response => {
        salesforce.createThermostatRequest(response.first_name,response.last_name,sender, thermoMessage).then(() => {
            messenger.send({text: `Hi, ${response.first_name}. Come back soon, I will be waiting for you.`}, sender);
        });
    });
};



