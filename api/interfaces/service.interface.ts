export interface IGetById<T> {
  getById(id: string): Promise<T | null>;
}

export interface IGetAll<T> {
  getAll(): Promise<T[]>;
}

export interface IAdd<T> {
  add(entity: T): Promise<T>;
}

export interface IUpdate<T> {
  update(id: string, entity: Partial<T>): Promise<T | null>;
}

export interface IRemove {
  remove(id: string): Promise<boolean>;
}

export interface IService<T> extends IGetById<T>, IGetAll<T>, IAdd<T>, IUpdate<T>, IRemove {}
