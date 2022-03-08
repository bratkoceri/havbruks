export interface IBoat {
    id: number;
    name: string;
    producer: string;
    buildNumber: number;
    loa: number;
    b: number;
    picture: string;
    crew: ICrewMember[];
  }
  
  export interface ICrewMember {
    id: number;
    name: string
    picture?: string;
    age: number;
    email: string;
    role: CrewRole;
    certifiedUntil: string;
    boatId: number;
  }

  export enum CrewRole {
    Captain = 'Captain',
    DeckCadet = 'DeckCadet',
    ChiefEngineer = 'ChiefEngineer',
    Motorman = 'Motorman'
  }

  export interface ICrewForm {
    name: string
    picture?: string
    age: number
    email: string
    role: CrewRole
  }
  
  export interface IBoatForm {
    name: string
    producer: string
    buildNumber: string
    loa: number
    b: number
    picture: string
  }