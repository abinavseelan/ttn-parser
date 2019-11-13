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

function compareSpeed(planSpeed, currentSpeed) {
  // TODO: Figure out how to handle Mbps to Gbps since 1Gbps is better than 500Mbps
  const parsedPlanSpeed = parseInt(planSpeed.split(/[MG]bps/)[0], 10);
  const parsedCurrentSpeed = parseInt(currentSpeed.split(/[MG]bps/)[0], 10);

  if (parsedPlanSpeed >= parsedCurrentSpeed) {
    return 1;
  }

  return 0;
}

function compareFup(planFup, currentFup) {
  // TODO: Figure out how to handle GB to TB since 1TB is better than 999Gb
  const parsedPlanFup = parseInt(planFup.split(/[GT]B/)[0], 10);
  const parsedCurrentFup = parseInt(currentFup.split(/[GT]B/)[0], 10);

  if (parsedPlanFup >= parsedCurrentFup) {
    return 1;
  }

  return 0;
}

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
