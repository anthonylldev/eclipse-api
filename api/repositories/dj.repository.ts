import {Dj, DjModel} from '../models/dj.model';
import {IDjRepository} from "../interfaces/dj-repository.interface";


class DjRepository implements IDjRepository {

  private static instance: DjRepository;

  private constructor() {
  }

  static getInstance(): DjRepository {
    if (!DjRepository.instance) {
      DjRepository.instance = new DjRepository();
    }
    return DjRepository.instance;
  }

  async findDjById(id: string): Promise<Dj | null> {
    return DjModel.findById(id).exec();
  }

  async findAllDjs(): Promise<Dj[]> {
    return DjModel.find().exec();
  }

  async saveDj(dj: Dj): Promise<Dj> {
    const newDj = new DjModel(dj);
    return newDj.save();
  }

  async updateDj(id: string, dj: Partial<Dj>): Promise<Dj | null> {
    return DjModel.findByIdAndUpdate(id, dj, {new: true}).exec();
  }

  async deleteDj(id: string): Promise<boolean> {
    const result = DjModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}

export const djRepository: IDjRepository = DjRepository.getInstance();
