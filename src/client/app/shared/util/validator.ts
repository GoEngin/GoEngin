// TODO: Needs a default error message

export class Validator {
	static required(value: any, config: any) {
		let msg = config.errorMessage;
		return !value || value == '' ? {'error': msg } : null;
	}
	static minLength(value: string, config: any) {
		let msg = config.errorMessage;
		let minLength = config.minLength;
		//Angular2: {'minlength': {'requiredLength': minLength, 'actualLength': v.length}} : null;
		return value.length < minLength ? {'requiredLength': minLength, 'actualLength': value.length, 'error': msg } : null;
	}
	static maxLength(value: string, config: any) {
		let msg = config.errorMessage;
		let maxLength = config.maxLength;
		return value.length > maxLength ? {'requiredLength': maxLength, 'actualLength': value.length, 'error': msg } : null;
	}
	static pattern(value: string, config: any) {
		let msg = config.errorMessage;
		let pattern = config.pattern;
		let regex = new RegExp(pattern);
		return regex.test(value) ? null : {'requiredPattern': `pattern`, 'actualValue': value, 'error': msg };
	}
	static email(value: string, config: any) {
		let msg = config.errorMessage;
		let result = Validator.pattern(value, {pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/});
		return result ? {'actualValue': value, 'error': msg } : null;
	}
	static equal(value: string, config: any) {
		let msg = config.errorMessage;
		let targetValue = config.frm.getValue(config.field);
		let fieldName = config.field + ' value';
		return targetValue !== value ? {fieldName: targetValue, 'value': value, 'error': msg } : null;
	}
	static validate(value: any, validators: any, frm: any = null) {
		let result: any = null;
		if (validators) {
			let me: any = Validator;
			let cfg: any = null;
			Object.keys(validators).forEach(key => {
				if (!result) {
					cfg = validators[key];
					cfg.frm = frm;
					result = me[key].call(this, value, cfg);
				}
	        });
		}
        return result;
	}
}