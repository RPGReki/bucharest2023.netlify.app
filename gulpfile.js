var gulp = require('gulp'),
    request = require('request'),
    fs = require('fs'),
    md5 = require('md5'),
    config = require('dotenv').config();

var buildSrc = "./";

gulp.task("get-participants", function (done) {

    // set up the request with appropriate auth token and Form ID
    var url = `https://api.netlify.com/api/v1/forms/${process.env.REGISTRATION_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

    // get the data from Netlify's submissions API
    request(url, function(err, response, body){
        if(!err && response.statusCode === 200){
            console.log("Submissions found");
            var body = JSON.parse(body);
            body.sort((a,b)=>{
                if(a.created_at < b.created_at) return -1;
                if(a.created_at > b.created_at) return 1;
                return 0;
            });
            var participants = [];

            // shape the data
            for(var item in body){
                var data = body[item].data;
                var record = {
                    id: md5((data.email||'')+body[item].created_at),
                    date: body[item].created_at,
                    lang: data.lang,
                    given_name: data.given_name,
                    surname: data.surname,
                    ema_id: data.ema_id,
                    email: data.email,
                    country: data.text,
                    status: ''
                };

                participants.push(record);
            }

            // set up the request with appropriate auth token and Form ID
            var u = `https://api.netlify.com/api/v1/forms/${process.env.ADMINISTRATION_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

            // get the data from Netlify's submissions API
            request(u, function(e, r, b){
                if(!e && r.statusCode === 200){
                    console.log("Adminitration Submissions found");
                    var body = JSON.parse(b);
                    body.sort((a,b)=>{
                        if(a.created_at < b.created_at) return -1;
                        if(a.created_at > b.created_at) return 1;
                        return 0;
                    });
                    // shape the data
                    for(var item in body) {
                        var data = body[item].data;

                        var i = participants.find(x => x.id === data.id);
                        console.log('looking for ' + data.id);
                        if (undefined !== i) {
                            i.status = data.action;
                            console.log(data.id+ " set to " + data.action + ".");
                        }
                    }

                    // write our data to a file where Jekyll can get it.
                    fs.writeFile(buildSrc + "site/_data/tournaments/202405/participants.json", JSON.stringify(participants, null, 2), function(err) {
                        if(err) {
                            console.log(err);
                            done();
                        } else {
                            console.log("Registration data saved.");
                            done();
                        }
                    });
                } else {
                    // write our data to a file where Jekyll can get it.
                    fs.writeFile(buildSrc + "site/_data/tournaments/202405/participants.json", JSON.stringify(participants, null, 2), function(err) {
                        if(err) {
                            console.log(err);
                            done();
                        } else {
                            console.log("Registration data saved.");
                            done();
                        }
                    });
                }
            });
        } else {
            console.log("Couldn't get registration data from Netlify");
            done();
        }
    });
});

gulp.task("get-seminar-participants", function (done) {

    // set up the request with appropriate auth token and Form ID
    var url = `https://api.netlify.com/api/v1/forms/${process.env.SEMINAR_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

    // get the data from Netlify's submissions API
    request(url, function(err, response, body){
        if(!err && response.statusCode === 200){
            console.log("Submissions found");
            var body = JSON.parse(body);
            body.sort((a,b)=>{
                if(a.created_at < b.created_at) return -1;
                if(a.created_at > b.created_at) return 1;
                return 0;
            });
            var participants = [];

            // shape the data
            for(var item in body){
                var data = body[item].data;

                var record = {
                    id: md5((data.email||'')+body[item].created_at),
                    date: body[item].created_at,
                    lang: data.lang,
                    given_name: data.given_name,
                    surname: data.surname,
                    email: data.email,
                    status: ''
                };

                participants.push(record);
            }

            // set up the request with appropriate auth token and Form ID
            var u = `https://api.netlify.com/api/v1/forms/${process.env.SEMINAR_ADMINISTRATION_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

            // get the data from Netlify's submissions API
            request(u, function(e, r, b){
                if(!e && r.statusCode === 200){
                    console.log("Seminar Administration Submissions found");
                    var body = JSON.parse(b);
                    body.sort((a,b)=>{
                        if(a.created_at < b.created_at) return -1;
                        if(a.created_at > b.created_at) return 1;
                        return 0;
                    });
                    // shape the data
                    for(var item in body) {
                        var data = body[item].data;

                        var i = participants.find(x => x.id === data.id);
                        console.log('looking for ' + data.id);
                        if (undefined !== i) {
                            i.status = data.action;
                            console.log(data.id+ " set to " + data.action + ".");
                        }
                    }

                    // write our data to a file where Jekyll can get it.
                    fs.writeFile(buildSrc + "site/_data/tournaments/202405/seminar-participants.json", JSON.stringify(participants, null, 2), function(err) {
                        if(err) {
                            console.log(err);
                            done();
                        } else {
                            console.log("Seminar Registration data saved.");
                            done();
                        }
                    });
                }
            });
        } else {
            console.log("Couldn't get registration data from Netlify");
            done();
        }
    });
});