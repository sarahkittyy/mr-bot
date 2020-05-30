const asyncForEach = async (array: any[], fn: (v: any,) => Promise<any>) => {
	for(let i of array) {
		await fn(i);
	}
};

export default asyncForEach;