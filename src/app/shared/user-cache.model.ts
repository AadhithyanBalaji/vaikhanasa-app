export class UserCache {
  constructor(
    public userName: string = '',
    public isAuthenticated = false,
    public isAdmin = false
  ) {}
}
