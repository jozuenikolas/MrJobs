import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EducacionEntity} from "./educacion.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [EducacionEntity],
            'default'
        )
    ],
    controllers: [

    ],
    providers: [

    ]
})

export class EducacionModule{}