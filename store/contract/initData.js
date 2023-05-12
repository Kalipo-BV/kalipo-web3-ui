export const initContract = () => {
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
		preample: "",
		purpose: "",
		payment: {
			amount: 0,
			note: "",
		},
		dates: {
			startDate: new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10),
			endDate: new Date(new Date().setDate(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).getDate() + 1)).toISOString().substr(0, 10),
		},
		propertyRights: "",
		terminationOfAgreement: "",
		governingLawAndJurisdiction: "",
		finalProvisions: "",
		milestones: [],
		custom: [],
		signingWindow: "",
		requiredToSign: false,
		signed: false,
	}
}