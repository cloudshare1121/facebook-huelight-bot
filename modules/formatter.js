"use strict";

let moment = require("moment"),
    numeral = require("numeral");

exports.formatLights = lights => {
    let elements = [];
    lights.forEach(lamp => {
        var device = lamp.get("Device_Type__c");
        console.log("Device_Type__c: "+device)
        if(device=="Lights"){
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
                        {
                            "type": "postback",
                            "title": "Turn Red",
                            "payload": "allred," + lamp.getId()
                        },
                    ]
                })
            }
            if(device=="Thermostat"){
                elements.push({
                    title: lamp.get("Title__c"),                
                    "image_url": lamp.get("Picture__c"),
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Home",
                            "payload": "home," + lamp.getId()
                        },
                        {
                            "type": "postback",
                            "title": "Away",
                            "payload": "away," + lamp.getId()
                        },                         
                    ]
                })
            }
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

exports.confirmRequest = lights => {
    let elements = [];            
        
		elements.push({  
			title: ""),
			"buttons": [
				{
					"type": "postback",
					"title": "Yes",
					"payload": "alloff,"
				},
				{
					"type": "postback",
					"title": "No",
					//"payload": "alloff," + lamp.getId()
				},  
			]
		})

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


//exports.confirmRequest = confirmRequest;
