export interface IModel {
  readonly id: string;
}

export interface ICreatedModifiedModel extends IModel {
  readonly created: string;
  readonly modified: string;
}
