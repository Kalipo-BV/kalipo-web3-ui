import { isValidContract } from "./validation.js"
import { initState } from "./initData.js";

export const saveToLocalstorage = (contract) => {
	const data = JSON.stringify(contract);
	localStorage.setItem("Agreements", data);
}

export const getFromLocalstorage = () => {
	if (localStorage.getItem("Agreements") == null) {
		console.warn("no Agreements in localstorage");
		return null;
	}

	const contract = JSON.parse(localStorage.getItem("Agreements"));

	if (!isValidContract(contract)) {
		console.warn("getFromLocalstorage uses a fallback to fill the holes in its required dataStructure");
		return normalizeContract(contract);;
	}

	return contract;
}


export const normalizeContract = (contract) => {
	return extractDataByObject(initState(), contract);
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
			console.warn(`uses a fallback for the following key -> ${key}\n key is not defined or null`);
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
				console.warn(`uses a fallback for the following key -> ${key}\n key is not an object`);
			}
			continue;
		}


		
		if (Array.isArray(currentRequiredProp)) {
			if (Array.isArray(currentGivenProp)) {
				result[key] = currentGivenProp;
			} else {
				result[key] = currentRequiredProp
				console.warn(`uses a fallback for the following key -> ${key}\n key is not an array`);
			}
			continue;
		}

		result[key] = currentGivenProp;
	}
	return result;
}

function addContractToLocalStorage(contract, id) {
	const data = getNormalizedLocalStorageData();
	data[id] = contract;

	return data;
}

function saveInLocalStorage(data) {
	const dataJson = JSON.stringify(data);
	localStorage.setItem("Agreements", dataJson);
}

function getNormalizedLocalStorageData() {
	const localStorageReference = localStorage.getItem("Agreements");
	if (localStorageReference == null) {
		return {};
	}

	return JSON.parse(localStorageReference);
}