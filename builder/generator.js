var jade = require('jade');
var fs = require('fs');
var _ = require('lodash-node');

var googlePlus = 'https://plus.google.com/+Gdgut';
var facebook = 'https://www.facebook.com/gdgutdev';
var twitter = 'https://twitter.com/gdgutah';
var baseUrl = 'http://devfestfam.com';

var options = {
  googlePlus: googlePlus,
  facebook: facebook,
  twitter: twitter,
  baseUrl: baseUrl,
  helpers: [{
    name: ' GDG Utah',
    url: googlePlus
  }],
  date: {
    full: 'Sepember 19, 2015',
    day: '19',
    month: 'Sepember',
    monthNum: '9',
    year: '2015'
  },
  activities: [{
    name: 'Registration',
    startTime: '9:30 AM',
    endTime: '10:00 AM'
  }, {
    name: 'Keynote',
    speaker: {
      name: 'Aaron Frost',
      url: 'https://plus.google.com/+AaronFrost/about',
      company: {
        name: 'GDG Utah',
        url: 'http://gdgut.com'
      }
    },
    startTime: '10:00 AM',
    endTime: '10:45 AM'
  }, {
    name: 'Sphero Programming with Node.js',
    speaker: {
      name: 'Bob Dunn',
      url: 'https://plus.google.com/+BobDunn0',
      company: {
        name: 'Pluralsight',
        url: 'http://www.pluralsight.com'
      }
    },
    track: 'Intermediate',
    startTime: '9:30 AM',
    endTime: '12:00 PM'
  }],
  prizes: [
    'awesome thing 1',
    'really cool thing 2'
  ],
  swag: [
    'Free lunch',
    'Free Conference T-shirt',
    'As many Raspberry Pi as we can afford to give away'
  ],
  sponsors: [{
    name: 'BlueHost',
    url: 'http://www.bluehost.com',
    image: 'resources/sponsor-logos/bluehostlogo.png',
    level: 'premier'
  }, {
    name: 'Google Fiber',
    url: 'https://fiber.google.com/about/',
    level: 'platinum',
    image: 'resources/sponsor-logos/fiberlogo.png'
  }, {
    name: 'AtTask',
    url: 'http://www.attask.com',
    image: 'resources/sponsor-logos/attasklogo.png',
    level: 'platinum'
  }, {
    name: 'DojoDevCamp',
    url: 'http://dojodevcamp.com/',
    level: 'platinum',
    image: 'resources/sponsor-logos/dojologo.png'
  }, {
    name: 'Domo',
    url: 'http://www.domo.com/',
    level: 'platinum',
    image: 'resources/sponsor-logos/domologo.png'
  }, {
    name: 'DevMountain',
    url: 'http://devmounta.in/',
    level: 'gold',
    image: 'resources/sponsor-logos/devmtnlogo2.png'
  }, {
    name: 'ConsultNet',
    url: 'http://consultnet.com/',
    level: 'gold',
    image: 'resources/sponsor-logos/consultnetlogo.png'
  }, {
    name: 'Plural Sight',
    url: 'http://www.pluralsight.com/',
    level: 'gold',
    image: 'resources/sponsor-logos/pluralsightlogo.png'
  }, {
    name: 'Provo Web Academy',
    url: 'http://provowebacademy.com/',
    level: 'silver',
    image: 'resources/sponsor-logos/pwalogo.png'
  }],
  hotels: [{
    name: 'Hotel Name',
    address: {
      street: 'Street address',
      city: 'City address',
      state: 'Utah',
      zip: 'Zip'
    },
    phoneNumber: '123-456-7890',
    fax: '098-765-4321',
    bookLink: 'http://www.google.com',
    bookText: 'Book a room'
  }],
  location: {
    state: 'Utah',
    city: 'Orem',
    name: 'UVU, Woodbury School of Business',
    address: '800 W University Pkwy, Orem, UT 84058',
    mapUrl: 'https://maps.google.com/maps?q=40.2769021,-111.7125277&ie=UTF8&t=m&z=17&ll=40.2769021,-111.7125277'
  },
  eventBrightId: '8243355097'
};

options.tracks = {};

_.each(options.activities, function(activity) {
  if (activity.speaker) {
    var simpleSessionName = activity.name.replace(/ |\//g, '-').toLowerCase();
    var simpleName = activity.speaker.name.replace(/ |\//g, '-').toLowerCase();
    var speakerDir = 'activities/sessions/' + simpleSessionName;
    activity.speaker.company.template = fs.readFileSync(speakerDir + '/company.html', 'utf8');
    activity.speaker.sessionTemplate = fs.readFileSync(speakerDir + '/session.html', 'utf8');
    if (activity.speaker.nophoto)
      simpleName = 'tbd';
    activity.speaker.photo = 'resources/speaker-photos/' + simpleName + '.jpg';
    console.log(activity.speaker.photo);
  }

  // Configure tracks
  if (!activity.track) {
    if (!options.tracks['General Events']) {
      options.tracks['General Events'] = {};
      options.tracks['General Events'].name = 'General Events';
      options.tracks['General Events'].track = [];
    }
    options.tracks['General Events'].track.push(activity);
  }
  else {
    if (!options.tracks[activity.track]) {
      options.tracks[activity.track] = {};
      options.tracks[activity.track].name = activity.track;
      options.tracks[activity.track].track = [];
    }
    options.tracks[activity.track].track.push(activity);
  }

});

var html = jade.renderFile('index.jade', options);

fs.writeFile('../index.html', html, function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('The file was saved!');
  }
});
