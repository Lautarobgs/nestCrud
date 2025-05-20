import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({ /// Configuracion de la base de datos para TypeORM
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities:true, /// Carga automaticamente las entidades
      ///entities: [], /// No es necesario si autoLoadEntities:true
      synchronize: true, /// No usar en produccion, solo para desarrollo
    }),
    BreedsModule
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
