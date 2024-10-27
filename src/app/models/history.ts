export interface Hist {
  hist: HistElement[];
}

export interface HistElement {
  id:         string;
  id_place:    string;
  update_date: Date;
  last_state:  boolean;
}
