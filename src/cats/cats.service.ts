import { IUserActive } from './../common/interfaces/active-user.interface';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class CatsService {

  constructor(
    @InjectRepository(Cat) /// Inyectamos el repositorio de la entidad Cat
    private readonly catRepository: Repository<Cat>, /// Repositorio de la entidad Cat

    @InjectRepository(Breed) /// Inyectamos el repositorio de la entidad Breed
    private readonly breedRepository: Repository<Breed>, /// Repositorio de la entidad Breed

  ){

  }

  async create(createCatDto: CreateCatDto, user: IUserActive) {
    const breed = await this.validateBreed(createCatDto.breed); /// Validamos que la raza exista
    return await this.catRepository.save({...createCatDto, 
      breed: breed,
      userEmail: user.email

    });
  }

  async findAll(user: IUserActive) {
    if (user.role === Role.ADMIN) {
      return await this.catRepository.find();
    }
    return await this.catRepository.find({
      where: {userEmail: user.email}
    });
  }

  async findOne(id: number, user: IUserActive) {
    const cat = await this.catRepository.findOneBy({id});
    if (!cat) {
      throw new BadRequestException('El gato no existe');
    }
    this.validateOwner(cat, user); /// Validamos que el usuario sea el dueño del gato o sea admin
  
    return cat;

  }

  async update(id: number, updateCatDto: UpdateCatDto, user: IUserActive) {
    await this.findOne(id, user); /// Validamos que el gato exista y que el usuario sea el dueño o admin
    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto ? await this.validateBreed(updateCatDto.breed) : undefined, /// Validamos que la raza exista
      userEmail: user.email /// Actualizamos el email del usuario
    })
  }

  async remove(id: number, user: IUserActive) {
    const cat =  await this.findOne(id, user);
    return await this.catRepository.softDelete(id); /// Elimina el gato de forma logica
  }

  private validateOwner(cat: Cat, user: IUserActive) {
    if (cat.userEmail !== user.email && user.role !== Role.ADMIN) {
      throw new UnauthorizedException('No tienes permiso para realizar esta accion');
    }
  }
 private async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
  
    if (!breedEntity) {
      throw new BadRequestException('Breed not found');
    }
  
    return breedEntity;
  }


}
