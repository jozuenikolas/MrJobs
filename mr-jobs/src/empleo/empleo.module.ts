import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmpleoEntity} from "./empleo.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [EmpleoEntity],
            'default'
        )
    ],
    controllers: [

    ],
    providers: [

    ]
})

export class EmpleoModule{}