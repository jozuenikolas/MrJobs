import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('educacion')

export class EducacionEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombreUniversidad',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    nombreUniversidad: string;

}