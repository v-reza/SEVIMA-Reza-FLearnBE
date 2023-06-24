import { Model, ModelCtor } from 'sequelize-typescript';
import { Includeable } from 'sequelize';
import { TransformParameters } from './transform.parameters';
import { IResponse, Response } from './response';
import { NotFoundException } from '@nestjs/common';

export class BaseService<T extends Model> {
  protected readonly repository: ModelCtor<T>;

  private includeModel: Includeable[] | Includeable;

  constructor(repository: ModelCtor<T>) {
    this.repository = repository;
  }

  public JoinModel(options: typeof this.includeModel) {
    this.includeModel = options;
  }

  async findAll(requestParams?: any): Promise<IResponse<T[]>> {
    const { limit, where, offset } = new TransformParameters(requestParams);
    const record = await this.repository.findAll({
      include: this.includeModel,
      limit,
      offset,
      where,
    });
    const response = new Response(record, limit, offset);
    return response.FindAllResponse();
  }

  async findOne(id: string): Promise<T> {
    const record = await this.repository.findByPk(id, {
      include: this.includeModel,
    });
    if (!record) throw new NotFoundException('Record ID not found')
    return record
  }

  async create(data: any): Promise<T> {
    data.created_at = new Date();
    return this.repository.create(data);
  }

  async update(id: string, data: any): Promise<T> {
    data.updated_at = new Date();
    const record = await this.repository.findByPk(id);
    if (!record) throw new NotFoundException('Record ID not found');
    return record.update(data);
  }

  async remove(id: string): Promise<T> {
    const record = await this.repository.findByPk(id);
    if (record) await record.destroy();
    else throw new NotFoundException('Record ID not found');

    return record;
  }
}
