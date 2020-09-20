import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmpresaEntity} from "./empresa.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature(
            [EmpresaEntity],
            'default'
        )
    ],
    controllers: [

    ],
    providers: [

    ]
})

export class EmpresaModule{}