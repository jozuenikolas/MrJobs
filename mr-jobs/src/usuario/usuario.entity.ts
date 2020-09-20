import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

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

}