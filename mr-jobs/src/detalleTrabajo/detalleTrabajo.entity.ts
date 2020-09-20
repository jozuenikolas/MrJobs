import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('detalleTrabajo')

export class DetalleTrabajoEntity {
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

}