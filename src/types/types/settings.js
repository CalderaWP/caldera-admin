//@flow

export type proApiKeys = {
	proPublicKey: string,
	proPrivateKey: string,
};

/**
 * Type that describes the CF Pro general settings
 */
export type proGeneralSettings = {
	enhancedDelivery: boolean,
	logLevel: Array<string>
}

/**
 * Type that describes the CF Pro local settings
 */
export type proSettings = {
	connected: boolean,
	apiKeys: proApiKeys,
	proGeneralSettings: proGeneralSettings,
	formSettings: Object
};



export type settingsType = {
	generalSettings: {
		form: boolean,
		grid: boolean,
		alert: boolean,
		cdn: boolean
	},
	proSettings: proSettings
}