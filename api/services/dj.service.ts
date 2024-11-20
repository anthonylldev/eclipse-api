import {djRepository} from "../repositories/dj.repository";
import {IRepository} from "../interfaces/repository.interface";
import {Dj} from "../models/dj.model";
import {IService} from "../interfaces/service.interface";

class DjService implements IService<Dj> {
  constructor(private repository: IRepository<Dj>) {
  }

  async getById(id: string): Promise<Dj | null> {
    return await this.repository.findById(id);
  }

  async getAll(): Promise<Dj[]> {
    return await this.repository.findAll();
  }

  async add(entity: Dj): Promise<Dj> {
    return await this.repository.create(entity);
  }

  async update(id: string, entity: Partial<Dj>): Promise<Dj | null> {
    return await this.repository.update(id, entity);
  }

  async remove(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

export const djService: IService<Dj> = new DjService(djRepository);
