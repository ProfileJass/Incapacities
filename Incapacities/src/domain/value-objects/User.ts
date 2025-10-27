export class User {
  constructor(
    public readonly id_user: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly role: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.firstName || this.firstName.trim().length === 0) {
      throw new Error('First name is required');
    }
    if (!this.lastName || this.lastName.trim().length === 0) {
      throw new Error('Last name is required');
    }
    if (!this.email || !this.isValidEmail(this.email)) {
      throw new Error('Valid email is required');
    }
    if (!this.role || this.role.trim().length === 0) {
      throw new Error('Role is required');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
