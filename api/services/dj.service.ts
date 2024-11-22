import {Dj} from "../models/dj.model";
import {IDjService} from "../interfaces/dj-service.interface";
import {IDjRepository} from "../interfaces/dj-repository.interface";
import {djRepository} from "../repositories/dj.repository";

class DjService implements IDjService {

  private static instance: DjService;

  private constructor(private readonly djRepository: IDjRepository) {
  }

  static getInstance(): DjService {
    if (!DjService.instance) {
      DjService.instance = new DjService(djRepository);
    }
    return DjService.instance;
  }

  async getById(id: string): Promise<Dj | null> {
    return this.djRepository.findDjById(id);
  }

  async getAll(): Promise<Dj[]> {
    return this.djRepository.findAllDjs();
  }

  async create(entity: Dj): Promise<Dj> {
    return this.djRepository.saveDj(entity);
  }

  async update(id: string, entity: Partial<Dj>): Promise<Dj | null> {
    return this.djRepository.updateDj(id, entity);
  }

  async delete(id: string): Promise<boolean> {
    return this.djRepository.deleteDj(id);
  }
}

export const djService: IDjService = DjService.getInstance();
