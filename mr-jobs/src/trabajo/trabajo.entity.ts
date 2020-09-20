import {Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity('trabajo')
export class TrabajoEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number

}