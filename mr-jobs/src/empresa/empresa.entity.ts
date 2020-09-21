import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {DetalleEducacionEntity} from "../detalleEducacion/detalleEducacion.entity";
import {EmpleoEntity} from "../empleo/empleo.entity";

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

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.empresas
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => EmpleoEntity,
        // Que entidad nos relacionamos
        empleo => empleo.empresa
        // Campo con el que nos relacionamos
    )
    empleos: EmpleoEntity[];
}