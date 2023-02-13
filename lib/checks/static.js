'use strict'
const path = require('path')

const staticProto = Object.create({}, {
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
	prefix: {
		enumerable: true,	
		writable: true,
		value: ''
	},
	path: {
		enumerable: true,	
		writable: true,
		value: ''
	},
	logLevel: {
		enumerable: true,
		writable: true,
		value: ''
	},
	fileName: {
		enumerable: true,
		writable: true,
		value: ''
	}
})

const mapRoute = (obj) => {
	return {
		method: 'GET',
		url: obj.route,
		handler: function ( _req, reply) {
			reply.code(obj.statusCode).sendFile(obj.fileName)
		}
	}
}

const createStaticHC = (options) => {
	const _shc = Object.create(staticProto)
	_shc.type = options.type
	_shc.statusCode = options.statusCode
	_shc.route = options.route
	_shc.path = path.join(__dirname, '..', options.path)
	_shc.prefix = options.prefix
	_shc.logLevel = options.logLevel
	_shc.fileName = options.fileName
	return _shc
}

module.exports = {
	createStaticHC,
	mapRoute
}