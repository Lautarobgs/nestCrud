import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])], /// Importamos el modulo de TypeORM para poder usar la entidad Cat
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
