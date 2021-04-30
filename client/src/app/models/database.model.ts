import { RegisterInfo } from '../models/register.model';

export class DatabaseModel {
  
  firstName !: string;
  lastName !: string;
  email !: string;
  password !: string;

  constructor(registerInfo: RegisterInfo) {
    [this.firstName, this.lastName] = this.getFirstAndLastName(registerInfo.firstName);
    this.email = registerInfo.email;
    this.password = registerInfo.password;
  }

  getFirstAndLastName(fullName: string) : string[] {
    let [firstName, lastName] = fullName.split(' ');

    return [firstName, lastName];
  }

}
