const convertToGameTime: (timeInMS: number) => number
= (timeInMS) => Math.round(timeInMS * 0.05);

export default convertToGameTime;
