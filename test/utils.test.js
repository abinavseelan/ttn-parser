const {
  comparePrice,
  compareFup,
  compareSpeed,
} = require('../utils');

describe('comparePrice', () => {
  test('New plan is greater than current plan', () => {
    expect(comparePrice('1000', '725')).toBe(0);
  });

  test('New plan is less than current plan', () => {
    expect(comparePrice('725', '1000')).toBe(1);
  });

  test('New plan is equal to current plan', () => {
    expect(comparePrice('1000', '1000')).toBe(0);
  });
});

describe('compareFup', () => {
  test('New plan is better than current plan', () => {
    expect(compareFup('600GB', '500GB')).toBe(1);
  });

  test('New plan is worse than current plan', () => {
    expect(compareFup('400GB', '500GB')).toBe(0);
  });

  test('New plan has moved up a byte range', () => {
    expect(compareFup('1TB', '500GB')).toBe(1);
    expect(compareFup('1tb', '500gb')).toBe(1);
  });
});


describe('compareSpeed', () => {
  test('New plan is better than current plan', () => {
    expect(compareSpeed('100Mbps', '50Mbps')).toBe(1);
  });

  test('New plan is worse than current plan', () => {
    expect(compareSpeed('3Mbps', '50Mbps')).toBe(0);
  });

  test('New plan is moved up a byte range', () => {
    expect(compareSpeed('1Gbps', '50Mbps')).toBe(1);
    expect(compareSpeed('1GbPs', '50mBps')).toBe(1);
  });
});
