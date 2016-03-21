var express = require('express'),
	app = express(),
	routes = require('./routes'),
	path = require('path'),
	passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy,
	mongoose = require('mongoose'),
	env = require('./config/environment'),
	User = require('./models/user')
bodyParser = require('body-parser'),
	multer = require('multer'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	port = process.env.PORT || 5000;

mongoose.connect(env.config.mongo);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(multer());

app.use(cookieParser());
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'productfy'
}));

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


var configAuth = {
	'facebookAuth': {
		'clientID': '594487354052992', // your App ID
		'clientSecret': '9028da0d10057701732f8f48459f17cf', // your App Secret
		'callbackURL': 'http://localhost:5000/auth/facebook/callback',
		'profileFields': ['id', 'displayName', 'name', 'gender', 'photos']
	}
};
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});
// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy(configAuth.facebookAuth,
function(accessToken, refreshToken, profile, done) {
	User.findOne({
		'facebook.id': profile.id
	}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			var user = new User({
				name: profile.displayName,
				username: profile.username,
				provider: 'facebook',
				facebook: profile._json,
				picture: profile.photos[0].value
			});
			user.save(function(err) {
				if (err) console.log(err);
				return done(err, user);
			});
		} else {
			return done(err, user);
		}
	});
}));

app.use(passport.initialize());
app.use(passport.session());

// ROUTES
// ==============================================

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/list',
		failureRedirect: '/'
	}));

app.use('/list', routes.list);

// API
app.use('/', routes.home);

// ==============================================
app.listen(port, function() {
	console.log('productfy on port ' + port);
});