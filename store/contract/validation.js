import { initContract } from "./initData";

export const isValidContract = (contract) => {
	const _initContract = initContract();
	const initContractKeys = Object.keys(_initContract);
	const initFormDataKeys = Object.keys(_initContract.formData);

	const contractKeys = Object.keys(contract);
	const formDataKeys = Object.keys(contract.formData);
	
	const isContractStructureCorrect = arrayHasValues(contractKeys, initContractKeys);
	const isFormDataStructureCorrect = arrayHasValues(formDataKeys, initFormDataKeys);

	if (!isContractStructureCorrect) {
		console.error("State structure of the loaded agreement is malformed")
		return false;
	}

	if (!isFormDataStructureCorrect) {
		console.error("State structure of the loaded agreement is malformed")
		return false;
	}

	return true;
}

const arrayHasValues = (arrayToCheck, neededValues) => {
	let i=0;
	for (i; i < neededValues.length; i++) {
		const hasValue = arrayToCheck.includes(neededValues[i]);
		if(!hasValue) {
			console.error(`Field doesnt exist ${neededValues[i]}`)
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
	const regex = "[0-9]{4}[-/]{1}[0-9]{2}[-/]{1}[0-9]{2}$";
	const result = (payload.match(regex));
	
	logError(result, errorName, payload);

	return result;
}

export const logError = (bool, errorName, payload) => {
	if (!bool) {
		console.error(`invalid ${errorName} given\n\n`, `payload = ${payload}\n\n`, `typeof payload = ${typeof payload}`);
	}
}