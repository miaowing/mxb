export interface Gallery {
    title: string;
    description: string;
    url: string;
    thumb: {
        publicUrl: string;
    };
    cover: {
        publicUrl: string;
    }
}
