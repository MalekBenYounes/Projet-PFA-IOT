export interface Hist {
  hist: HistElement[];
}

export interface HistElement {
  _id:         string;
  id_place:    string;
  update_date: Date;
  last_state:  boolean;
  __v:         number;
}
