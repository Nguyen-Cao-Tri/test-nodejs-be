const rentContainers = (neededContainer, listContainers) => {
  
  listContainers.sort(
    (a, b) => a.totalCost / a.container - b.totalCost / b.container
  );

  let rentedContainers = 0;
  const contracts = [];
  let sumContainers = 0;

  for (const listContainer of listContainers) {
    sumContainers += listContainer.container;
    if (rentedContainers >= neededContainer) {
      break;
    }

    const availableContainers = Math.min(
      neededContainer - rentedContainers,
      listContainer.container
    );

    rentedContainers += availableContainers;

    const contract = {
      name: listContainer.name,
      container: availableContainers,
      totalCost: listContainer.totalCost,
    };

    contracts.push(contract);
  }

  const totalCost = contracts.reduce(
    (sum, contract) => sum + contract.totalCost,
    0
  );

  if (sumContainers < neededContainer)
    contracts.push({ text: "Not enough container" });
  return { contracts, totalCost };
};

const case1 = {
  neededContainer: 3,
  listContainers: [
    { name: "Container renter A", container: 1, totalCost: 1 },
    { name: "Container renter B", container: 2, totalCost: 1 },
    { name: "Container renter C", container: 3, totalCost: 3 },
  ],
};

console.log("----------------CASE 1------------------");
const resultCase1 = rentContainers(case1.neededContainer, case1.listContainers);
resultCase1.contracts.forEach((contract) => {
  if (contract.text) {
    console.log(contract.text);
  } else
    console.log(
      `[Contract with] ${contract.name} ${contract.container} container(s), price: ${contract.totalCost}`
    );
});

console.log(`[Summary] total cost: ${resultCase1.totalCost}`);
console.log("----------------CASE 2------------------");

const case2 = {
  neededContainer: 10,
  listContainers: [
    { name: "Container renter A", container: 5, totalCost: 5 },
    { name: "Container renter B", container: 2, totalCost: 10 },
    { name: "Container renter C", container: 2, totalCost: 3 },
  ],
};
const resultCase2 = rentContainers(case2.neededContainer, case2.listContainers);
resultCase2.contracts.forEach((contract) => {
  if (contract.text) {
    console.log(contract.text);
  } else
    console.log(
      `[Contract with] ${contract.name} ${contract.container} container(s), price: ${contract.totalCost}`
    );
});

console.log(`[Summary] total cost: ${resultCase2.totalCost}`);
console.log("----------------CASE 3------------------");

const case3 = {
  neededContainer: 10,
  listContainers: [
    { name: "Container renter A", container: 5, totalCost: 5 },
    { name: "Container renter B", container: 2, totalCost: 10 },
    { name: "Container renter C", container: 10, totalCost: 3 },
  ],
};
const resultCase3 = rentContainers(case3.neededContainer, case3.listContainers);
resultCase3.contracts.forEach((contract) => {
  if (contract.text) {
    console.log(contract.text);
  } else
    console.log(
      `[Contract with] ${contract.name} ${contract.container} container(s), price: ${contract.totalCost}`
    );
});
console.log(`[Summary] total cost: ${resultCase3.totalCost}`);
