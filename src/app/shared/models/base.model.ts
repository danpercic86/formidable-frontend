export interface Model {
    id: number;
}

export interface CreatedModifiedModel extends Model {
    created: string;
    modified: string;
}
