export class Team {
  public id: string;
  public name: string;
  public shortName: string;
  public players: Players
  public route: string;

  constructor (
    id: string = '',
    name: string = '',
    shortName: string = '',
    players: Players = {} as Players,
    route: string = ''
  ) {
    this.id = id
    this.name = name
    this.shortName = shortName
    this.players = players
    this.route = route
  }
}

export interface Players{
  top: string;
  jgl: string;
  mid: string;
  adc: string;
  spp: string;
}

export class Tournament {
  public name: string;
  public link: string;
  public date: string;
  public password: string;
  public isPrivate: boolean;
  public matches: Matches;
  public route: string;
  public id: string;

  constructor (
    name: string = '',
    link: string = '',
    date: string = '',
    password: string = '',
    isPrivate: boolean = false,
    matches: Matches = {
      game1: {
        inProgress: false,
        isFinished: false,
        team1: '',
        team2: '',
        winner: ''
      },
      game2: {
        inProgress: false,
        isFinished: false,
        team1: '',
        team2: '',
        winner: ''
      },
      game3: {
        inProgress: false,
        isFinished: false,
        team1: '',
        team2: '',
        winner: ''
      }
    } as Matches,
    route: string = '',
    id: string = ''
  ) {
    this.name = name
    this.link = link
    this.date = date
    this.password = password
    this.isPrivate = isPrivate
    this.matches = matches
    this.route = route
    this.id = id
  }
}

export interface Matches {
  game1: {
    inProgress: boolean,
    isFinished: boolean,
    team1: string,
    team2: string,
    winner: string
  },
  game2: {
    inProgress: boolean,
    isFinished: boolean,
    team1: string,
    team2: string,
    winner: string
  },
  game3: {
    inProgress: boolean,
    isFinished: boolean,
    team1: string,
    team2: string,
    winner: string
  }
}
