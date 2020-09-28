import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmpleoEntity} from "./empleo.entity";
import {EmpleoController} from "./empleo.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [EmpleoEntity],
            'default'
        )
    ],
    controllers: [
        EmpleoController
    ],
    providers: [

    ]
})

export class EmpleoModule{}