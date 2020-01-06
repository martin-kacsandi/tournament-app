export interface Team {
  name: string;
  shortName: string;
  players: {
    top: string;
    jgl: string;
    mid: string;
    adc: string;
    spp: string;
  }
}

export class Tournament {
  public name: string;
  public link: string;
  public date: string;
  public password: string;
  public isPrivate: boolean;
  public matches: Match;
  public route: string

  constructor (
    name: string,
    link: string,
    date: string,
    password: string,
    isPrivate: boolean,
    matches: Match = {},
    route: string = ''
  ) {
    this.name = name
    this.link = link
    this.date = date
    this.password = password
    this.isPrivate = isPrivate
    this.matches = matches
    this.route = route
  }
}

export interface Match {

}
