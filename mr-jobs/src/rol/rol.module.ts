import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolEntity} from "./rol.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [RolEntity],
            'default'
        )
    ],
    controllers: [

    ],
    providers: [

    ]
})

export class RolModule{}