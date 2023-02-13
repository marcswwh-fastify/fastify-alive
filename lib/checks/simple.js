'use strict'

const simpleProto = Object.create({}, {
	type: {
		enumerable: true,
		writable: true,
		value: 0
	},
	statusCode: {
		enumerable: true,
		writable: true,
		value: 0
	},
	route: {
		enumerable: true,
		writable: true,
		value: 0		
	},
	logLevel: {
		enumerable: true,
		writable: true,
		value: ''
	},
	payload: {
		enumerable: true,
		writable: true,
		value: ''		
	},
	headOnly: {
		enumerable: true,
		writable: true,
		value: ''		
	}
})

const createSimpleHC = (options) => {
	const _shc = Object.create(simpleProto)
	_shc.type = options.type
	_shc.statusCode = options.statusCode
	_shc.route = options.route
	_shc.logLevel = options.logLevel
	_shc.payload = options.payload
	_shc.headOnly = options.headOnly
	return _shc
}

const mapRoute = (obj) => {
	return (obj.headOnly) ? mapHeadRoute(obj) : mapGetRoute(obj)
}

const mapGetRoute = (obj) => {
	return {
		method: 'GET',
		url: obj.route,
		handler: function ( _req, reply) {
			reply.code(obj.statusCode).send(obj.payload)
		}		
	}
}

const mapHeadRoute = (obj) => {
	return {
		method: 'HEAD',
		url: obj.route,
		handler: function ( _req, reply) {
			reply.removeHeader('Content-Type')
			reply.header('Content-Length', 0)
			reply.code(obj.statusCode).send({})
		}		
	}
}

module.exports = {
	createSimpleHC,
	mapRoute
}