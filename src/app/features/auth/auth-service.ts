import { inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RoleType, UpdateProfileRequest, User } from '../../core/interfaces/user';
import { UserService } from '../../shared/services/user-service';

@Service()
export class AuthService {
  private userService = inject(UserService);

  private readonly _user = signal<User>({
    id: 'c73a8595-4bfc-4603-ad5a-45ca55b2d9ad',
    username: 'john_doe',
    email: 'john.doe@example.com',
    role: RoleType.SELLER,
  });

  readonly user = this._user.asReadonly();

  getUser() {
    return this._user();
  }

  updateProfile(request: UpdateProfileRequest): Observable<User> {
    return this.userService
      .updateProfile(this._user().id, request)
      .pipe(tap((updated) => this._user.set(updated)));
  }

  updateUserRole(id: string, role: RoleType) {
    console.log('changed role');
  }
}