import { Service, Signal, signal } from '@angular/core';
import { RoleType, User } from '../../core/interfaces/User';

@Service()
export class AuthService {
  private dummyUserSignal: Signal<User> = signal({
    id: '3f8b1a2c-7d4e-4b6a-9f8e-1c2d3e4f5a6b',
    username: 'johndoe_dev',
    email: 'john.doe@example.com',
    role: RoleType.SELLER
  });

  // constructor (private toastr: Toastr) {

  // }

  getUser() {
    return this.dummyUserSignal();
  }


  updateUserRole(id: string, role: RoleType){
    console.log("changed role");
    
  }

}
