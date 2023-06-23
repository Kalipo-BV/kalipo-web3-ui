import { initContract } from "./initData";

/**
 * checks if the contract has the required structure
 */
export const isValidContract = (contract) => {
	const _initContract = initContract();
	const initContractKeys = Object.keys(_initContract);
	const initFormDataKeys = Object.keys(_initContract.formData);

	const contractKeys = Object.keys(contract);
	const formDataKeys = Object.keys(contract.formData);
	
	const isContractStructureCorrect = arrayHasValues(contractKeys, initContractKeys);
	const isFormDataStructureCorrect = arrayHasValues(formDataKeys, initFormDataKeys);

	if (!isContractStructureCorrect) {
		console.error("[contract store] State structure of the loaded agreement is malformed")
		return false;
	}

	if (!isFormDataStructureCorrect) {
		console.error("[contract store] State structure of the loaded agreement is malformed")
		return false;
	}

	return true;
}

/**
 * checks if the array has the required values
 */
const arrayHasValues = (arrayToCheck, neededValues) => {
	let i=0;
	for (i; i < neededValues.length; i++) {
		const hasValue = arrayToCheck.includes(neededValues[i]);
		if(!hasValue) {
			console.error(`[contract store] Field doesnt exist ${neededValues[i]}`)
			return false;
		}
	}
	return true;
};

/**
 * checks if the payload is not null
 */
export const isNotNull = (payload, errorName) => {
	const result = (payload !== undefined && payload !== null);
	logError(result, errorName, payload);

	return result;
}

/**
 * checks if the payload is an array
 */
export const isArray = (payload, errorName) => {
	const result = (Array.isArray(payload));
	logError(result, errorName, payload);

	return result;
}

/**
 * checks if the partyData is correct
 */
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

/**
 * Checks if the payload is an object and not an array
 */
export const isObject = (payload, errorName) => {
	const result = (typeof payload === 'object' && !Array.isArray(payload));
	logError(result, errorName, payload);

	return result;
}

/**
 * checks if the string is a string && not an object, array
 */
export const isString = (payload, errorName) => {
	const result = (typeof payload === 'string' || payload === null);
	logError(result, errorName, payload);

	return result;
}

/**
 * checks if the boolean is a boolean
 */
export const isBoolean = (payload, errorName) => {
	const result = (typeof payload === 'boolean' || payload === null);
	logError(result, errorName, payload);

	return result;
}

/**
 * checks if the number is a number
 */
export const isNumber = (payload, errorName) => {
	const result = (typeof Number.parseFloat(payload) === 'number' || payload === null);
	logError(result, errorName, payload);

	return result;
}

/**
 * checks if the id is not negative and is a number
 */
export const isId = (payload, errorName) => {
	const result = (isNumber(payload, errorName) && payload >= 0);
	logError(result, errorName, payload);

	return result;
}

/**
 * checks if the date fullfills the required format
 */
export const isDate = (payload, errorName) => {
	const regex = "[0-9]{4}[-/]{1}[0-9]{2}[-/]{1}[0-9]{2}$";
	const result = (payload.match(regex));
	
	logError(result, errorName, payload);

	return result;
}

/**
 * logs errors if an errorName is provided
 */
export const logError = (bool, errorName, payload) => {
	if (errorName !== undefined && !bool) {
		console.error(`[contract store] ${errorName}\n\n`, `payload = ${payload}\n\n`, `typeof payload = ${typeof payload}`);
	}
}

/**
 * checks if the object are of the same length and throws a warning if this isn't the case
 */
export const objectIsSameLength = (object1, object2, showWarning=false) => {
	if (Object.keys(object1).length !== Object.keys(object2).length) {
		if (showWarning) {
			console.warn("contract.formdata its length is different then the proposed change in payload");
		}
		
		return false;
	}

	return true;
}

/**
 * checks if the keys for a string or data change are correcly given
 */
export function genericErrorChecking(payload, state, type = 'string') {
	if (payload.key === undefined) {
		console.error('payload.key is not defined');
		return false;
	}

	if (type === 'string' && state.body.formData[payload.key] === undefined) {
		console.error('state.body.formData[payload.key] is undefined');
		return false;

	} else if (type === 'date' && state.body.formData.dates[payload.key] === undefined) {
		console.error('state.body.formData.dates[payload.key] is undefined');
		return false;
	}

	if (payload.content === undefined) {
		console.error('payload.content is not defined');
		return false;
	}

	return true;
}