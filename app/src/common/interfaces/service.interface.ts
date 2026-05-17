export type TServiceActionSchema<
  Name extends string,
  Input = any,
  Output = any,
> = {
  [K in Name]: { input: Input; output: Output };
};

export type TGenerateService<ActionSchemaMap> = {
  [K in keyof ActionSchemaMap]: (
    input: ActionSchemaMap[K] extends { input: infer I } ? I : any
  ) => Promise<ActionSchemaMap[K] extends { output: infer O } ? O : any>;
};

export interface ICRUDServiceActionSchemaMap
  extends
    TServiceActionSchema<"find">,
    TServiceActionSchema<"findMany">,
    TServiceActionSchema<"insert">,
    TServiceActionSchema<"update">,
    TServiceActionSchema<"remove"> {}

export type TActionOptions = {
  includeDeleted?: boolean;
  executorId?: string;
  readerId?: string;
};

export interface IBaseCRUDServiceMap<Action extends ICRUDServiceActionSchemaMap> {
  find(input: Action["find"]["input"]): Promise<Action["find"]["output"]>;
  findMany(
    input: Action["findMany"]["input"]
  ): Promise<Action["findMany"]["output"]>;
  insert(input: Action["insert"]["input"]): Promise<Action["insert"]["output"]>;
  update(input: Action["update"]["input"]): Promise<Action["update"]["output"]>;
  remove(id: Action["remove"]["input"]): Promise<Action["remove"]["output"]>;
}
