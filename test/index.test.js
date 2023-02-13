'use strict'

/**
 * @file Tests for fastify health check plugin
 * @author Marc Arakill
 */
const Fastify = require('fastify')
const fs = require('fs')
const path = require('path')

describe('Healthcheck endpoints', () => {
	it('should respond with 200 and payload for a simple check', async () => {
		const fastify = Fastify()

		await fastify.register(require('../lib/index'),
			{
				includeSimple: true,
				includeSimpleActuator: false,
				includeStaticLiveness: false,
				includeStaticSureRoute: false,
				includeTeapot: false		
			}
		)

		const response = await fastify.inject({
			method: 'GET',
			url: '/health'
		})
		expect(response.statusCode).toEqual(200)
		expect(response.statusMessage).toEqual('OK')
		expect(response.body).toEqual('{"status":"UP"}')


		fastify.close()
	})

	it('should respond with 200 and payload for actuator', async () => {
		const fastify = Fastify()

		await fastify.register(require('../lib/index'),
			{
				includeSimple: false,
				includeSimpleActuator: true,
				includeStaticLiveness: false,
				includeStaticSureRoute: false,
				includeTeapot: false		
			}
		)

		const response = await fastify.inject({
			method: 'GET',
			url: '/actuator/health'
		})
		expect(response.statusCode).toEqual(200)
		expect(response.statusMessage).toEqual('OK')
		expect(response.body).toEqual('{"status":"UP"}')


		fastify.close()
	})

	it('should support head requests for a simple check', async () => {
		const fastify = Fastify()

		await fastify.register(require('../lib/index'),
			{
				includeSimple: false,
				includeSimpleActuator: false,
				includeStaticLiveness: false,
				includeStaticSureRoute: false,
				includeTeapot: true,
				healthChecks: [{
					type: 'simple',
					route: '/test',
					logLevel: 'info', 
					statusCode: '200',
					payload: 'hi',
					headOnly: true
				}]		
			}
		)

		const response = await fastify.inject({
			method: 'HEAD',
			url: '/test'
		})
		expect(response.statusCode).toEqual(200)
		expect(response.statusMessage).toEqual('OK')
		expect(response.body).toEqual('{}')


		fastify.close()
	})

	it('should respond with 200 and payload for a static liveness check', async () => {
		const fastify = Fastify()

		await fastify.register(require('../lib/index'),
			{
				includeSimple: false,
				includeSimpleActuator: false,
				includeStaticLiveness: true,
				includeStaticSureRoute: false,
				includeTeapot: false		
			}
		)

		const response = await fastify.inject({
			method: 'GET',
			url: '/gtm/liveness.txt'
		})

		//const responseSpy = jest.spyOn(response, 'sendFile')

		const buffer = fs.readFileSync(path.join(__dirname, '../lib/files/gtm/liveness.txt'))
		expect(response.statusCode).toEqual(200)
		expect(response.statusMessage).toEqual('OK')
		expect(response.body).toEqual(buffer.toString())
		expect(response.payload).toEqual(buffer.toString())

		fastify.close()
	})

	it('should respond with 200 and payload for a static sureroute check', async () => {
		const fastify = Fastify()

		await fastify.register(require('../lib/index'),
			{
				includeSimple: false,
				includeSimpleActuator: false,
				includeStaticLiveness: false,
				includeStaticSureRoute: true,
				includeTeapot: false		
			}
		)

		const response = await fastify.inject({
			method: 'GET',
			url: '/akamai/sureroute-test-object.html'
		})

		const buffer = fs.readFileSync(path.join(__dirname, '../lib/files/akamai/sureroute-test-object.html'))
		expect(response.statusCode).toEqual(200)
		expect(response.statusMessage).toEqual('OK')
		expect(response.body).toEqual(buffer.toString())
		expect(response.payload).toEqual(buffer.toString())

		fastify.close()
	})


	it('should respond with 200 and payload for a static teapot check', async () => {
		const fastify = Fastify()

		await fastify.register(require('../lib/index'),
			{
				includeTeapot: true		
			}
		)

		const response = await fastify.inject({
			method: 'GET',
			url: '/teapot/index.html'
		})

		const buffer = fs.readFileSync(path.join(__dirname, '../lib/files/teapot/index.html'))
		expect(response.statusCode).toEqual(200)
		expect(response.statusMessage).toEqual('OK')
		expect(response.body).toEqual(buffer.toString())
		expect(response.payload).toEqual(buffer.toString())

		fastify.close()
	})

	it('should not add a static path twicw', async () => {
		const fastify = Fastify()

		await fastify.register(require('../lib/index'),
			{
				includeStaticLiveness: true,
				healthChecks: [
					{
						type: 'static',
						route: '/gtm2',
						path: '/files/gtm',
						prefix: '/gtm2/',
						logLevel: 'info',
						statusCode: '200'
					}
				]	
			}
		)

		const response = await fastify.inject({
			method: 'GET',
			url: '/gtm/liveness.txt'
		})

		const buffer = fs.readFileSync(path.join(__dirname, '../lib/files/gtm/liveness.txt'))
		expect(response.statusCode).toEqual(200)
		expect(response.statusMessage).toEqual('OK')
		expect(response.body).toEqual(buffer.toString())

		fastify.close()
	})

	it('should respond with 200 and payload with a basepath parm for simple checks', async () => {
		const fastify = Fastify()

		await fastify.register(require('../lib/index'),
			{
				basepath: '/basetest',
				includeSimple: true,
				includeSimpleActuator: false,
				includeStaticLiveness: false,
				includeStaticSureRoute: false,
				includeTeapot: false		
			}
		)

		const response = await fastify.inject({
			method: 'GET',
			url: '/basetest/health'
		})
		expect(response.statusCode).toEqual(200)
		expect(response.statusMessage).toEqual('OK')
		expect(response.body).toEqual('{"status":"UP"}')


		fastify.close()
	})
	
	it('should respond with 200 and payload with a basepath parm for static checks', async () => {
		const fastify = Fastify()

		await fastify.register(require('../lib/index'),
			{
				basepath: '/basetest',
				includeSimple: false,
				includeSimpleActuator: false,
				includeStaticLiveness: true,
				includeStaticSureRoute: false,
				includeTeapot: false		
			}
		)

		const response = await fastify.inject({
			method: 'GET',
			url: '/basetest/gtm/liveness.txt'
		})

		const buffer = fs.readFileSync(path.join(__dirname, '../lib/files/gtm/liveness.txt'))
		expect(response.statusCode).toEqual(200)
		expect(response.statusMessage).toEqual('OK')
		expect(response.body).toEqual(buffer.toString())
		expect(response.payload).toEqual(buffer.toString())


		fastify.close()
	})
})