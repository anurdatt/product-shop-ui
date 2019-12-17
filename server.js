var express=require('express'),
    app     = express(),
    morgan  = require('morgan'),
    bodyParser = require('body-parser');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    console.log('In App GET /');
    //if (req.session.active == true) {
        //console.log ('session active');
        res.sendFile('IndexMain.html', {root: __dirname + '/public'});
    // }
    // else {
    //     res.redirect('login.html');
    // }
    
});

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;