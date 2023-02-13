'use strict'

const fastify = require('fastify')

/**
 * @example you may want to use trustProxy to ensure on X-Forwarded-* header value is not spoofed when using a proxy
 * 
 * const fastify = require('fastify')({ trustProxy: true })
 * 
 * function myTrustFn(address, hop) {
 *   return address === '127.0.0.1' || hop === 1
 * }
 */

/**
 * @todo update .after to ensure routes are not registered until plugin is loaded
 */

const start = async() => {
	try {

		const app = fastify({ logger: true })
		await app.register(require('../lib/index'), { includeTeapot: true, basepath: '/basetest' })
		await app.ready().then(server => {
			server.listen({ port: 3000 }, (err) => {
				if(err) {
					server.logger.error(err.message)
					process.exit(1)
				}

				// Close server on event
				process.on('SIGINT', () => server.close())
				process.on('SIGTERM', () => server.close())
			})
		})
	} catch (err) {
		console.debug(err.stack)
	}
}

start()