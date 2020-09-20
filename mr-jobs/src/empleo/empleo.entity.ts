import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('empleo')

export class EmpleoEntity {
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

    @Column({
        name: 'ubicacion',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    ubicacion: string;

    @Column({
        name: 'rangoInicial',
        nullable: false,
        type: "decimal",
        //precision: 10, // 1000000000.
        //scale: 4, //.0001
    })
    rangoInicial:number;

    @Column({
        name: 'rangoFinal',
        nullable: false,
        type: "decimal",
        //precision: 10, // 1000000000.
        //scale: 4, //.0001
    })
    rangoFinal:number;

    @Column({
        name: 'tipo',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    tipo: string;

    @Column({
        name: 'estado',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '1',
    })
    estado: string;

}