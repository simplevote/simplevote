import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import * as Calendar from 'expo-calendar'
import { Platform } from 'react-native';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import Geocoder from 'react-native-geocoding';
import { KEYS } from '../config/keys';
import { STATE_ZIP_MAP } from '../config/zip_state';

Geocoder.setApiKey(KEYS.GOOGLE_GEOCODING_API_KEY)


async function registerForPushNotificationsAsync(user) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();
  // POST the token to the server
  const tokenData = {id: user.id, token}
  const res = await putNotificationToken(tokenData)
  const tokenResponse = res.response

  return { token, tokenResponse }
}


async function getCalendarPermissionsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.CALENDAR
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  return finalStatus
}

const HOUR_MAP = {
  '6:00 am': '06:00',
  '7:00 am': '07:00',
  '8:00 am': '08:00',
  '9:00 am': '09:00',
  '10:00 am': '10:00',
  '11:00 am': '11:00',
  '12:00 pm': '12:00',
  '1:00 pm': '13:00',
  '2:00 pm': '14:00',
  '3:00 pm': '15:00',
  '4:00 pm': '16:00',
  '5:00 pm': '17:00',
  '6:00 pm': '18:00',
}

/*
 *
 */
async function createCalendarEvent(calendarId, time, user) {
  const details = {
    title: "Time to vote!",
    startDate: time,
    endDate: '2019-11-05T08:00:00.000Z',
    location: user.pollingPlace.formattedLocation.formattedAddress,
    notes: "You'll need your id to vote. If you're in line by 6 pm then you can vote"
  }

  return Calendar.createEventAsync(calendarId, details)
}


/*
 *
 */
async function updateCalendarEvent(eventId, time, user) {
  const details = {
    title: "Time to vote!",
    startDate: time,
    endDate: '2019-11-06T05:00:00.000Z',
    location: user.pollingPlace.formattedLocation.formattedAddress,
    notes: "You'll need your id to vote. If you're in line by 6 pm then you can vote"
  }

  return Calendar.updateEventAsync(eventId, details)
}


/*
 *
 */
async function findOrCreateUser() {
  //await Storage.set('USER', null);
  let user = await Storage.get('USER');
  if (!user) {
    user = {
      id: uuid(),
      createdAt: new Date(),
      registered: false,
      lastRegistrationCheck: null,
      friends: []
    }
    await Storage.set('USER', user);
  }
  return user
}


/*
 *
 */
var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
}


/*
 *
 */
async function putNotificationToken(token) {
  const base = 'https://296o7y8823.execute-api.us-east-1.amazonaws.com/'
  const resource = 'default/handleNotificationToken'
  const url = base + resource
  const data = JSON.stringify({token})

  return fetch(url, {
      method: 'POST',
      body: data,
      headers: {"x-api-key": KEYS.AWS_API_GATEWAY_KEY}
    })
    .then(res =>  res.json())
    .catch(err => console.log('error', err))
}


/*
 *
 */
async function updateNotificationToken(user) {
  const base = 'https://296o7y8823.execute-api.us-east-1.amazonaws.com/'
  const resource = 'default/updateNotificationToken'
  const url = base + resource
  const data = JSON.stringify({
    ocdIds: user.ocdIds,
    id: user.id
  });

  return fetch(url, {
      method: 'POST',
      body: data,
      headers: {"x-api-key": KEYS.AWS_API_GATEWAY_KEY}
    })
    .then(res =>  res.json())
    .catch(err => console.log('error', err))
}


/*
 *
 */
function deg2rad(deg) {
  return deg * (Math.PI/180)
}


/*
 *
 */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}


/*
 *
 *
 */
function findOffsets(points) {
  if (!(points[1] && points[1].latitude)) {
    return {
      lat: points[0].latitude,
      lon: points[0].longitude,
      latDiff: .005,
      lonDiff: .005
    }
  }

  let minLat = Math.min.apply(null, points.map(p => p.latitude))
  let minLon = Math.min.apply(null, points.map(p => p.longitude))
  let maxLat = Math.max.apply(null, points.map(p => p.latitude))
  let maxLon = Math.max.apply(null, points.map(p => p.longitude))

  let latDelta = (maxLat - minLat)
  let lonDelta = (Math.abs(minLon) - Math.abs(maxLon))
  let lat = minLat + (latDelta / 2)
  let lon = minLon + (lonDelta / 2)

  return {
    lat: lat,
    lon: lon,
    latDiff: 2 * latDelta,
    lonDiff: 2 * lonDelta
  };
}


/**
 *
 *
 */
function formatGoogleAddress(place, addr) {
  let cmps = addr.address_components
  let street = extractAddressComponent(cmps, 'street_number')
  let address = `${place.locationName}\n${place.line1}\n${place.city}, ${place.state} ${place.zip}`

  if (street.long_name.length) {
    const street_number = extractAddressComponent(cmps, 'street_number').long_name
    const street_name = extractAddressComponent(cmps, 'route').long_name
    return {
      formattedAddress: address,
      latitude: addr.geometry.location.lat,
      longitude: addr.geometry.location.lng
    }
  } else {
    return {
      formattedAddress: address,
      latitude: null,
      longitude: null
    }
  }
}


/**
 *
 *
 */
function sortContacts(a, b) {
  if (a.lastName < b.lastName) return -1;
  if (a.lastName > b.lastName) return 1;
  return 0;
}


/**
 *
 *
 */
function extractAddressComponent(components, target_type) {
  let targetIndex = -1
  components.forEach((component, ix) => {
    component.types.forEach((type) => {
      if (type == target_type) {
        targetIndex = ix
      }
    })
  })

  let component = targetIndex === -1
    ? {long_name: ""}
    : components[targetIndex]
  return component
}


/**
 * Formats a Google Places address so it conforms
 * with the WVM Address model
 * TODO: change the model formatting so it matches TargetSmart
 */
function formatAddress(data, details = null) {
  let ac = details.address_components
  let street_number = extractAddressComponent(ac, 'street_number').long_name
  let street_name = extractAddressComponent(ac, 'route').long_name
  return {
    street: `${street_number} ${street_name}`,
    city: extractAddressComponent(ac, 'locality').long_name,
    state: extractAddressComponent(ac, 'administrative_area_level_1').short_name,
    zipcode: extractAddressComponent(ac, 'postal_code').long_name,
    county: ac[4].long_name,
    formattedAddress: details.formatted_address,
    latitude: details.geometry.location.lat,
    longitude: details.geometry.location.lng
  }
}


/*
 *
 *
 */
function processAuthorities(authorities) {
  let authority = {}
  if (authorities.length) {
    authority = authorities[0]
  }
  return authority
}


/*
 *
 *
 */
function processContests(contests) {
  return contests
    ? contests
    : []
}


/*
 *
 *
 */
function processElection(electionResponse) {
  let election;
  if (electionResponse) {
    election = electionResponse
    election.name = electionResponse.description
    election.electionDay = electionResponse.date
    election.hasElection = true
  } else {
    election = {
      id: null,
      name: "No upcoming elections",
      electionDay: null,
      hasElection: false
    };
  }
  return election
}


/*
 *
 *
 */
async function processPollingPlace(pollingLocations) {
  let pollingPlace;
  if (pollingLocations) {
    const newPollingPlace = pollingLocations[0].address.locationName
    pollingPlace = pollingLocations[0];
    pollingPlace.has_polling_place = true
    pollingPlace.formattedLocation = await geocodePollingPlace(pollingPlace);
    pollingPlace.has_geo = pollingPlace.formattedLocation.latitude ? true : false
  } else {
    pollingPlace = {
      has_polling_place: false,
      has_geo: false,
      pollingHours: "Check again soon",
      formattedLocation: {
        formattedAddress: "Polling place information not available",
        longitude: null,
        latitude: null
      }
    }
  }
  return pollingPlace
}


/*
 *
 *
 */
// Process State
function processState(state) {
  return state
    ? state[0]
    : {}
}


/*
 *
 *
 */
function processReps(reps) {
  let representatives = [];
  if (reps) {
    reps.offices.forEach(office => {
      office.officialIndices.forEach(ix => {
        let official = reps.officials[ix]
        official.office = office
        let level = createRepresentativeLevel(official)
        official.level = level
        representatives.push(official);
      });
    });
  } else {
    representatives = [];
  }
  return representatives
}





/*
 *
 *
 */
async function fetchUserCivicInfo(user) {
  // Fetch the core user's divisions
  const { divisions } = await searchRepresentatives(user);
  const ocdIds = Object.keys(divisions)
  const userDivisionIds = processDivisions(divisions);

  // Search DemocracyWorks for the data
  let dwElections = await fetchUpcomingElectionsLocal(divisions)
  dwElections = dwElections.sort(dwDateComparator);

  // Fetch the elections from google
  const { elections } = await fetchElections();
  const gElections = _.intersectionBy(
    elections.filter(e => e.id != 2000),
    userDivisionIds,
    'ocdDivisionId'
  ).sort(electionDateComparator);

  // Election, contest, polling place, and state information
  let election = {
    id: null,
    name: "No upcoming elections",
    electionDay: null,
    hasElection: false
  };

  var races = []
  var contests = []
  var pollingPlace = {
      has_polling_place: false,
      has_geo: false,
      pollingHours: "Check again soon",
      formattedLocation: {
        formattedAddress: "Polling place information not available",
        longitude: null,
        latitude: null
      }
    }
  var state = {}
  var authorities = [];
  var registrationDeadlines = [];

  if (dwElections.length) {
    election = processElection(dwElections[0]);
    authorities = await fetchElectionAuthority(dwElections[0]['ocd-id']);
    election.authority = processAuthorities(authorities)
    const methods = election['district-divisions'][0]['voter-registration-methods']
    registrationDeadlines = createRegistrationDeadlines(methods, election)

    if (gElections.length) {
      let {
        contests,
        pollingLocations,
        state
      } = await fetchElection(gElections[0].id, user);

      election.id = gElections[0].id;
      races = processContests(contests);
      pollingPlace = await processPollingPlace(pollingLocations);
      state = processState(state);
    }
  }

  // This is a stupid hack to deal with variable scope
  contests = races;

  // Representatives
  let representatives = await fetchRepresentatives(user);
  representatives = processReps(representatives);

  return {
    election,
    contests,
    pollingPlace,
    state,
    representatives,
    ocdIds,
    registrationDeadlines
  }
}


/**
 * Creates the data for the TargetSmart voter
 * registration check API call
 */
function createTargetSmartData(form, addr) {
  const ac = addr.address_components
  return {
    first_name: form.firstName,
    last_name: form.lastName,
    street_number: extractAddressComponent(ac, 'street_number').long_name,
    street_name: extractAddressComponent(ac, 'route').long_name,
    zip_code: extractAddressComponent(ac, 'postal_code').long_name,
    city: extractAddressComponent(ac, 'locality').long_name,
    state: extractAddressComponent(ac, 'administrative_area_level_1').short_name,
    birth_year: form.birthyear,
    //birthDate: moment(form.birthDate).format('YYYYMMDD'),
    unparsed_full_address: addr.formatted_address
  };
}


/**
 * Checks a user's registration status using the
 * TargetSmart registration check api
 */

function checkRegistrationTargetSmart(user) {
  let base = 'https://296o7y8823.execute-api.us-east-1.amazonaws.com'
  let resource = '/default/proxyTargetSmartTest'
  let body = JSON.stringify({
    first_name: user.firstName,
    last_name: user.lastName,
    state: STATE_ZIP_MAP[user.zipcode],
    birth_year: user.birthyear
  });
  let url = base + resource;
  let headers = new Headers({
    'x-api-key': KEYS.AWS_API_GATEWAY_KEY,
  });

  return fetch(url, {method: 'POST', headers, body})
    .then(response =>  response.json())
    .catch(err => console.log('error', err))
}

/**
 *
 *
 */
async function fetchUpcomingElectionsDemocracyWorks(ocdId) {
  let base = 'https://296o7y8823.execute-api.us-east-1.amazonaws.com/'
  let resource = 'default/getElections'
  let params = `?ocd-ids=${ocdId}`
  let url = base + resource + params

  return fetch(url, {
      method: 'GET',
      headers: {"x-api-key": KEYS.AWS_API_GATEWAY_KEY}
    })
    .then(res =>  res.json())
    .catch(err => console.log('error', err))
}

/**
 *
 *
 */
function createOcdIds(divisions) {
  const divisionIds = Object.keys(divisions)
  const ocdIds = divisionIds.join(',')
  return ocdIds
}

/**
 *
 *
 */
function fetchUpcomingElectionsLocal(divisions) {
  const ocdIds = createOcdIds(divisions)
  return fetchUpcomingElectionsDemocracyWorks(ocdIds)
}

/**
 *
 *
 */
async function fetchElectionAuthority(ocdId) {
  const base = 'https://296o7y8823.execute-api.us-east-1.amazonaws.com/'
  const resource = 'default/getAuthority'
  const params = `?ocd-ids=${ocdId}`
  const url = base + resource + params

  return fetch(url, {
      method: 'GET',
      headers: {"x-api-key": KEYS.AWS_API_GATEWAY_KEY}
    })
    .then(res =>  res.json())
    .catch(err => console.log('error', err))
}

/**
 *
 *
 */
function fetchElectionAuthorities(divisions) {
  const divisionIds = Object.keys(divisions)
  const ocdIds = divisionIds.join(',')
  return fetchElectionAuthority(ocdIds)
}

/**
 * Checks the registration status of the user
 * NOTE: NOT IN USE
 */
function checkRegistration(user) {
  let data = JSON.stringify({
    address: user.homeAddress,
    birthdate: user.birthDate
  });
  let url = `http://localhost:4040/api/users/registration/${user.facebookUserId}`
  let headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  fetch(url, {method: 'POST', body: data, headers: headers})
    .then(res => res.json())
    .catch(err => console.log('error', err))
}


/**
 * Searches the Google Civic API for election
 * based on the user's home address.
 */
function searchElection(user) {
  let base = "https://www.googleapis.com/civicinfo/v2/voterinfo/"
  let address = user.formattedAddress
  let url = `${base}?address=${address}&key=${KEYS.GOOGLE_CIVIC_API_KEY}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log('error', err))
}


/**
 * Searches the Google Civic API for the user's
 * representatives based on the user's home address.
 */
function searchRepresentatives(user) {
  let base = "https://www.googleapis.com/civicinfo/v2/representatives/"
  let address = user.formattedAddress
  let url = `${base}?address=${address}&includeOffices=false&key=${KEYS.GOOGLE_CIVIC_API_KEY}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log('error', err))
}


/**
 * Searches the Google Civic API for the user's
 * representatives based on the user's home address.
 */
function fetchRepresentatives(user) {
  let base = "https://www.googleapis.com/civicinfo/v2/representatives/"
  let address = user.address.formattedAddress
  let url = `${base}?address=${address}&key=${KEYS.GOOGLE_CIVIC_API_KEY}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log('error', err))
}


/**
 * Fetches election information from the Google
 * Civic API using an electionId
 */
function fetchElection(electionId, user) {
  let baseurl = "https://www.googleapis.com/civicinfo/v2/voterinfo/"
  let address = user.formattedAddress
  let url = `${baseurl}?address=${address}&electionId=${electionId}&key=${KEYS.GOOGLE_CIVIC_API_KEY}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log('error', err))
}


/**
 * Fetches election information from the Google
 */
function fetchElections() {
  let baseurl = "https://www.googleapis.com/civicinfo/v2/elections/"
  let url = `${baseurl}?key=${KEYS.GOOGLE_CIVIC_API_KEY}`;

  return fetch(url)
    .then((response) => response.json())
    .catch(err => console.log('error', err))
}


/*
 *
 */
function processDivisions(divisionMapping) {
  let divisions = Object.keys(divisionMapping);
  let divisionObjs = divisions.map(div => {return {'ocdDivisionId': div}})
  return divisionObjs
}


/*
 *
 */
function electionDateComparator(a, b) {
  var dateA = new Date(a.electionDay);
  var dateB = new Date(b.electionDay);
  return dateA - dateB;
}


/*
 *
 */
function dwDateComparator(a, b) {
  var dateA = new Date(a.date);
  var dateB = new Date(b.date);
  return dateA - dateB;
}


/*
 *
 */
function geocodePollingPlace(pollingPlace) {
  const addr = pollingPlace.address
  const loc = `${addr.line1} ${addr.city} ${addr.state}, ${addr.zip}`
  return Geocoder.getFromLocation(loc)
    .then(json => {
      var location = json.results[0];
      return formatGoogleAddress(
        pollingPlace.address,
        location
      )
    },
    error => {console.log('error', error);}
  );
}


/*
 *
 */
function createRepresentativeLevel(rep) {
  let level = rep.office.levels;
  switch (true) {
    case !level:
      let divisions = rep.office.divisionId.split('/')
      return divisions[divisions.length-1].includes("state")
        ? "State"
        : "Local"
      break;
    case level.includes("country"):
      return "Federal"
      break;
    case level.includes("administrativeArea1"):
      return "State"
      break;
    default:
      return "Unknown"
  }
}


/*
 *
 */
function createContestLevel(contest) {
  let level = contest.level;
  switch (true) {
    case !level:
      return "Local"
      break;
    case level.includes("country"):
      return "Federal"
      break;
    case level.includes("administrativeArea1"):
      return "State"
      break;
    default:
      return "Unknown"
  }
}


/*
 *
 */
function transformCandidates(candidates) {
  let transformed = []
  const grouped = _.groupBy(candidates, 'name'); // what about if candidates have the same name?
  for (let candidate in grouped) {
    let tcandidate = grouped[candidate][0]
    tcandidate.parties = grouped[candidate].map(c => c.party).join(", ");
    transformed.push(tcandidate);
  }
  return transformed
}


function createRegistrationDeadlines(methods, election) {
  const today = moment().startOf('day')
  const processed = methods.map(m => {
    if (m.hasOwnProperty('deadline-online')) {
      const deadline = moment(m['deadline-online'], 'YYYY-MM-DD')
      const time = deadline.format('MM/DD')
      const diff = deadline.diff(today, 'days')
      return {
        type: m.type,
        name: `${titleCase(m.type)} Registration`,
        title: `${titleCase(m.type)} Registration`,
        time: time,
        description: `${diff} days to the deadline`,
        priority: 1,
        deadline: m['deadline-online']
      }
    } else if (m.hasOwnProperty('deadline-postmarked')) {
      const deadline = moment(m['deadline-postmarked'], 'YYYY-MM-DD')
      const time = deadline.format('MM/DD')
      const diff = deadline.diff(today, 'days')
      return {
        type: m.type,
        name: `${titleCase(m.type)} Registration`,
        title: `${titleCase(m.type)} Registration`,
        time: time,
        description: `${diff} days to the deadline`,
        priority: 2,
        deadline: m['deadline-postmarked']
      }
    } else if (m.hasOwnProperty('deadline-received')) {
      const deadline = moment(m['deadline-received'], 'YYYY-MM-DD')
      const time = deadline.format('MM/DD')
      const diff = deadline.diff(today, 'days')
      return {
        type: m.type,
        name: `${titleCase(m.type)} Registration`,
        title: `${titleCase(m.type)} Registration`,
        time: time,
        description: `${diff} days to the deadline`,
        priority: 2,
        deadline: m['deadline-received']
      }
    } else if (m.type === "election-day" || m.type === "not-applicable") {
      //const deadline = moment(election.date, 'YYYY-MM-DD');
      const deadline = moment('2018-11-06');
      const time = deadline.format('MM/DD')
      const diff = deadline.diff(today, 'days')
      return {
        type: m.type,
        name: `${titleCase(m.type)} Registration`,
        title: `${titleCase(m.type)} Registration`,
        time: time,
        description: `${diff} days to the deadline`,
        priority: 2,
        deadline: '2018-11-06' //election.date
      }
    }
  });

  const deadlines = _.sortBy(processed, ['deadline', 'priority'])
  return deadlines
}


/*
 *
 */
function prepRegistrationDeadlines(deadlines, today) {
  const filteredDeadlines = deadlines.filter(d => {
    return moment(d.deadline, 'YYYY-MM-DD').diff(today) >= 0
  });

  var nextMethod, nextDeadline;
  if (filteredDeadlines.length) {
    nextMethod = filteredDeadlines[0].name
    nextDeadline = moment(filteredDeadlines[0].deadline, 'YYYY-MM-DD')
  } else {
    nextMethod = null
    nextDeadline = null
  }

  return { nextMethod, nextDeadline, filteredDeadlines }
}


/*
 *
 */
function formatTime(time) {
  let times = time.split('-');
  const start = moment(times[0], ['H:m']).format('LT')
  const end = moment(times[1], ['H:m']).format('LT')
  const formatted = `${start} to ${end}`
  return formatted
}



/*
 *
 */
function formatUserAddress(user) {
  const { street, aptNumber, city, state, zipcode } = user;
  let address;
  if (aptNumber) {
    address = `${street} Apt. ${aptNumber} ${city}, ${state} ${zipcode}`
  } else {
    address = `${street} ${city}, ${state} ${zipcode}`
  }
  return address
}

/*
 *
 */
function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

function getRegistrationMethodIndex(methods, type) {
  const types = _.map(methods, 'type')
  const index = _.indexOf(types, type) != -1 ? _.indexOf(types, type) : 0
  return index
}


/*
 *
 */
function updateCandidates(contests, selections) {
  if (contests.length && selections.size) {
    // Set the office for each candidate
    contests = contests.filter(c => c.type != "Referendum")
    contests.forEach(c => {
      if (c.type != "Referendum") {
        c.candidates.forEach(cand => cand.office = c.office)
      }
    })

    // Iterate over the candidates and update the selected status
    const candidates = _.flatten(_.map(contests, 'candidates'));
    candidates.forEach(c => {
      const selectionKey = `${c.office}|${c.name}`

      if (selections.has(selectionKey)) {
        c.selected = true
      } else {
        c.selected = false
      }
    });
  }
}


/*
 *
 */
function updateReferenda(contests, referendaSelections) {
  if (contests.length && referendaSelections.length) {
    referenda = contests.filter(c => c.type ==="Referendum")
    referenda.forEach(r => {
      const selection = _.find(referendaSelections, (s) => r.referendumTitle == s.title)
      if (selection != undefined) {
        r.selectedIndex = selection.index
      }
    });
  }
}


/*
 *
 */
function updateUserRegistration(user, registration) {
  user.firstName = registration.input.first_name;
  user.lastName = registration.input.last_name;
  user.state = registration.input.state;
  user.registered = registration.result;
  user.registration_result = registration;
  user.birthyear = registration.birthYear;
  user.lastRegistrationCheck = new Date();

  return user
}

/*
 *
 */
const Storage = {
  get: async (key) => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
     } catch (error) {
       // Error retrieving data
      console.log('ERROR FETCHING DATA', error);
     }
  },

  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
     } catch (error) {
       // Error setting data
      console.log('ERROR SETTING DATA', error);
     }
  }
}

export default {
  registerForPushNotificationsAsync,
  getCalendarPermissionsAsync,
  createCalendarEvent,
  updateCalendarEvent,
  findOrCreateUser,
  putNotificationToken,
  updateNotificationToken,
  getDistanceFromLatLonInKm,
  findOffsets,
  formatGoogleAddress,
  sortContacts,
  extractAddressComponent,
  formatAddress,
  formatUserAddress,
  createTargetSmartData,
  checkRegistrationTargetSmart,
  fetchUserCivicInfo,
  searchRepresentatives,
  fetchRepresentatives,
  searchElection,
  fetchElection,
  fetchElections,
  fetchUpcomingElectionsLocal,
  fetchElectionAuthority,
  processDivisions,
  electionDateComparator,
  geocodePollingPlace,
  processPollingPlace,
  createRepresentativeLevel,
  createContestLevel,
  transformCandidates,
  createRegistrationDeadlines,
  prepRegistrationDeadlines,
  getRegistrationMethodIndex,
  updateUserRegistration,
  formatTime,
  titleCase,
  updateCandidates,
  updateReferenda,
  Storage,
  inWords,
  HOUR_MAP
};


