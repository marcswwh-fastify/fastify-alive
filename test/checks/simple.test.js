'use strict'

const simplePreset = require('../../lib/checks/simple')

describe('Simple health check creation', () => {

	it('should build a new simple health check object correctly', () => {

		const newHealthCheck = {
			route: '/test',
			logLevel: 'info', 
			statusCode: '200',
			headOnly: false
		}

		expect(simplePreset.createSimpleHC(newHealthCheck)).toMatchObject({
			statusCode: '200',
			route: '/test',
			logLevel: 'info'
		})
	})

	it('should create a HEAD route method', () => {

		const newHealthCheck = {
			route: '/test',
			logLevel: 'info', 
			statusCode: '200',
			headOnly: true
		}

		expect(simplePreset.mapRoute(newHealthCheck)).toMatchObject({
			method: 'HEAD',
			url: '/test',
			handler: expect.any(Function)
		})

	})

	it('should create a GET route method', () => {

		const newHealthCheck = {
			route: '/test',
			logLevel: 'info', 
			statusCode: '200',
			headOnly: false
		}

		expect(simplePreset.mapRoute(newHealthCheck)).toMatchObject({
			method: 'GET',
			url: '/test',
			handler: expect.any(Function)
		})
	})
})