import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Marca } from '../marcas/marca.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  fullName: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Marca, (marca) => marca.user)
  marcas: Marca[];

  @CreateDateColumn()
  createdAt: Date;
}
