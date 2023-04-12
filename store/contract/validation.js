import { initState } from "./initData";

export const isValidContract = (contract) => {
	const _initState = initState();
	const initStateKeys = Object.keys(_initState);
	const initFormDataKeys = Object.keys(_initState.formData);

	const stateKeys = Object.keys(contract);
	const formDataKeys = Object.keys(contract.formData);

	arrayHasValues(initStateKeys, stateKeys);
	arrayHasValues(initFormDataKeys, formDataKeys);

	return true;
}

const arrayHasValues = (arrayToCheck, valuesArray) => {
	
	let i=0;
	for (i; i<valuesArray.length; i++) {
		const hasValue = arrayToCheck.includes(valuesArray[i]);
		if(!hasValue) {
			return false;
		}
	}
	return true;
};

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