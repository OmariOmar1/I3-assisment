export function findOutlier(integers: number[]): number {

  let evenCount = 0, oddCount = 0;
  let lastEven = 0, lastOdd = 0;

  
  for (let i = 0; i < 3; i++) { // i am taking the first 3 numbers because the outlier is only one number so the majority of 3 is enough  
      if (isEven(integers[i])) { 
          evenCount++;
          lastEven = integers[i];  // save the last seen even number
      } else {
          oddCount++;
          lastOdd = integers[i];   // save the last seen odd number
      }
  }

  
  const isEvenMajority = evenCount > oddCount; // majority as even if there are more evens in the first three elements

  // go through the array to find and return the outlier
  for (const intgerNum of integers) {
      if (isEven(intgerNum)!== isEvenMajority) {//  if its type is not the majority type
          return intgerNum;  
      }
  }

  return isEvenMajority ? lastOdd : lastEven;
}

function isEven(num: number): boolean {
  return num % 2 === 0;
}

