export { mod, average, rand };

/* The % operator doesn't properly mod negative numbers. This does */
function mod(n, m) {
	return ((n % m) + m) % m;
}

/* Returns the average of the numbers in the array */
function average(arr) {
	let ret = 0;

	for (let i = 0, l = arr.length; i < l; i++)
		ret += arr[i];

	if (arr.length !== 0)
		ret /= arr.length;

	return ret;
}

/* Returns a random integer between min (included) and max (included) */
function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}