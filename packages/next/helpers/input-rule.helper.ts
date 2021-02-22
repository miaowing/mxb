export const UseRequiredRule = (message: string, required: boolean = true) => {
    return {
        required,
        validator: (rule, value, callback) => {
            if (value === undefined || value === '') {
                return callback(message);
            }
            if (!value.toString().trim()) {
                return callback(message);
            }

            return callback();
        }
    }
};

export const UseEmailRule = (message: string, required: boolean = true) => {
    return {
        required,
        validator: (rule, value, callback) => {
            if (value === undefined || value === '') {
                return callback(message);
            }
            if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
                return callback(message);
            }

            return callback();
        }
    }
};
