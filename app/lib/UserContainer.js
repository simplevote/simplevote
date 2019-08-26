import { Container } from 'unstated';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Lib from './index';

const {
  fetchUserCivicInfo,
  prepRegistrationDeadlines,
  updateCandidates,
  updateReferenda,
  updateNotificationToken
} = Lib;


export default class UserContainer extends Container {
  state = {
    loading: true,
    today: moment().startOf('day'),
    user: {
      id: null,
      createdAt: null,
      registered: false,
      isRegistering: false,
      registrationStep: "RegisterBasicInformation",
      firstName: null,
      lastName: null,
      zipcode: null,
      birthyear: null,
      socialSecurityNumber: null,
      isNotFelon: false,
      isNotMentallyIncompetent: false,
      isNotClaimedElsewhere: false,
      homeAddress: null,
      gender: '',
      party: '',
      votingTime: '',
      pollingPlace: null,
      hasBasicInfo: false,
      isEligible: false,
      hasAdditionalInfo: false,
      isCalendarEventSet: false,
      hasNotificationsEnabled: false
    },
    selections: new Set()
  }

  hasAdditionalInfo = () => {
    let { user } = this.state;
    if (user.street &&
        user.state &&
        user.zipcode &&
        user.gender &&
        user.party) {
      return true
    } else {
      return false
    }
  }

  isEligible = () => {
    let { user } = this.state;
    if (user.socialSecurityNumber &&
        user.isNotFelon &&
        user.isNotMentallyIncompetent &&
        user.isNotClaimedElsewhere) {
      return true
    } else {
      return false
    }
  }

  hasBasicInfo = () => {
    let { user } = this.state;
    if (user.firstName &&
        user.lastName &&
        user.zipcode &&
        user.birthyear) {
      return true
    } else {
      return false
    }
  }

  load = async () => {
    // await Lib.Storage.set('USER', null);
    // Load the user
    let user = await Lib.Storage.get('USER');
    if (!user) {
      user = {
        id: uuid(),
        createdAt: new Date(),
        registered: false,
        isRegistering: false,
        registrationStep: null,
        lastRegistrationCheck: null,
        token: null,
        firstName: null,
        lastName: null,
        zipcode: null,
        birthyear: null,
        socialSecurityNumber: null,
        isNotFelon: false,
        isNotMentallyIncompetent: false,
        isNotClaimedElsewhere: false,
        homeAddress: null,
        gender: '',
        party: '',
        votingTime: '',
        pollingPlace: null,
        hasBasicInfo: false,
        isEligible: false,
        hasAdditionalInfo: false,
        isCalendarEventSet: false,
        hasNotificationsEnabled: false
      }
      await Lib.Storage.set('USER', user);
    }

    // load the user's ballot selections
    let selections = await Lib.Storage.get('SELECTIONS');
    selections = selections
      ? new Set(selections)
      : new Set()

    this.setState({
      user,
      selections,
      loading: false
    });
  }

  update = async (user=null) => {
    if (!user) {
      user = await Lib.Storage.get('USER');
    }
    let selections = await Lib.Storage.get('SELECTIONS');
    selections = selections
      ? new Set(selections)
      : new Set()
    let referendaSelections = await Lib.Storage.get('REFERENDA_SELECTIONS') || [];

    // Set the loading state
    this.setState({loading: true});

    //const {
    //  election,
    //  contests,
    //  pollingPlace,
    //  state,
    //  representatives,
    //  ocdIds,
    //  registrationDeadlines
    //} = await fetchUserCivicInfo(user);

    //const {
    //  nextMethod,
    //  nextDeadline,
    //  filteredDeadlines
    //} = prepRegistrationDeadlines(
    //    registrationDeadlines,
    //    this.state.today
    //);

    //updateCandidates(contests, selections);
    //updateReferenda(contests, referendaSelections);

    //user.election = election;
    //user.contests = contests;
    //user.pollingPlace = pollingPlace;
    //user.state = state;
    //user.representatives = representatives;
    //user.ocdIds = ocdIds;
    //user.registrationDeadlines = registrationDeadlines;
    //user.nextMethod = nextMethod;
    //user.nextDeadline = nextDeadline;
    //user.filteredDealines = filteredDeadlines;

    this.setState({
      loading: false,
      user,
      selections,
      referendaSelections
    }, () => {
      Lib.Storage.set('USER', user);
    });
  }

  setReferendaSelections = (referendaSelections) => {
    this.setState({referendaSelections}, () => {
      Lib.Storage.set('REFERENDA_SELECTIONS', referendaSelections);
    });
  }

  setSelections = (selections) => {
    this.setState({selections}, () => {
      Lib.Storage.set('SELECTIONS', [...selections]);
    });
  }

  setUser = (user) => {
    this.setState({user}, () => {
      Lib.Storage.set('USER', user);
    });
  }
}

