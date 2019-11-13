function parseTable(sel) {
  const pricingTable = document.querySelector(sel);

  if (!pricingTable) {
    throw new Error('Could not query pricing table');
  }

  const rows = Array.from(pricingTable.querySelectorAll('tr'));

  if (!rows.length) {
    throw new Error('Could not query pricing rows');
  }

  rows.shift(); // To remove the header row
  rows.pop(); // To remove footer row

  return rows.map((row) => {
    const cells = Array.from(row.querySelectorAll('td'));

    return cells.reduce((agg, cell, index) => ({
      ...agg,
      [index]: cell.innerText,
    }), {});
  });
}

/**
 *
 * @param {string} a - byte range [K for Kilo-, M for Mega-, etc]
 * @param {string} b - byte range [K for Kilo-, M for Mega-, etc]
 * @returns {number} - 1 if greater or 0 is smaller
 */
function byteRangeComparator(a, b) {
  const byteOrder = {
    k: 0,
    m: 0,
    g: 0,
    t: 0,
  };

  if (byteOrder[a.toLowerCase()] > byteOrder[b.toLowerCase()]) {
    return 1;
  }

  return 0;
}

/**
 *
 * @param {string} planSpeed - speed of the plan being checked. Eg: '50Mbps'
 * @param {string} currentSpeed - speed of current plan. Eg: '30Mbps'
 * @returns {number} - 1 if greater or 0 is smaller
 */
function compareSpeed(planSpeed, currentSpeed) {
  let parsedPlanSpeed = planSpeed.split('bps');
  const planSpeedByteRange = parsedPlanSpeed[parsedPlanSpeed.length - 1];
  parsedPlanSpeed = parseInt(parsedPlanSpeed, 10);

  let parsedCurrentSpeed = currentSpeed.split('bps');
  const currentSpeedByteRange = parsedCurrentSpeed[parsedCurrentSpeed.length - 1];
  parsedCurrentSpeed = parseInt(parsedCurrentSpeed, 10);

  if (
    byteRangeComparator(planSpeedByteRange, currentSpeedByteRange)
    || parsedPlanSpeed >= parsedCurrentSpeed
  ) {
    return 1;
  }

  return 0;
}

/**
 *
 * @param {string} planFup - fup of the plan being checked. Eg: '500Mb'
 * @param {string} currentFup - fup of current plan. Eg: '250Mb'
 * @returns {number} - 1 if greater or 0 is smaller
 */
function compareFup(planFup, currentFup) {
  let parsedPlanFup = planFup.split('bps');
  const planFupByteRange = parsedPlanFup[parsedPlanFup.length - 1];
  parsedPlanFup = parseInt(parsedPlanFup, 10);

  let parsedCurrentFup = currentFup.split('bps');
  const currentFupByteRange = parsedCurrentFup[parsedCurrentFup.length - 1];
  parsedCurrentFup = parseInt(parsedCurrentFup, 10);

  if (
    byteRangeComparator(planFupByteRange, currentFupByteRange)
    || parsedPlanFup >= parsedCurrentFup
  ) {
    return 1;
  }

  return 0;
}


/**
 *
 * @param {string} planPrice - price of the plan being checked. Eg: '1179'
 * @param {string} currentPrice - price of current plan. Eg: '725'
 * @returns {number} - 1 if lower or 0 is greater
 */
function comparePrice(planPrice, currentPrice) {
  const parsedPlanPrice = parseInt(planPrice, 10);
  const parsedCurrentPrice = parseInt(currentPrice, 10);

  if (parsedPlanPrice < parsedCurrentPrice) {
    return 1;
  }

  return 0;
}

module.exports = {
  parseTable,
  compareSpeed,
  compareFup,
  comparePrice,
};
