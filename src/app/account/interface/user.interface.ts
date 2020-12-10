export class User {
    id: number;
    username: string;
    password: string;
    token?: string;
    role?: string;
    canDelete?: boolean;
    canEdit?: boolean;
    joined?: Date
    lastActive?: Date
    contributions?: number;
}