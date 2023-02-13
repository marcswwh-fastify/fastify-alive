'use strict'

const staticPreset = require('../../lib/checks/static')
const path = require('path')

describe('Static health check creation', () => {

	it('should build a new simple health check object correctly', () => {

		const newHealthCheck = {
			route: '/test',
			path: '../testing',
			prefix: '',
			logLevel: 'info', 
			statusCode: '200'
		}

		expect(staticPreset.createStaticHC(newHealthCheck)).toMatchObject({
			statusCode: '200',
			route: '/test',
			path: path.join(__dirname, '../../testing'),
			prefix: '',
			logLevel: 'info'
		})
	})


	it('should create a route method', () => {

		const newHealthCheck = {
			route: '/test',
			path: '../testing',
			prefix: '',
			logLevel: 'info', 
			statusCode: '200',
			fileName: 'test.html'
		}

		expect(staticPreset.mapRoute(newHealthCheck)).toMatchObject({
			method: 'GET',
			url: '/test',
			handler: expect.any(Function)
		})

	})

})