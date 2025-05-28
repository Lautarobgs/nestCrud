import { IsString } from "class-validator";
import { Role } from "../../common/enums/role.enum";
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

    @Column({ nullable: false, select: false })
    password:string;

    @Column({type: 'enum' ,default: Role.USER, enum: Role})
    role:Role;

    @DeleteDateColumn()
    deletedAt: Date;

}
