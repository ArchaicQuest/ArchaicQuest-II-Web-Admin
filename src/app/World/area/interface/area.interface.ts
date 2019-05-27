export interface Area {
    id: number;
    title: string;
    description: string;
    dateCreated?: string;
    dateUpdated?: string;
    createdBy?: string;
    modifiedBy?: string[];
    rooms: any[];
}
