import {Dj} from "../models/dj.model";

export interface IDjService {
  getById(id: string): Promise<Dj | null>;

  getAll(): Promise<Dj[]>;

  create(entity: Dj): Promise<Dj>;

  update(id: string, entity: Partial<Dj>): Promise<Dj | null>;

  delete(id: string): Promise<boolean>;
}
