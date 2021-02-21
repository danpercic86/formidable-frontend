export interface Model {
    id: string;
}

export interface CreatedModifiedModel extends Model {
    created: string;
    modified: string;
}
