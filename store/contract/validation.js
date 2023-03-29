export const isArray = (payload, errorName) => {
	const result = (Array.isArray(payload));
	logError(result, errorName, payload);

	return result;
}

export const isValidPartyData = (payload) => {
	if (isObject(payload, 'partiesObject')) {
		const { target, data } = payload;

		if (isString(target, `parties[target]`)) {
			if (target !== "client" && target !== "contractor") {
				return false;
			}
			return true;
		}
	}
	return false;
}

export const isObject = (payload, errorName) => {
	const result = (typeof payload === 'object' && !Array.isArray(payload));
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
	const regex = "/[0-9]{1,4}[-/]{1}[0-9]{1,4}[-/]{1}[0-9]$/";
	const result = (payload.match(regex));
	
	logError(result, errorName, payload);

	return result;
}

export const logError = (bool, errorName, payload) => {
	if (!bool) {
		console.error(`invalid ${errorName} given\n\n`, `payload = ${payload}\n\n`, `typeof payload = ${typeof payload}`);
	}
}