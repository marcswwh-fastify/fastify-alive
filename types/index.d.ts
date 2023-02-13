export interface FastifyAliveOptions {
	basepath?: string,
	includeSimple?: boolean,
	includeSimpleActuator?: boolean,
	includeStaticLiveness?: boolean,
	includeStaticSureRoute?: boolean,
	includeTeapot?: boolean,
	 

	helmet?: Omit<FastifyHelmetOptions, 'global'> | false;
}
