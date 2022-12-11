export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Map: any;
};

export type Category = {
  __typename?: "Category";
  dateCreated?: Maybe<Scalars["Date"]>;
  dateModified?: Maybe<Scalars["Date"]>;
  value?: Maybe<Scalars["String"]>;
};

export type ClassType = {
  __typename?: "ClassType";
  dateCreated: Scalars["Date"];
  dateModified: Scalars["Date"];
  id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  properties?: Maybe<Scalars["Map"]>;
  synonyms?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Data_Object = {
  __typename?: "Data_Object";
  dateCreated: Scalars["Date"];
  dateModified: Scalars["Date"];
  groups?: Maybe<Array<Maybe<Scalars["String"]>>>;
  id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  properties?: Maybe<Scalars["Map"]>;
};

export type Entity = {
  __typename?: "Entity";
  attributes?: Maybe<Scalars["Map"]>;
  dateCreated?: Maybe<Scalars["Date"]>;
  dateModified?: Maybe<Scalars["Date"]>;
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  resources?: Maybe<Array<Maybe<Scalars["Map"]>>>;
  synonyms?: Maybe<Array<Maybe<Scalars["String"]>>>;
  type?: Maybe<Scalars["String"]>;
};

export type EntityType = {
  __typename?: "EntityType";
  attributes?: Maybe<Scalars["Map"]>;
  dateCreated?: Maybe<Scalars["Date"]>;
  dateModified?: Maybe<Scalars["Date"]>;
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  synonyms?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createCategory?: Maybe<Category>;
  createClassType: ClassType;
  createEntity?: Maybe<Entity>;
  createEntityType?: Maybe<EntityType>;
  createNode?: Maybe<Node>;
  createNodeType?: Maybe<NodeType>;
  createObject: ObjectType;
  deleteAllClassTypeById?: Maybe<Scalars["Boolean"]>;
  deleteAllObjectTypeById?: Maybe<Scalars["Boolean"]>;
  deleteEntitiy?: Maybe<Scalars["Boolean"]>;
  deleteObjectById?: Maybe<Scalars["Boolean"]>;
  updateClassType: ClassType;
  updateEntity?: Maybe<Entity>;
  updateEntityType?: Maybe<EntityType>;
  updateObject: ObjectType;
};

export type MutationCreateCategoryArgs = {
  value?: InputMaybe<Scalars["String"]>;
};

export type MutationCreateClassTypeArgs = {
  name?: InputMaybe<Scalars["String"]>;
  properties?: InputMaybe<Scalars["Map"]>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MutationCreateEntityArgs = {
  entity?: InputMaybe<Scalars["Map"]>;
};

export type MutationCreateEntityTypeArgs = {
  entityType?: InputMaybe<Scalars["Map"]>;
};

export type MutationCreateNodeArgs = {
  node?: InputMaybe<Scalars["String"]>;
};

export type MutationCreateNodeTypeArgs = {
  value?: InputMaybe<Scalars["String"]>;
};

export type MutationCreateObjectArgs = {
  name?: InputMaybe<Scalars["String"]>;
  properties?: InputMaybe<Scalars["Map"]>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MutationDeleteAllClassTypeByIdArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type MutationDeleteAllObjectTypeByIdArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type MutationDeleteEntitiyArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

export type MutationDeleteObjectByIdArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateClassTypeArgs = {
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  properties?: InputMaybe<Scalars["Map"]>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MutationUpdateEntityArgs = {
  entity?: InputMaybe<Scalars["Map"]>;
};

export type MutationUpdateEntityTypeArgs = {
  entityType?: InputMaybe<Scalars["Map"]>;
};

export type MutationUpdateObjectArgs = {
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  properties?: InputMaybe<Scalars["Map"]>;
  synonyms?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type Node = {
  __typename?: "Node";
  key: Scalars["String"];
  value?: Maybe<Scalars["String"]>;
};

export type NodeType = {
  __typename?: "NodeType";
  dateCreated?: Maybe<Scalars["Date"]>;
  dateModified?: Maybe<Scalars["Date"]>;
  value?: Maybe<Scalars["String"]>;
};

export type ObjectType = {
  __typename?: "ObjectType";
  dateCreated: Scalars["Date"];
  dateModified: Scalars["Date"];
  groups?: Maybe<Array<Maybe<Scalars["String"]>>>;
  id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  properties?: Maybe<Scalars["Map"]>;
};

export type PaginatedClassTypes = {
  __typename?: "PaginatedClassTypes";
  classTypes?: Maybe<Array<Maybe<ClassType>>>;
  count?: Maybe<Scalars["Int"]>;
};

export type PaginatedObjectTypes = {
  __typename?: "PaginatedObjectTypes";
  count?: Maybe<Scalars["Int"]>;
  objectTypes?: Maybe<Array<Maybe<ObjectType>>>;
};

export type PaginatedObjects = {
  __typename?: "PaginatedObjects";
  count?: Maybe<Scalars["Int"]>;
  dataObjects?: Maybe<Array<Maybe<Data_Object>>>;
};

export type Query = {
  __typename?: "Query";
  categories?: Maybe<Array<Maybe<Category>>>;
  deleteAllClassTypes?: Maybe<Scalars["Boolean"]>;
  deleteAllEntities?: Maybe<Scalars["Boolean"]>;
  deleteAllEntityTypes?: Maybe<Scalars["Boolean"]>;
  deleteAllObjectTypes?: Maybe<Scalars["Boolean"]>;
  deleteEntityById?: Maybe<Scalars["Boolean"]>;
  deleteEntityTypeById?: Maybe<Scalars["Boolean"]>;
  entities?: Maybe<Array<Maybe<Entity>>>;
  entityTypes?: Maybe<Array<Maybe<EntityType>>>;
  getClassTypes?: Maybe<PaginatedClassTypes>;
  getNode?: Maybe<Node>;
  getObjectTypes?: Maybe<PaginatedObjectTypes>;
  getObjects?: Maybe<PaginatedObjects>;
  hello: Scalars["String"];
  nodeTypes?: Maybe<Array<Maybe<NodeType>>>;
  nodes?: Maybe<Array<Maybe<Node>>>;
  ontologyWords?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryDeleteEntityByIdArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryDeleteEntityTypeByIdArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

export type QueryGetNodeArgs = {
  nodeId?: InputMaybe<Scalars["String"]>;
};
