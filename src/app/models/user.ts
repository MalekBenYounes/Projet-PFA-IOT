export interface UserClass {
  user:  User;
  token: string;
}

export interface User {
 id:      string;
  mot_pass: string;
  nom:      string;
  prenom:   string;
  email:    string;
  groupe:   string;

}
