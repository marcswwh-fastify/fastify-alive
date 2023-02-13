'use strict'

/**
 * @file Fastify Reply plugin to set and customize health check endpoints
 * @author Marc Arakill
 */

// Required Modules 
const fp = require('fastify-plugin')
const fastifyStatic = require('@fastify/static')
const initialize = require('./utils/initialize')
const staticCheck = require('./checks/static')
const simpleCheck = require('./checks/simple')
 
const fastifyAlive = (fastify, options, done) => {
	const healthChecks = initialize(options)

	let decorateReply = true
	const staticPaths = new Set()

	healthChecks.forEach(function(healthObj) { 
		healthObj.route =((options.basepath) ? options.basepath : '') + healthObj.route

		if(healthObj.type === 'simple')
			fastify.route(simpleCheck.mapRoute(healthObj))
		if(healthObj.type === 'static') {
			healthObj.prefix =((options.basepath) ? options.basepath : '') + healthObj.prefix
			//fastify.route(staticCheck.mapRoute(healthObj))
			if(!staticPaths.has(healthObj.path)) {
				fastify.register(fastifyStatic, {
					root: healthObj.path,
					prefix: healthObj.prefix,
					decorateReply: decorateReply
				})
				staticPaths.add(healthObj.path)
				decorateReply = false
			}
			fastify.route(staticCheck.mapRoute(healthObj))
		}
	})
	done()
}
 
module.exports = fp(fastifyAlive, {
	fastify: '>= 3.0.0',
	name: 'fastify-alive'
})