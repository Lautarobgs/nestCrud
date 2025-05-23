import { IsString } from "class-validator";
import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity('users')
export class User {

    @Column({ primary: true, generated: true })
    id: number;

    @Column({ unique: true, nullable: false })
    @IsString()
    name:string;

    @Column({ unique: true, nullable: false })
    @IsString()
    email:string;

    @Column()
    password:string;

    @Column({default: 'user'})
    rol:string;

    @DeleteDateColumn()
    deletedAt: Date;

}
