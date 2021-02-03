import * as React from 'react';
import { BaseProps } from "../interfaces/props.interface";

export interface IInputProps extends BaseProps {
    form: Form;
    name: string;
    rules?: RcFormRule[];
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
}

interface RcFormRule {
    required: boolean;
    message?: string;
    validator?: (rule, value, callback) => void;
}

type FieldValue = { [key: string]: string };

interface Form {
    getFieldsValue(fieldNames: string[]): string[];

    getFieldValue(fieldName: string): string;

    getFieldInstance(fieldName: string);

    setFieldsValue(obj: FieldValue);

    setFieldsInitialValue(obj: FieldValue);

    setFields(obj: FieldValue);

    validateFields(callback: (errors: Error, values: FieldValue) => void);

    validateFields(fieldNames: string[], callback: (errors: Error, values: FieldValue) => void);

    validateFieldsAndScroll(callback: (errors: Error, values: FieldValue) => void);

    validateFieldsAndScroll(fieldNames: string[], callback: (errors: Error, values: FieldValue) => void);

    validateFields(fieldNames: string[], options: { force: boolean }, callback: (errors: Error, values: FieldValue) => void);

    validateFieldsAndScroll(fieldNames: string[], options: { force: boolean }, callback: (errors: Error, values: FieldValue) => void);

    getFieldsError(names: string[]): { [key: string]: string[] };

    getFieldError(name: string): string[];

    isFieldValidating(name: string): boolean;

    isFieldsValidating(names: string[]): boolean;

    isFieldTouched(name: string): boolean;

    isFieldsTouched(names: string[]): boolean;

    resetFields(names: string[]);

    getFieldProps(name: string, options: FieldOptions);

}

interface FieldOptions {
    initialValue?: any;
    rules?: RcFormRule[];
    hidden?: boolean;
    preserve?: boolean;
    onChange?: (value: any) => void;
}


export class Input extends React.Component<IInputProps, any> {
    state = {
        height: 33,
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const { rules, name, placeholder, className, style, multiline, id } = this.props;
        let input;
        if (multiline) {
            input = <textarea
                className={`
                    outline-0 appearance-none text-100xl leading-5 mt-9 py-1.5 transition-all duration-200
                    ease-linear align-middle whitespace-nowrap bg-white bg-none border-b border-solid
                    border-gray-200 w-full hover:border-primary ${getFieldError(name) ? 'border-red-600' : ''}
                `}
                id={id}
                onFocus={() => this.setState({ height: 200 })}
                onBlur={() => this.setState({ height: 33 })}
                style={{ height: this.state.height }}
                // className={getFieldError(name) ? styles.invalid : ''}
                {...getFieldProps(name, { rules })}
                placeholder={placeholder}/>;
        } else {
            input = <input
                id={id}
                className={`
                    outline-0 appearance-none text-100xl leading-5 mt-9 py-1.5
                    align-middle whitespace-nowrap bg-white bg-none border-b border-solid
                    border-gray-200 w-full hover:border-primary ${getFieldError(name) ? 'border-red-600' : ''}
                `}
                {...getFieldProps(name, { rules })}
                placeholder={placeholder}/>;
        }
        return <div style={style} className={`mb-6 ${className}`}>
            {input}
        </div>
    }
}
