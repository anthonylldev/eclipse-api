import {Dj, DjModel} from '../models/dj.model';
import {IRepository} from "../interfaces/repository.interface";

class DjRepository implements IRepository<Dj> {
    async findById(id: string): Promise<Dj | null> {
        return await DjModel.findById(id).exec();
    }

    async findAll(): Promise<Dj[]> {
        return await DjModel.find().exec();
    }

    async create(dj: Dj): Promise<Dj> {
        const newDj = new DjModel(dj);
        return await newDj.save();
    }

    async update(id: string, dj: Partial<Dj>): Promise<Dj | null> {
        return await DjModel.findByIdAndUpdate(id, dj, {new: true}).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = await DjModel.findByIdAndDelete(id).exec();
        return result !== null;
    }
}

export const djRepository: IRepository<Dj> = new DjRepository();
