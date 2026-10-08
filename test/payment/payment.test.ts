import { PaymentService } from '../../src/payment/payment'

describe('Payment Service', () => {
  let paymentService: PaymentService

  beforeEach(() => {
    paymentService = new PaymentService(100)
  })

  describe('applying discount, ordinary cases', () => {
    test('applying discount 50%', () => {
      paymentService.applyDiscount(50)
      expect(paymentService.amount).toBe(50)
    })

    test('applying discount 0%', () => {
      paymentService.applyDiscount(0)
      expect(paymentService.amount).toBe(100)
    })

    test('applying discount 100%', () => {
      paymentService.applyDiscount(100)
      expect(paymentService.amount).toBe(0)
    })
  })

  describe('applying discount, edge cases', () => {
    test('applying discount 1%', () => {
      paymentService.applyDiscount(1)
      expect(paymentService.amount).toBe(99)
    })

    test('applying discount -1%', () => {
      paymentService.applyDiscount(-1)
      expect(paymentService.amount).toBe(100)
    })

    test('applying discount 101%', () => {
      paymentService.applyDiscount(101)
      expect(paymentService.amount).toBe(100)
    })

    describe('payment', () => {
      test('payment is successfully completed', () => {
        paymentService.pay()
        expect(paymentService.isPaid).toBeTruthy()
      })

      test('payment is unsuccessful', () => {
        paymentService.pay()
        paymentService.pay()
        expect(paymentService.pay()).toBeFalsy()
      })
    })
  })
})

describe('error is expected when amount is below 0', () => {
  let paymentService: PaymentService

  test('applying discount 50%', () => {
    expect(() => new PaymentService(0)).toThrow(
      'The initial amount must be greater than 0',
    )
  })
})
