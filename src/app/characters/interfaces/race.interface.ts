import { Attributes } from './attributes.interface';

export interface Race {
    id: number;
    name: string;
    description: string;
    attributes: Attributes
}
