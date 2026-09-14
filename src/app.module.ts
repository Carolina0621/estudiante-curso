import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';            
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { createObserveModule } from '@nestjs/observe';
import { CursosModule } from './cursos/cursos.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    
    //env global 
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({                 // se conecta usando esos valores
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'postgres',
      host: config.get<string>('DB_HOST'),
      port: Number(config.get('DB_PORT')),
      username: config.get<string>('DB_USER'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      autoLoadEntities: true,
      synchronize: true,
    }),
  }),


    AuthModule, 

    CursosModule,

    EstudiantesModule,

    InscripcionesModule,

   

  ],
  
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('estudiantes', 'cursos', 'inscripciones'); //rutas protegidas
  }
}
