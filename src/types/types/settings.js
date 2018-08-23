//@flow

export type  proApiKeys = {
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

/**
 * Type that describes the styleIncludes settings
 */
export type styleIncludesSettings = {
	'SETTINGS/STYLE_INCLUDES/FORM': boolean,
	'SETTINGS/STYLE_INCLUDES/GRID': boolean,
	'SETTINGS/STYLE_INCLUDES/ALERT': boolean,
}

/**
 * Type that describes the other settings
 */
export type otherSettings = {
	'SETTINGS/CDN': boolean,
}