var Canvas = require( 'canvas' );
var canvas, width, height;
var settingsDefault = {
	background: 'ccc',
	color: 'fff',
	extension: 'png',
	maxWidth: 3000,
	maxHeight: 3000,
	fontFamily: 'Impact',
	fontSize: 15,
	size: '300x300'
};
settingsDefault.text = settingsDefault.size;

function create( req, res ) {
	settings = {
		background: '#'+ (req.query.background || settingsDefault.background),
		color: '#'+ (req.query.color || settingsDefault.color),
		extension: req.params.extension || settingsDefault.extension,
		maxWidth: settingsDefault.maxWidth,
		maxHeight: settingsDefault.maxHeight,
		fontFamily: settingsDefault.fontFamily,
		fontSize: settingsDefault.fontSize,
		size: req.query.size || settingsDefault.size
	};

	settings.text = req.query.text || settings.size;

	width = parseInt( settings.size.split( 'x' )[ 0 ], 10 );
	height = parseInt( settings.size.split( 'x' )[ 1 ], 10 );
	canvas = new Canvas( width, height );
	var ctx = canvas.getContext( '2d' );
	var fontSize = Math.round( Math.min( width / settings.fontSize, height ) );


	if ( width < 0 || width > settingsDefault.maxWidth || height < 0 || height > settingsDefault.maxHeight ) {
		throw new Error( 'The max size: '+settingsDefault.maxWidth+'x'+settingsDefault.maxHeight );
		return;
	}

	ctx.save();
	ctx.fillStyle = settings.background;
	ctx.fillRect( 0, 0, width, height );
	ctx.restore();

	ctx.save();
	ctx.font = fontSize + 'px ' + settings.fontFamily;
	var measureText = ctx.measureText(settings.text).width;
	if(measureText > width){
		while(measureText > width){
			ctx.font = (fontSize--) + 'px ' + settings.fontFamily;
			if(ctx.measureText(settings.text).width < (width - 40)){
				break;
			}
		}
	}
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = settings.color;
	ctx.fillText( settings.text, width / 2, height / 2 - fontSize * 0.1 );
	ctx.restore();
	
	if ( settings.extension === 'png' ) {
		res.header( 'Content-Type', 'image/png' );
		stream = canvas.createPNGStream();
	}


	if ( settings.extension === 'jpg' || settings.extension === 'jpeg' ) {
		res.header( 'Content-Type', 'image/jpeg' );
		stream = canvas.createJPEGStream();
	}

	if ( settings.extension !== 'png' && settings.extension !== 'jpg' && settings.extension !== 'jpeg' && settings.extension !== 'favicon.ico') {
		throw new Error( 'Ops... Extension not avaiable!' );
		return;
	}

	stream.pipe( res, function( err ) {
		if ( err ) {
			next( err );
			return;
		}
		res.end();
	} );
}

module.exports = {
	create: create,
	settingsDefault: settingsDefault
};
