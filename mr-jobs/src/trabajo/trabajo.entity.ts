import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DetalleTrabajoEntity} from "../detalleTrabajo/detalleTrabajo.entity";
@Entity('trabajo')
export class TrabajoEntity {
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
        unique: false,
        length: '100',
    })
    nombre: string;
    //nombre = cargo

    @Column({
        name: 'tipo',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    tipo: string;

    @Column({
        name: 'ubicacion',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    ubicacion: string;

    @Column({
        name: 'organizacion',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    organizacion: string;
    //organizacion = empresa

    @OneToMany(
        type => DetalleTrabajoEntity,
        // Que entidad nos relacionamos
        detalleTrabajo => detalleTrabajo.trabajo
        // Campo con el que nos relacionamos
    )
    detallesTrabajo: DetalleTrabajoEntity[];

}