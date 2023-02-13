'use strict'

const simpleHealth = {
	type: 'simple',
	route: '/health', 
	logLevel: 'info', 
	statusCode: '200', 
	payload: { status: 'UP' },
	headOnly: false	
}

const springBootEmu = {
	type: 'simple',
	route: '/actuator/health', 
	logLevel: 'info', 
	statusCode: '200', 
	payload: { status: 'UP' },
	headOnly: false
}

module.exports = {
	simpleHealth,
	springBootEmu
}