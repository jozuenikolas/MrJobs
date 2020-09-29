import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DetalleTrabajoEntity} from "./detalleTrabajo.entity";
import {DetalleTrabajoService} from "./detalleTrabajo.service";

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
        DetalleTrabajoService
    ],
    exports:[
        DetalleTrabajoService
    ]
})

export class DetalleTrabajoModule{}