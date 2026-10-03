import { inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RoleType, UpdateProfileRequest, User } from '../../core/interfaces/user';
import { UserService } from '../../shared/services/user-service';

@Service()
export class AuthService {
  private userService = inject(UserService);

  private readonly _user = signal<User>({
    id: '88c6dc18-755b-4c41-9dd9-6f6c1cc6ba8e',
    username: 'john_doe',
    email: 'john.doe@example.com',
    role: RoleType.CUSTOMER,
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