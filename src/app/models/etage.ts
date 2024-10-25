export interface Etage {
  _id:    string;
  nom:    string;
  places: Place[];
  __v:    number;
}

export interface Place {
  _id:   string;
  num:   number;
  etat:  boolean;
  owner: string;
  __v:   number;
}

export interface Places {
  places: Place[];
}
