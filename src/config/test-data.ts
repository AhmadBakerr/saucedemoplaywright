export const TestData = {
  users: {
    standard: process.env.STANDARD_USER || 'standard_user',
    locked: process.env.LOCKED_USER || 'locked_out_user',
    problem: 'problem_user',
    performance: 'performance_glitch_user'
  },
  password: process.env.PASSWORD || 'secret_sauce',
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTShirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    tShirtRed: 'Test.allTheThings() T-Shirt (Red)'
  },
  checkoutInfo: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  }
};