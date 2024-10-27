export interface Etage {
  id:    string;
  nom:    string;
  places: Place[];

}

export interface Place {
  id:   string;
  num:   number;
  etat:  boolean;
  owner: string;
 
}

export interface Places {
  places: Place[];
}
