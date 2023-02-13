'use strict'

const staticPreset = require('../../lib/presets/static')

describe('Static health check presets', () => {

	it('should build the liveness health check object correctly', () => {

		expect(staticPreset.livenessHealth).toMatchObject({
			statusCode: '200',
			route: '/gtm',
			path: '/files/gtm',
			prefix: '/gtm/',
			logLevel: 'info'
		})
	})


	it('should build the sureroute health check object correctly', () => {

		expect(staticPreset.sureRouteHealth).toMatchObject({
			statusCode: '200',
			route: '/akamai',
			path: '/files/akamai',
			prefix: '/akamai/',
			logLevel: 'info'
		})
	})

})