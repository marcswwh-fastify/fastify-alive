'use strict'

//const staticHC = require('../checks/static')

const livenessHealth = {
	type: 'static',
	route: '/gtm',
	path: '/files/gtm',
	prefix: '/gtm/',
	logLevel: 'info', 
	statusCode: '200', 
	fileName: 'liveness.txt'
}

const sureRouteHealth = {
	type: 'static',
	route: '/akamai',
	path: '/files/akamai',
	prefix: '/akamai/',
	logLevel: 'info', 
	statusCode: '200', 
	fileName: 'surereoute-test-object.html'
}

const teapotHealth = {
	type: 'static',
	route: '/teapot',
	path: '/files/teapot',
	prefix: '/teapot',
	logLevel: 'info', 
	statusCode: '418'
}

module.exports = {
	livenessHealth,
	sureRouteHealth,
	teapotHealth
}