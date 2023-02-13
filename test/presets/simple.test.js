'use strict'

const simplePreset = require('../../lib/presets/simple')

describe('Simple health check presets', () => {

	it('should build the simple 200 health check object correctly', () => {

		expect(simplePreset.simpleHealth).toMatchObject({
			statusCode: '200',
			route: '/health',
			logLevel: 'info',
			payload: { status: 'UP' }
		})
	})


	it('should build the simple actuator health check object correctly', () => {

		expect(simplePreset.springBootEmu).toMatchObject({
			statusCode: '200',
			route: '/actuator/health',
			logLevel: 'info',
			payload: { status: 'UP' }
		})
	})

})