import { monthNames } from '@/data/Dashboard/months';

export const getGraphData = (arr) => {
  const resultMap = {};

  for (const item of arr) {
    const createdAt = item.createdAt;
    const price = item.price;

    if (!resultMap[createdAt]) {
      resultMap[createdAt] = { createdAt, price };
    } else {
      resultMap[createdAt].price += price;
    }
  }

  const result = monthNames.map((monthName, index) => {
    const monthIndex = index;
    const monthData = resultMap[monthIndex];
    const price = monthData ? monthData.price : 0;

    return {
      createdAt: monthName,
      price: price,
    };
  });

  return result;
};
