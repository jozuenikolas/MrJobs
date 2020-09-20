import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('aplicacion')

export class AplicacionEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

    @Column({
        name: 'aspiracionSalarial',
        nullable: false,
        type: "decimal",
        //precision: 10, // 1000000000.
        //scale: 4, //.0001
    })
    aspiracionSalarial:number;

    @Column({
        name: 'resumen',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '100',
    })
    resumen: string;

    @Column({
        name: 'estado',
        type: "varchar",
        nullable: false,
        unique: false,
        length: '2',
    })
    estado: string;

}