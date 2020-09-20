import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TrabajoEntity} from "./trabajo.entity";

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

    ]
})

export class TrabajoModule{}