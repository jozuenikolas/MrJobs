import {Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DetalleEducacionEntity} from "../detalleEducacion/detalleEducacion.entity";
import {DetalleTrabajoEntity} from "../detalleTrabajo/detalleTrabajo.entity";
import {EmpresaEntity} from "../empresa/empresa.entity";
import {AplicacionEntity} from "../aplicacion/aplicacion.entity";
import {RolEntity} from "../rol/rol.entity";

/*@Index([ //INDICES DE BUSQUEDA ---- NOMBRES DE LAS PROPIEDADES DE LA CLASE
    'nombre',
    'apellido',
    'cedula'
])*/
//@Index(['nombre','apellido','cedula'], // INDICES COMPUESTOS
//    {unique:true})
@Entity('usuario') //nombre de la tabla de base de datos}
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'correo',
        type: "varchar",
        nullable: false,
        unique: true,
        length: '100',
    })
    correo: string;

    @Column({
        name: 'password',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    password: string;

    @Column({
        name: 'nombre',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    nombre: string;

    @Column({
        name: 'apellido',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    apellido: string;

    @Column({
        name: 'pais',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    pais: string;

    @Column({
        name: 'ciudad',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    ciudad: string;

    @OneToMany(
        type => DetalleEducacionEntity,
        // Que entidad nos relacionamos
        detalleEducacion => detalleEducacion.usuario
        // Campo con el que nos relacionamos
    )
    detallesEducacion: DetalleEducacionEntity[];

    @OneToMany(
        type => DetalleTrabajoEntity,
        // Que entidad nos relacionamos
        detalleTrabajo => detalleTrabajo.usuario
        // Campo con el que nos relacionamos
    )
    detallesTrabajo: DetalleTrabajoEntity[];

    @OneToMany(
        type => EmpresaEntity,
        // Que entidad nos relacionamos
        empresa => empresa.usuario
        // Campo con el que nos relacionamos
    )
    empresas: EmpresaEntity[];

    @OneToMany(
        type => AplicacionEntity,
        // Que entidad nos relacionamos
        aplicacion => aplicacion.usuario
        // Campo con el que nos relacionamos
    )
    aplicaciones: AplicacionEntity[];

    @ManyToOne(
        type => RolEntity,
        rol => rol.usuarios
    )
    rol: RolEntity;


}