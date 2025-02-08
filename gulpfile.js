const { count } = require('console');

var gulp = require('gulp'),
    request = require('request'),
    fs = require('fs'),
    md5 = require('md5'),
    config = require('dotenv').config();

var buildSrc = "./";

gulp.task("get-comments", function (done) {

    // set up the request with appropriate auth token and Form ID
    var url = `https://api.netlify.com/api/v1/forms/${process.env.COMMENT_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

    // get the data from Netlify's submissions API
    request(url, function(err, response, body){
        if(!err && response.statusCode === 200){
            console.log("Submissions found");
            var body = JSON.parse(body);
            var comments = {};

            // shape the data
            for(var item in body){
                var data = body[item].data;

                var comment = {
                    name: data.name,
                    date: body[item].created_at,
                    ref: data.ref,
                    lang: data.lang,
                    email: data.email,
                    gravatar: md5(data.email),
                    url: data.url,
                    message: data.message
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
            fs.writeFile(buildSrc + "site/_data/comments.json", JSON.stringify(comments, null, 2), function(err) {
                if(err) {
                    console.log(err);
                    done();
                } else {
                    console.log("Comments data saved.");
                    done();
                }
            });

        } else {
            console.log("Couldn't get comments from Netlify");
            done();
        }
    });
});

gulp.task("get-participants", function (done) {

    // set up the request with appropriate auth token and Form ID
    var url = `https://api.netlify.com/api/v1/forms/${process.env.REGISTRATION_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;

    console.log('Request: ' + url);
    
    // get the data from Netlify's submissions API
    request(url, function(err, response, body){
        if(!err && response.statusCode === 200){
            console.log("Submissions found");
            console.log(body);
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
                var text = data.text.split(',');
                var country = text[0];
                country = country.replace('"', "").replace('"', "").replace('[', "").toUpperCase().trim();
                var flag = country;

                country = country.replace(/^ÖSTERREICH$/,"AUT");
                country = country.replace(/^AUSTRIA$/,"AUT");
                country = country.replace(/^AT$/,"AUT");

                country = country.replace(/^SCHWEITZ$/,"CHE");
                country = country.replace(/^SWITZERLAND$/,"CHE");
                country = country.replace(/^CH$/,"CHE");
                country = country.replace(/^SUI$/,"CHE");

                country = country.replace(/^GERMANY$/,"DEU");
                country = country.replace(/^GER$/,"DEU");
                country = country.replace(/^MUNICH$/,"DEU");
                country = country.replace(/^DE$/,"DEU");

                country = country.replace(/^DENMARK$/,"DNK");
                country = country.replace(/^DEN$/,"DNK");
                country = country.replace(/^DK$/,"DNK");

                country = country.replace(/^UNITED KINGDOM$/,"GBN");
                country = country.replace(/^GBR$/,"GBN");
                country = country.replace(/^UK$/,"GBN");

                country = country.replace(/^SPAIN$/,"ESP");
                country = country.replace(/^ES$/,"ESP");

                country = country.replace(/^JAPAN$/,"JPN");
                country = country.replace(/^JP$/,"JPN");

                country = country.replace(/^BE$/, "BEL");

                country = country.replace(/^NETHERLANDS$/,"NLD");
                country = country.replace(/^NED$/,"NLD");
                country = country.replace(/^NL$/,"NLD");

                country = country.replace(/^ROMANIA$/,"ROU");
                country = country.replace(/^RO$/,"ROU");

                country = country.replace(/^SE$/,"SWE");
                country = country.replace(/^UA$/,"UKR");
                
                country = country.replace("N/A","EEE");
                
                country = country.substr(0,3);

                flag = flag.replace(/^ÖSTERREICH$/,"AT");
                flag = flag.replace(/^AUSTRIA$/,"AT");
                flag = flag.replace(/^AUT$/,"AT");

                flag = flag.replace(/^SCHWEITZ$/,"CH");
                flag = flag.replace(/^SWITZERLAND$/,"CH");
                flag = flag.replace(/^SUI$/,"CH");

                flag = flag.replace(/^GERMANY$/,"DE");
                flag = flag.replace(/^GER$/,"DE");
                flag = flag.replace(/^MUNICH$/,"DE");
                
                flag = flag.replace(/^DENMARK$/,"DK");
                flag = flag.replace(/^DNK$/,"DK");
                flag = flag.replace(/^DEN$/,"DK");
                
                flag = flag.replace(/^UNITED KINGDOM$/,"GB");
                flag = flag.replace(/^GBR$/,"GB");
                flag = flag.replace(/^UK$/,"GB");

                flag = flag.replace(/^SPAIN$/,"ES");

                flag = flag.replace(/^JAPAN$/,"JP");
                flag = flag.replace(/^JAP$/,"JP");

                flag = flag.replace(/^NETHERLANDS$/,"NL");
                flag = flag.replace(/^NED$/,"NL");

                flag = flag.replace(/^POLAND$/,"PL");
                flag = flag.replace(/^POL$/,"PL");

                flag = flag.replace(/^SWEDEN$/,"SE");
                flag = flag.replace(/^SWE$/,"SE");
                
                flag = flag.replace(/^UKRAINE$/,"UA");
                flag = flag.replace(/^UKR$/,"UA");
                                
                flag = flag.replace("N/A","EU");

                flag = String.fromCodePoint(flag.codePointAt(0) + 127397) + String.fromCodePoint(flag.codePointAt(1) + 127397);

                country = flag + " " + country;
                
                var diet = text || ['"N/A"', '""]'];
                diet.splice(0,1);
                diet = diet.join(',').replace('"', "").replace('"', "").replace(']', "");

                var ema_id = data.ema_id.replace(/[^0-9]*/, '');

                var record = {
                    id: md5((data.email||'')+body[item].created_at),
                    date: body[item].created_at,
                    lang: data.lang,
                    given_name: data.given_name.trim(),
                    surname: data.surname.trim(),
                    ema_id: ema_id.trim(),
                    email: data.email.trim(),
                    country: country,
                    diet: diet.trim(),
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
                    fs.writeFile(buildSrc + "site/_data/tournaments/202505/participants.json", JSON.stringify(participants, null, 2), function(err) {
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

