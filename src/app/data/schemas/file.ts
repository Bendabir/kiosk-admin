export class File {
    filename: string;
    mimeType: string;
    size: number;
    creationDate: Date;
    uri: string;

    static comparer(f1: File, f2: File) {
        if (f1.filename < f2.filename) {
            return -1;
        } else if (f1.filename > f2.filename) {
            return 1;
        } else {
            return 0;
        }
    }
}
