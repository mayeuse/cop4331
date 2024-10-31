export class LoginPacket {
  // define the properties it'll have
  public login: string;
  public password: string;
 
  // make a constructor
  constructor(login: string, password: string) {
    this.login = login
    this.password = password
  }
}

export class RegisterPacket {
  // define the properties it'll have
  public name: string;
  public email: string;
  public login: string;
  public password: string;
 
  // make a constructor
  constructor(name: string, email: string, login: string, password: string) {
    this.name = name
    this.email = email
    this.login = login
    this.password = password
  }
}