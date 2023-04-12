export const initState = () => {
	return {
		editFase: 3,
		status: "",
		type: "Grant Contract",
		fullySigned: false,
		date: new Date().toISOString(),
		formData: initFormData()
	}
}

export const initFormData = () => {
	return {
		parties: {
			contractor: [],
			client: []
		},
		preample: null,
		purpose: null,
		payment: {
			amount: null,
			note: null,
		},
		dates: {
			startDate: new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10),
			endDate: new Date(new Date().setDate(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).getDate() + 1)).toISOString().substr(0, 10),
		},
		propertyRights: null,
		terminationOfAgreement: null,
		governingLawAndJurisdiction: null,
		finalProvisions: null,
		milestones: [],
		custom: [],
		signingWindow: 0,
		requiredToSign: false,
		signed: false,
	}
}