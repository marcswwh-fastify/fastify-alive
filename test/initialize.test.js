'use strict'

const initialize = require('../lib/utils/initialize')

describe('Simple health check creation', () => {

	it('should build a new simple health check object correctly', () => {

		const options = {
			healthChecks: [
				{
					type: 'simple',
					route: '/info', 
					logLevel: 'info', 
					statusCode: '200', 
					payload: { status: 'UP' },
					headOnly: false
				}
			],
			includeSimple: false,
			includeSimpleActuator: false,
			includeStaticLiveness: false,
			includeStaticSureRoute: false,
			includeTeapot: false			
		}

		expect(initialize(options)).toMatchObject([
			{
				'headOnly': false,
				'logLevel': 'info',
				'payload': {
					'status': 'UP'
				},
				'route': '/info',
				'statusCode': '200',	
				'type': 'simple'
			}
		])
	})

	it('should build a new static health check object correctly', () => {

		const options = {
			healthChecks: [
				{
					type: 'static',
					route: '/testing',
					path: '/testing',
					prefix: '/testing/',
					logLevel: 'info', 
					statusCode: '200' 
				}
			],
			includeSimple: false,
			includeSimpleActuator: false,
			includeStaticLiveness: false,
			includeStaticSureRoute: false		
		}

		expect(initialize(options)).toMatchObject([
			{
				'logLevel': 'info',
				'route': '/testing',
				'statusCode': '200',	
				'type': 'static'
			}
		])
	})

})