import { useToasts } from 'react-toast-notifications';

export function WithToast(): ClassDecorator {
    return (target) => {
        return withToast(target as any) as any;
    };
}

function withToast(Component) {
    return function WrappedComponent(props) {
        const toastFuncs = useToasts()
        return <Component {...props} {...toastFuncs} />;
    }
}
