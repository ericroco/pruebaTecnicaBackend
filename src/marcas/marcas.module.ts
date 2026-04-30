import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { Marca } from './marca.entity';
import { Descuento } from './descuento.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Marca, Descuento]),
    AuthModule,
  ],
  controllers: [MarcasController],
  providers: [MarcasService],
})
export class MarcasModule {}
