import { withRouter } from "next/router";

export function WithRouter(): ClassDecorator {
    return (target) => {
        return withRouter(target as any) as any;
    };
}
