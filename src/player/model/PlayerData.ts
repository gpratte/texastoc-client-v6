import _ from "lodash";

type Role = {
  id: number;
  type: string;
}

export class PlayerData {
  id: number;
  firstName?: string;
  lastName?: string;
  name: string;
  phone?: string;
  email?: string;
  roles: Array<Role>;

  constructor(id: number, name: string, roles: Array<Role>) {
    this.id = id;
    this.name = name;
    this.roles = roles;
  }

  static fromObj(obj: Object): PlayerData | undefined {
    if (!_.has(obj, 'id') || !_.has(obj, 'name') || !_.has(obj, 'roles')) {
      return undefined;
    }

    const playerData: PlayerData = new PlayerData(_.get(obj, 'id', 0),
      _.get(obj, 'name', ''), PlayerData.getRoles(obj));

    playerData.firstName = _.get(obj, 'firstName');
    playerData.lastName = _.get(obj, 'firstName');
    playerData.phone = _.get(obj, 'phone');
    playerData.email = _.get(obj, 'email');

    return playerData;
  }

  private static getRoles(obj: Object): Array<Role> {
    const roles: Array<Role> = [];
    _.get(obj, 'roles', []).forEach(r => {
      const role: Role = {} as Role;
      role.id = _.get(r, 'id', 0);
      role.type = _.get(r, 'type', '');
      roles.push(role);
    })
    return roles;
  }
}