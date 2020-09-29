import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {EmpresaEntity} from "../empresa/empresa.entity";
import {DetalleEducacionEntity} from "../detalleEducacion/detalleEducacion.entity";
import {AplicacionEntity} from "../aplicacion/aplicacion.entity";

@Entity('empleo')

export class EmpleoEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'nombreEmpleo',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    nombreEmpleo: string;

    @Column({
        name: 'descripcionEmpleo',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '500',
    })
    descripcionEmpleo: string;

    @Column({
        name: 'ubicacionEmpleo',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    ubicacionEmpleo: string;


    @Column({
        name: 'tipoEmpleo',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    tipoEmpleo: string;

    @Column({
        name: 'funcionLaboral',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    funcionLaboral: string;

    @Column({
        name: 'nivelAntiguedad',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    nivelAntiguedad: string;

    @Column({
        name: 'estadoEmpleo',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '1',
    })
    estadoEmpleo: string;

    @Column({
        name:'fechaPublicacion',
        nullable: false,
        unique: false,
        type: "date",
    })
    fechaPublicacion:string;

    @ManyToOne(
        type => EmpresaEntity,
        empresa => empresa.empleos
    )
    empresa: EmpresaEntity;

    @OneToMany(
        type => AplicacionEntity,
        // Que entidad nos relacionamos
        aplicacion => aplicacion.empleo
        // Campo con el que nos relacionamos
    )
    aplicaciones: AplicacionEntity[];


}