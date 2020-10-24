/// <reference types="next" />
/// <reference types="next/types/global" />
declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.svg" {
    const content: any;
    export = content;
}

declare module "*.jpg" {
    const content: any;
    export = content;
}
