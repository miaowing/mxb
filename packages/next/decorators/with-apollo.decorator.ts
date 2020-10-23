import { withApollo } from "../providers/with-apollo";

export function WithApollo(): ClassDecorator {
    return (target) => {
        return withApollo(target as any) as any;
    };
}
