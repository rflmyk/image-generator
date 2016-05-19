var express = require( 'express' );
var path = require( 'path' );

var config = require('./package.json');

var port = process.env.PORT || 8080;

var app = express();

var imagesGenerator = require('./controllers/images-generator');
var settingsDefault = require('./controllers/images-generator').settingsDefault;

app.locals.pretty = true;

app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.get( '/:extension', function( req, res ) {
    imagesGenerator.create(req, res); 
} );

app.get('/', function( req, res ){
    res.render('index', { 
        title: config.title,
        description: config.description, 
        urlImageSample: req.protocol + '://' + req.get('host') + req.originalUrl + 'png?size=300x300&text=YOUR+TEST&color=fff&background=ccc',
        settingsDefault: settingsDefault
    } );
});


app.use( function( req, res, next ) {
    var err = new Error( 'Ops... not found!' );
    err.status = 404;
    next( err );
} );

app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error', {
        message: err.message,
        urlImageSample: req.protocol + '://' + req.get('host') + req.originalUrl + 'png?size=300x300&text=YOUR+TEST&color=fff&background=ccc',
        error: {}
    } );
    res.end();
} );

app.listen( port, function() {
    console.log( 'Server started! At http://localhost:' + port );
} );
