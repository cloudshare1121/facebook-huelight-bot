"use strict";

let moment = require("moment"),
    numeral = require("numeral");

exports.formatLights = lights => {
    let elements = [];
    lights.forEach(lamp => {
            elements.push({
                title: lamp.get("Title__c"),                
                "image_url": lamp.get("Picture__c"),
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Turn On",
                        "payload": "allon," + lamp.getId()
                    },
                    {
                        "type": "postback",
                        "title": "Turn Off",
                        "payload": "alloff," + lamp.getId()
                    },                    
                ]
            })
        }
    );
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};

