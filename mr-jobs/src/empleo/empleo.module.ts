import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmpleoEntity} from "./empleo.entity";
import {EmpleoController} from "./empleo.controller";
import {EmpresaModule} from "../empresa/empresa.module";
import {EmpleoService} from "./empleo.service";

@Module({
    imports: [
        EmpresaModule,
        TypeOrmModule.forFeature(
            [EmpleoEntity],
            'default'
        )
    ],
    controllers: [
        EmpleoController
    ],
    providers: [
        EmpleoService
    ]
})

export class EmpleoModule{}