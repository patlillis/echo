export { mod, average };

//JS doesn't properly mod negative numbers
function mod(n, m) {
	return ((n % m) + m) % m;
}

function average(arr) {
	let ret = 0;

	for (let i = 0, l = arr.length; i < l; i++)
		ret += arr[i];

	if (arr.length != 0)
		ret /= arr.length;

	return ret;
}