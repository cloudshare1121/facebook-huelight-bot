"use strict";

let nforce = require('nforce'),

    SF_CLIENT_ID = process.env.SF_CLIENT_ID,
    SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET,
    SF_USER_NAME = process.env.SF_USER_NAME,
    SF_PASSWORD = process.env.SF_PASSWORD;

let org = nforce.createConnection({
    clientId: SF_CLIENT_ID,
    clientSecret: SF_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/oauth/_callback',
    mode: 'single',
    autoRefresh: true
});

let login = () => {
    org.authenticate({username: SF_USER_NAME, password: SF_PASSWORD}, err => {
        if (err) {
            console.error("Authentication error");
            console.error(err);
        } else {
            console.log("Authentication successful");
        }
    });
};

let findLights = (params) => {
    let where = "";
    if (params) {
        let parts = [];
        if (params.id) parts.push(`id='${params.id}'`);        
        if (parts.length>0) {
            where = "WHERE " + parts.join(' AND ');
        }
    }
    return new Promise((resolve, reject) => {
        let q = `SELECT id,
                    title__c,                    
                    picture__c
                FROM Hue_Light__c
                ${where}
                LIMIT 5`;
	    console.log('q: '+q);
        org.query({query: q}, (err, resp) => {
            if (err) {
                reject("An error as occurred");
		    //resolve(err);
            } else {
		console.log('Records retrieved: '+resp.records);
                resolve(resp.records);
            }
        });
    });

};
 

let createHueRequest = (firstName, lastName, customerId, message, current_location) => {

    return new Promise((resolve, reject) => {
        let c = nforce.createSObject('Hue_Message__c');
        c.set('first_name__c', firstName);
	c.set('last_name__c', lastName);
        c.set('Description__c', "Facebook id: " + customerId);
        c.set('Device_Source__c', 'Facebook Bot: '+customerId);
        c.set('Message__c', message);        
	c.set('GPS_Location__c', 'Brussels');

        org.insert({sobject: c}, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating a case");
            } else {
                resolve(c);
            }
        });
    });

};

login();

exports.org = org;
exports.findLights = findLights;
exports.createHueRequest = createHueRequest;
