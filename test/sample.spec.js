/* global it describe */
const { expect } = require('chai');

// ARRANGE
const { add, rem } = require('../src/utils');

// Test Suite
describe('Sample tests', () => {
  // Tests
  it('This is a sum test', () => {
    // ARRANGE
    const v1 = 10;
    const v2 = 20;
    const expectedValue = 30;

    // ACT
    const res = add(v1, v2);

    // Assert
    expect(res).to.be.equal(expectedValue);
  });

  it('This is a rem test', () => {
    // ARRANGE
    const v1 = 20;
    const v2 = 10;
    const expectedValue = 10;

    // ACT
    const res = rem(v1, v2);

    // Assert
    expect(res).to.be.equal(expectedValue);
  });
});
