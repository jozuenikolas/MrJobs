import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('detalleEducacion')

export class DetalleEducacionEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name:'anioInicio',
        nullable: false,
        type: "datetime",
    })
    anioInicio:string;

    @Column({
        name:'anioFin',
        nullable: false,
        type: "datetime",
    })
    anioFin:string;

    @Column({
        name: 'titulacion',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    titulacion: string;

    @Column({
        name: 'disciplina',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    disciplina: string;

}