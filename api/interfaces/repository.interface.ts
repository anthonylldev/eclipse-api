export interface ICreate<T> {
  create(item: T): Promise<T>;
}

export interface IFindById<T> {
  findById(id: string): Promise<T | null>;
}

export interface IFindAll<T> {
  findAll(): Promise<T[]>;
}

export interface IUpdate<T> {
  update(id: string, item: Partial<T>): Promise<T | null>;
}

export interface IDelete {
  delete(id: string): Promise<boolean>;
}

export interface IRepository<T> extends ICreate<T>, IFindById<T>, IFindAll<T>, IUpdate<T>, IDelete {
}
