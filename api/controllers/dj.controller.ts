import {IService} from '../interfaces/service.interface';
import {Context} from 'hono';
import {Dj} from '../models/dj.model';
import {djService} from "../services/dj.service";

class DjController {
  constructor(private djService: IService<Dj>) {
  }

  async getAllDjs(c: Context) {
    const djs = await this.djService.getAll();
    return c.json(djs);
  }

  async getDjById(c: Context) {
    const id = c.req.param('id');
    const dj = await this.djService.getById(id);
    if (!dj) {
      return c.notFound();
    }
    return c.json(dj);
  }

  async createDj(c: Context) {
    const djData = await c.req.json();
    const newDj = await this.djService.add(djData);
    return c.json(newDj);
  }

  async updateDj(c: Context) {
    const id = c.req.param('id');
    const djData = await c.req.json();
    const updatedDj = await this.djService.update(id, djData);
    if (!updatedDj) {
      return c.notFound();
    }
    return c.json(updatedDj);
  }

  async deleteDj(c: Context) {
    const id = c.req.param('id');
    const deleted = await this.djService.remove(id);
    if (!deleted) {
      return c.notFound();
    }
    return c.text('DJ deleted successfully');
  }
}

export const djController = new DjController(djService);
