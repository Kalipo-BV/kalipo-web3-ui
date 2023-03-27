export const isArray = (payload, errorName) => {
	const result = (Array.isArray(payload));
	logError(result, errorName, payload);

	return result;
}

export const isString = (payload, errorName) => {
	const result = (typeof payload === 'string' || payload === null);
	logError(result, errorName, payload);

	return result;
}

export const isBoolean = (payload, errorName) => {
	const result = (typeof payload === 'boolean' || payload === null);
	logError(result, errorName, payload);

	return result;
}

export const isNumber = (payload, errorName) => {
	const result = (typeof Number.parseFloat(payload) === 'number' || payload === null);
	logError(result, errorName, payload);

	return result;
}

export const isDate = (payload, errorName) => {
	const result = (payload instanceof Date);
	logError(result, errorName, payload);

	return result;
}

export const logError = (bool, errorName, payload) => {
	if (!bool) {
		console.error(`invalid ${errorName} given`, payload);
	}
}