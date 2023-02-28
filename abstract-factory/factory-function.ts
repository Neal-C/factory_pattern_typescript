interface ILogger {
	info(message: string): void;
	warn(message: string): void;
	debug(message: string): void;
	error(message: string): void;
}

function productionLogger(): ILogger {
	return {
		info(message: string): void {},
		warn(message: string): void {
			console.warn(message);
		},
		debug(message: string): void {},
		error(message: string): void {
			console.error(message);
		},
	};
}

function developmentLogger(): ILogger {
	return {
		info(message: string): void {
			console.info(message);
		},
		warn(message: string): void {
			console.warn(message);
		},
		debug(message: string): void {
			console.debug(message);
		},
		error(message: string): void {
			console.error(message);
		},
	};
}

export function createLogger(): ILogger {
	if (process.env.NODE_END === "production") {
		return productionLogger();
	} else {
		return developmentLogger();
	}
}
