import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {AplicacionEntity} from "./aplicacion/aplicacion.entity";
import {DetalleEducacionEntity} from "./detalleEducacion/detalleEducacion.entity";
import {DetalleTrabajoEntity} from "./detalleTrabajo/detalleTrabajo.entity";
import {EducacionEntity} from "./educacion/educacion.entity";
import {EmpleoEntity} from "./empleo/empleo.entity";
import {EmpresaEntity} from "./empresa/empresa.entity";
import {RolEntity} from "./rol/rol.entity";
import {TrabajoEntity} from "./trabajo/trabajo.entity";

@Module({
  imports: [
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: 'default',
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'mrjobs',
          entities: [
              UsuarioEntity,
              AplicacionEntity,
              DetalleEducacionEntity,
              DetalleTrabajoEntity,
              EducacionEntity,
              EmpleoEntity,
              EmpresaEntity,
              RolEntity,
              TrabajoEntity,
          ],
          synchronize: true,
          dropSchema: true,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
