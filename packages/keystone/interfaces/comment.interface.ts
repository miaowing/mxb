export interface Comment {
    page: string;
    name: string;
    email: string;
    url?: string;
    content: string;
    replyTo?: string;
    belongTo?: string;
    subscribe?: boolean;
    passed?: boolean;
    ticket: string;
    randStr: string;
}
