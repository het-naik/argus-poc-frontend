import { AfterViewInit, Component, effect, inject, input, output, viewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleType, User } from '../../../core/interfaces/user';
import { ChangeRoleDialog } from '../change-role-dialog/change-role-dialog';

@Component({
  selector: 'app-user-table',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  styleUrl: './user-table.scss',
  templateUrl: './user-table.html',
})
export class UserTable implements AfterViewInit {
  users = input.required<User[]>();
  userUpdated = output<User>();

  displayedColumns: string[] = ['username', 'email', 'role'];
  dataSource = new MatTableDataSource<User>([]);

  paginator = viewChild.required(MatPaginator);
  sort = viewChild.required(MatSort);

  private readonly dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.dataSource.data = this.users();
    });

    this.dataSource.filterPredicate = (u: User, filter: string) =>
      `${u.username} ${u.email} ${u.role}`.toLowerCase().includes(filter);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  openRoleDialog(user: User) {
    this.dialog
      .open<ChangeRoleDialog, User, User>(ChangeRoleDialog, {
        width: '440px',
        data: user,
        autoFocus: 'first-tabbable',
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) this.userUpdated.emit(updated);
      });
  }
}