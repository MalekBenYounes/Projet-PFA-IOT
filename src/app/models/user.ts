export interface UserClass {
  user:  User;
  token: string;
}

export interface User {
  _id:      string;
  id:       string;
  mot_pass: string;
  nom:      string;
  prenom:   string;
  email:    string;
  groupe:   string;
  __v:      number;
}
