import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Marca } from './marca.entity';

@Entity('descuentos')
export class Descuento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  etiqueta: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  valor: number;

  @ManyToOne(() => Marca, (marca) => marca.descuentos, { onDelete: 'CASCADE' })
  marca: Marca;
}
