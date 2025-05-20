import { Breed } from "src/breeds/entities/breed.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne } from "typeorm";



@Entity('cats') /// Nombre de la tabla en la base de datos
export class Cat {
    @Column({ primary: true, generated: true,}) // id autoincremental
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;


    @DeleteDateColumn()
    deletedAt: Date; /// Fecha de eliminacion logica

    @ManyToOne(() => Breed, (breed) => breed.id, {
        eager:true, /// Carga ansiosa para incluir la raza al obtener el gato en la consulta
    })
    breed: Breed;

}

