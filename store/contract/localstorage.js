import { isArray, isObject, isBoolean, isDate, isNumber, isId, isString, isValidPartyData, isNotNull } from "./validation.js"
import { isValidContract } from "./validation.js"
import { initContract } from "./initData.js";

let isLocalStorageChecked = false;

export const saveToLocalStorage = (contract, id = 0) => {
	if (isValidContract(contract)) {
		const data = putContractToLocalStorageData(contract, id);
		saveInLocalStorage(data);
	}
}

export const saveNewToLocalStorage = (contract) => {
	if (isValidContract(contract)) {
		const { data, id } = addContractToLocalStorageData(contract);
		saveInLocalStorage(data);
		return id;
	};

	return -1;
}

export const getFromLocalStorage = (id = 0) => {
	const contracten = getNormalizedLocalStorageData();
	const contract = contracten[id];

	if (!isNotNull(contract)) {
		console.error(`[contract Store] getFromLocalstorage cant load the contract with id:${id} = null \n Maybe it doesnt exist in the local storage`)
		return null;
	}

	if (!isValidContract(contract)) {
		console.warn("[contract store] getFromLocalstorage uses a fallback to fill the holes in its required dataStructure");
		return normalizeContract(contract);;
	}

	return contract;
}

export const getAllFromLocalStorage = () => {
	setEmptyLocalStorageIfNotSet();
	const localStorageReference = localStorage.getItem("Agreements");
	return JSON.parse(localStorageReference);
}

export const normalizeContract = (contract) => {
	return extractDataByObject(initContract(), contract);
}

/**
 * this function creates a object in the format of the required object
 * every field that matches in the given object will be copied over
 * every missing field will be created empty
 * 
 * This method does this recursively for all objects within the required object
 * currently this method does not support 2d arrays, 3d+ arrays and objects within arrays
 */
function extractDataByObject(requiredObject, givenObject) {
	const result = {};

	for (const key in requiredObject) {
		const currentRequiredProp = requiredObject[key];
		const currentGivenProp    = givenObject[key];

		if (currentGivenProp === undefined || currentGivenProp === null) {
			result[key] = currentRequiredProp;
			console.warn(`[contract store] uses a fallback for the following key -> ${key}\n key is not defined or null`);
			continue;
		}


		const isRequiredPropObject = (typeof currentRequiredProp === 'object' && !Array.isArray(currentRequiredProp));
		const isGivenPropObject = (typeof currentGivenProp === 'object' && !Array.isArray(currentGivenProp));
		if (isRequiredPropObject) {
			if (isGivenPropObject) {
				const data = extractDataByObject(currentRequiredProp, currentGivenProp);
				result[key] = data;

			} else {
				result[key] = currentRequiredProp
				console.warn(`[contract store] uses a fallback for the following key -> ${key}\n key is not an object`);
			}
			continue;
		}
		
		if (Array.isArray(currentRequiredProp)) {
			if (Array.isArray(currentGivenProp)) {
				result[key] = currentGivenProp;
			} else {
				result[key] = currentRequiredProp
				console.warn(`[contract store] uses a fallback for the following key -> ${key}\n key is not an array`);
			}
			continue;
		}

		result[key] = currentGivenProp;
	}
	return result;
}


function getHighestKeyInLocalStorage() {
	const data = getNormalizedLocalStorageData();	
	const keys = Object.keys(data);

	if (keys.length == 0) {
		return 0;
	}

	return Math.max(...keys) * 1;
};

function addContractToLocalStorageData(contract) {
	const newKey = getHighestKeyInLocalStorage() +1;
	const data = putContractToLocalStorageData(contract, newKey)

	return {data, id: newKey}
}

function putContractToLocalStorageData(contract, id) {
	if (isNotNull(contract)) {
		const data = getNormalizedLocalStorageData();
		data[id] = contract;

		return data;
	} else {
		console.error(`[contract store] in putContractToLocalStorageData the contract is null`)
		return false;
	}
}

function saveInLocalStorage(data) {
	const dataJson = JSON.stringify(data);

	if (isNotNull(dataJson)) {
		localStorage.setItem("Agreements", dataJson);
	}
}

function getNormalizedLocalStorageData() {
	setEmptyLocalStorageIfNotSet();
	const localStorageReference = localStorage.getItem("Agreements");
	return JSON.parse(localStorageReference);
}

function setEmptyLocalStorageIfNotSet() {
	if(!isLocalStorageChecked) {
		const localStorageReference = localStorage.getItem("Agreements");
		if (!isNotNull(localStorageReference)) {
			localStorage.setItem("Agreements", JSON.stringify({}));
		}

		isLocalStorageChecked = true;
	};
}