import { withI18N } from "../providers/with-i18n";

export function WithI18N(): ClassDecorator {
    return (target) => {
        return withI18N(target as any) as any;
    };
}
