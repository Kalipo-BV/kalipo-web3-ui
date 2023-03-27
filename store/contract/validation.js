export const isArray = (payload, errorName) => {
	const result = (Array.isArray(payload));
	logError(result, errorName);

	return result;
}

export const isString = (payload, errorName) => {
	const result = (typeof payload === 'string');
	logError(result, errorName);

	return result;
}

export const isBoolean = (payload, errorName) => {
	const result = (typeof payload === 'boolean');
	logError(result, errorName);

	return result;
}

export const isNumber = (payload, errorName) => {
	const result = (typeof Number.parseFloat(payload) === 'number');
	logError(result, errorName);

	return result;
}

export const isDate = (payload, errorName) => {
	const result = (payload instanceof DATE);
	logError(result, errorName);

	return result;
}

export const logError = (bool, errorName) => {
	if (!bool) {
		console.error(`invalid ${errorName} given`, payload);
	}
}