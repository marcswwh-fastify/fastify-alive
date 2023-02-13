'use strict'

const simplePresets = require('../presets/simple')
const staticPresets = require('../presets/static')
const { createSimpleHC } = require('../checks/simple')
const { createStaticHC} = require('../checks/static')

/**
 * Initialize the logger
 * @param {Object} options 
 * @returns 
 */
const initialize = (options) => {

	// Initilize healthcheck array
	const healthChecks = []

	// Set defaults for presets
	const addHealthChecks = (options.healthChecks === undefined) ? [] : options.healthChecks
	const includeSimple = (options.includeSimple === undefined) ? true : options.includeSimple
	const includeActuator = (options.includeSimpleActuator === undefined) ? true : options.includeSimpleActuator
	const includeLiveness = (options.includeStaticLiveness === undefined) ? true : options.includeStaticLiveness
	const includeSureRoute = (options.includeStaticSureRoute === undefined) ? true : options.includeStaticSureRoute
	const includeTeapot = (options.includeTeapot === undefined) ? false : options.includeTeapot
	
	// Add simple presets
	if(includeSimple)
		healthChecks.push(createSimpleHC(simplePresets.simpleHealth))
	if(includeActuator)
		healthChecks.push(createSimpleHC(simplePresets.springBootEmu))
	
	// Add static presets
	if(includeLiveness)
		healthChecks.push(createStaticHC(staticPresets.livenessHealth))
	if(includeSureRoute)
		healthChecks.push(createStaticHC(staticPresets.sureRouteHealth))
	if(includeTeapot)
		healthChecks.push(createStaticHC(staticPresets.teapotHealth))

	// Add user defined checks
	addHealthChecks.forEach(function (hcObj) {
		if(hcObj.type && hcObj.type === 'static') {
			healthChecks.push(createStaticHC(hcObj))
		}

		if(hcObj.type && hcObj.type === 'simple') {
			healthChecks.push(createSimpleHC(hcObj))
		}
	})

	// Filter out duplicate routes
	healthChecks.filter((value, index, self) =>
		index === self.findIndex((tindex) => (
			tindex.route === value.route
		))
	)

	return healthChecks
}

module.exports = initialize