export class Payroll {
  constructor(
    public readonly id_payroll: string,
    public readonly id_company: string,
    public readonly nameCompany: string,
    public readonly NIT: string,
    public readonly adressCompany: string,
    public readonly phone: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.nameCompany || this.nameCompany.trim().length === 0) {
      throw new Error('Company name is required');
    }
    if (!this.NIT || this.NIT.trim().length === 0) {
      throw new Error('NIT is required');
    }
    if (!this.adressCompany || this.adressCompany.trim().length === 0) {
      throw new Error('Company address is required');
    }
    if (!this.phone || this.phone.trim().length === 0) {
      throw new Error('Phone is required');
    }
  }
}
