export class PaymentService {
  isPaid: boolean = false
  amount: number = 0

  constructor(amount: number) {
    if (amount <= 0) {
      throw new Error('The initial amount must be greater than 0')
    }
    this.amount = amount
  }

  applyDiscount(percent: number): void {
    if (percent >= 0 && percent <= 100 && !this.isPaid) {
      this.amount -= (this.amount / 100) * percent
    }
  }

  pay(): boolean {
    if (this.isPaid) {
      return false
    } else {
      this.isPaid = true
      return true
    }
  }
}
