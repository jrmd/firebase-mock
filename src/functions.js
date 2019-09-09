function MockFirebaseFunctions() {
	this.functionsCalled = {};
	this.functionsCalledWith = {};
	this.functionToRespond = {};

	return this;
}

MockFirebaseFunctions.prototype.calledTimes = function(key) {
	return this.functionsCalled[key] || 0;
};

MockFirebaseFunctions.prototype.calledWith = function(key) {
	return this.functionsCalledWith[key] || undefined;
};

MockFirebaseFunctions.prototype.setResponse = function (key, response) {
	this.functionToRespond[key] = response;
	return this;
}

MockFirebaseFunctions.prototype.registerFunction = function (key, response) {
	this.functionsCalled[key] = 0;

	if (response) {
		this.functionToRespond[key] = response;
	}

	return this;
}

MockFirebaseFunctions.prototype.httpsCallable = function (key) {
	const response = this.functionToRespond[key] || undefined;
	return (...args) => new Promise((resolve) => {
		console.warn('hello! we been called');
		this.functionsCalled[key] += 1;
		this.functionsCalledWith[key] = args;
		resolve(response);
	});
}

MockFirebaseFunctions.prototype.reset = function () {
	this.functionsCalled = Object.keys(this.functionsCalled).reduce((carry, key) => ({
		...carry,
		[key]: 0,
	}), {});
}

module.exports = MockFirebaseFunctions;