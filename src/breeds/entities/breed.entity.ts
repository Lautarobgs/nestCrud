import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('breeds')
export class Breed {
    @Column({ primary: true, generated: true,}) // id autoincremental
    id: number;

    @Column({length:50})

    name: string;

    @OneToMany(() => Cat, (cat)=> cat.id)
    cats: Cat[];
}
