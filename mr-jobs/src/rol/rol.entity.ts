import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('rol')

export class RolEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombre',
        type: "varchar",
        nullable: false,
        unique: true,
        length: '100',
    })
    nombre: string;

    @Column({
        name: 'codigo',
        type: "varchar",
        nullable: false,
        unique: true,
        length: '100',
    })
    codigo: string;

    @Column({
        name: 'descripcion',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '500',
    })
    descripcion: string;
}