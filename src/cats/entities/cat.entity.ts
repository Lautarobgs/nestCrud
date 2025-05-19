import { Column, DeleteDateColumn, Entity } from "typeorm";



@Entity('cats') /// Nombre de la tabla en la base de datos
export class Cat {
    @Column({ primary: true, generated: true,}) // id autoincremental
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    breed: string;


    @DeleteDateColumn()
    deletedAt: Date; /// Fecha de eliminacion logica
}

