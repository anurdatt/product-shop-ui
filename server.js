var express=require('express'),
    app     = express(),
    morgan  = require('morgan'),
    bodyParser = require('body-parser'),
    multer = require('multer');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var storage = multer.diskStorage( {
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

var upload = multer({storage: storage}).single("file");
    
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

app.post('/fileUpload', (req, res) => {
    console.log('file upload request received..');
    upload(req, res, function(error) {
        if(error) {
            return res.status(500).end('Error uploading file - ' + error);
        }
        console.log('req.body = ' + JSON.stringify(req.body));
        res.end('file is uploaded');
    })
});
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something bad happened!');
});

const routes = require('./routes/index.js');
routes(app);

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;