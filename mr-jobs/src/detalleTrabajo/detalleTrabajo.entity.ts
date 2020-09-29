import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TrabajoEntity} from "../trabajo/trabajo.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity('detalle_trabajo')

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
        type: "date",
    })
    anioInicio:string;

    @Column({
        name:'anioFin',
        nullable: false,
        type: "date",
    })
    anioFin:string;

    @ManyToOne(
        type => TrabajoEntity,
        trabajo => trabajo.detallesTrabajo
    )
    trabajo: TrabajoEntity;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.detallesTrabajo
    )
    usuario: UsuarioEntity;

}