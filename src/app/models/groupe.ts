export interface Groupe {
  id:          string;
  nom:          string;
  permissions: PermissionElement[];

}

export interface Permission {
  permissions: PermissionElement[];
}

export interface PermissionElement {
  id: string;
  nom: string;

}
