import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat) /// Inyectamos el repositorio de la entidad Cat
    private readonly catRepository: Repository<Cat>, /// Repositorio de la entidad Cat

    @InjectRepository(Breed) /// Inyectamos el repositorio de la entidad Breed
    private readonly breedRepository: Repository<Breed>, /// Repositorio de la entidad Breed

  ){

  }

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({name: createCatDto.breed});/// Buscamos la raza del gato

    if(!breed){
      throw new BadRequestException('La raza no existe');
    }

    return await this.catRepository.save({...createCatDto, breed});
  }

  async findAll() {
    return await this.catRepository.find();  /// Retorna todos los gatos
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    ///return await this.catRepository.update(id, updateCatDto); /// Actualiza el gato
  }

  async remove(id: number) {
    return await this.catRepository.softDelete(id); /// Elimina el gato de forma logica
  }
}
