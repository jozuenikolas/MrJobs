import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DetalleEducacionEntity} from "../detalleEducacion/detalleEducacion.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

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

    @OneToMany(
        type => UsuarioEntity,
        // Que entidad nos relacionamos
        usuario => usuario.rol
        // Campo con el que nos relacionamos
    )
    usuarios: UsuarioEntity[];
}