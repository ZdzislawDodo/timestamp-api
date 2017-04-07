var express = require("express"),
    app = express(),
    moment = require("moment"),
    dateFormats = [
        "MMDDYYYY",
        "YYYYMMDD",
        "MMMMDDYYYY",
        "DDMMMMYYYY",
        "DDYYYYMMMM",
        ];

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.send("Hello Wolrd");
});

app.get("/:time", function(req, res) {
    var response = {
        unix: null,
        natural: null
    };
    var input = req.params.time;
    if(/^\d+$/.test(input)) {
        response.unix = input;
        response.natural = moment.unix(input).format("MMMM DD, YYYY");
    } else if(moment(input, dateFormats).isValid()) {
        var date = moment(input, dateFormats);
        response.natural = date.format("MMMM DD, YYYY");
        response.unix = moment(date).unix();
    }
    res.send(response);
    
    //console.log(moment.unix(input).format("MMMM DD, YYYY"));
    
});

app.listen(process.env.PORT, process.env.ID, function() {
    console.log("Server is listening");
});