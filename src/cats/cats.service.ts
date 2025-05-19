import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat) /// Inyectamos el repositorio de la entidad Cat
    private catRepository: Repository<Cat>, /// Repositorio de la entidad Cat
  ){

  }

  async create(createCatDto: CreateCatDto) {
    return await this.catRepository.save(createCatDto);
  }

  async findAll() {
    return await this.catRepository.find();  /// Retorna todos los gatos
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  async remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
