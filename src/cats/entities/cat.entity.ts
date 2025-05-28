import { Breed } from "../../breeds/entities/breed.entity";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";



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

    @ManyToOne(() => User)
    @JoinColumn({name: 'userEmail', referencedColumnName: 'email'}) /// Relacion con el usuario, se usa JoinColumn para especificar la columna de relacion
    user: User

    @Column({ name: 'userEmail' }) // Columna que almacena el email del usuario
    userEmail: string; /// Email del usuario que posee el gato

}

