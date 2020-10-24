import { createForm } from 'rc-form';

export function CreateForm(): ClassDecorator {
    return (target) => {
        return createForm()(target as any) as any;
    };
}
