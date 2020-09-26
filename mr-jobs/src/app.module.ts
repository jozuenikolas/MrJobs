import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {AplicacionEntity} from "./aplicacion/aplicacion.entity";
import {EducacionEntity} from "./educacion/educacion.entity";
import {EmpleoEntity} from "./empleo/empleo.entity";
import {EmpresaEntity} from "./empresa/empresa.entity";
import {RolEntity} from "./rol/rol.entity";
import {TrabajoEntity} from "./trabajo/trabajo.entity";
import {DetalleEducacionEntity} from "./detalleEducacion/detalleEducacion.entity";
import {AplicacionModule} from "./aplicacion/aplicacion.module";
import {DetalleEducacionModule} from "./detalleEducacion/detalleEducacion.module";
import {EducacionModule} from "./educacion/educacion.module";
import {EmpleoModule} from "./empleo/empleo.module";
import {EmpresaModule} from "./empresa/empresa.module";
import {RolModule} from "./rol/rol.module";
import {TrabajoModule} from "./trabajo/trabajo.module";
import {DetalleTrabajoModule} from "./detalleTrabajo/detalleTrabajo.module";
import {DetalleTrabajoEntity} from "./detalleTrabajo/detalleTrabajo.entity";

@Module({
  imports: [
      UsuarioModule,
      AplicacionModule,
      DetalleEducacionModule,
      DetalleTrabajoModule,
      EducacionModule,
      EmpleoModule,
      EmpresaModule,
      RolModule,
      TrabajoModule,
      TypeOrmModule.forRoot({
          name: 'default',
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '829SK',
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
          dropSchema: false,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
