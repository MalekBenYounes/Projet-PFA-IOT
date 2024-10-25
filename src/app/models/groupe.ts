export interface Groupe {
  _id:          string;
  nom:          string;
  permissions: PermissionElement[];
  __v:          number;
}

export interface Permission {
  permissions: PermissionElement[];
}

export interface PermissionElement {
  _id: string;
  nom: string;
  __v: number;
}
