import { withConfig } from "../providers/with-config";

export function WithConfig(): ClassDecorator {
    return (target) => {
        return withConfig(target as any) as any;
    };
}
