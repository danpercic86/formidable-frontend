export interface IModel
{
  id: string;
}

export interface ICreatedModifiedModel extends IModel
{
  created: string;
  modified: string;
}
