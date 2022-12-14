import {
  RaccoonMeadowsVolunteers,
  RaccoonMeadowsActivity,
  raccoonMeadowsVolunteers,
} from './raccoon-meadows-log';

import {
  WolfPointVolunteers,
  WolfPointActivity,
  wolfPointVolunteers,
} from './wolf-point-log';

type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;

type Volunteers = {
  id: number;
  name: string;
  activities: CombinedActivity[];
};

function combineVolunteers(
  volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
) {
  return volunteers.map((volunteer) => {
    let id = volunteer.id; //declare id as the id key from mapping volunteers to 'volunteer'
    if (typeof id === 'string') { //typeguard
      id = parseInt(id,10);
    }
    return { //return same values, but now in relation to 'volunteer' object
      id: id,
      name: volunteer.name,
      activities: volunteer.activities
    }
  })
}

function isVerified(verified: string | boolean) {
  if (typeof verified === 'string') {
    if (verified === 'Yes') {
      return verified = true;
    } else if (verified === 'No') {
      return verified = false;
    }
  }

  return verified;
}

function calculateHours(volunteers: Volunteers[]) {
  return volunteers.map((volunteer) => {
    let hours = 0;

    volunteer.activities.forEach((activity) => {
      if (isVerified(activity.verified) === true) {
        hours += getHours(activity);
      }
    });

    return {
      id: volunteer.id,
      name: volunteer.name,
      hours: hours,
    };
  });
}

function byHours(a,b) {
  return b.hours - a.hours;
}

const combinedVolunteers = combineVolunteers(
  [].concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
);

//for testing these functions
//the following will combine the records of each park, add the total verified hours of each volunteer, and print that sorted by most hours to the console
const result = calculateHours(combinedVolunteers);
console.log(result.sort(byHours));
