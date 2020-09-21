import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DetalleEducacionEntity} from "../detalleEducacion/detalleEducacion.entity";

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

    @OneToMany(
        type => DetalleEducacionEntity,
        // Que entidad nos relacionamos
        detalleEducacion => detalleEducacion.educacion
        // Campo con el que nos relacionamos
    )
    detallesEducacion: DetalleEducacionEntity[];


}