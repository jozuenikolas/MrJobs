import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrabajoEntity} from "./trabajo.entity";
import {TrabajoService} from "./trabajo.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [TrabajoEntity],
            'default'
        )
    ],
    controllers: [

    ],
    providers: [
        TrabajoService
    ],
    exports:[
      TrabajoService
    ]
})

export class TrabajoModule{}