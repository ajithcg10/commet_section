import { Timestamp } from 'firebase/firestore';

export interface UserProps {
    uid: string,
    displayName: string | null,
    email: string | null,
    photoURL: string | null,
    phoneNumber: string | null,
    providerId:string,
  
}

export interface Reaction {
    symbol: string | null;
    symbolCount: number | null;
}

export interface Reply {
    id: string | null;
    text: string | null;
    image: string | null;
    createDate: Date | null;
}
interface Style {
    bold: boolean,
    italic: boolean,
    underline: boolean,
}

export interface Comment {
    id?: string | null;
    userName?:string | null;
    textType?:Style[] | undefined;
    text?: string | null;
    image?: string | null;
    profile?: string | null;
    createDate?: Timestamp | undefined;
    reply?: Reply[];
    reaction?: Reaction[];
}

export interface CommentData {
    comments: Comment[];
}