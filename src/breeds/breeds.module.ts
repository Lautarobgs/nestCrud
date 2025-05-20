import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Breed])], // Importamos el modulo de TypeORM para poder usar la entidad Breed
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [BreedsModule],
})
export class BreedsModule {}
