import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DetalleTrabajoEntity} from "./detalleTrabajo.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [DetalleTrabajoEntity],
            'default'
        )
    ],
    controllers: [

    ],
    providers: [

    ]
})

export class DetalleTrabajoModule{}