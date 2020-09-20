import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('empresa')

export class EmpresaEntity {
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
        name: 'tipoIndustria',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    tipoIndustria: string;
}