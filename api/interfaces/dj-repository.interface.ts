import {Dj} from "../models/dj.model";

export interface IDjRepository {
  findDjById(id: string): Promise<Dj | null>;

  findAllDjs(): Promise<Dj[]>;

  saveDj(dj: Dj): Promise<Dj>;

  updateDj(id: string, dj: Partial<Dj>): Promise<Dj | null>;

  deleteDj(id: string): Promise<boolean>;
}
