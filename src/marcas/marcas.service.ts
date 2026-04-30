import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import type { AuthenticatedUser } from '../auth/types/jwt-payload.interface';
@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcasRepository: Repository<Marca>,
  ) {}
  async create(createMarcaDto: CreateMarcaDto, user: AuthenticatedUser): Promise<Marca> {
    const marca = this.marcasRepository.create({
      ...createMarcaDto,
      user: { id: user.id },
    });
    return this.marcasRepository.save(marca);
  }
  async findAll(user: AuthenticatedUser): Promise<Marca[]> {
    return this.marcasRepository.find({
      where: { user: { id: user.id } },
      relations: ['descuentos'],
    });
  }
  async findOne(id: string, user: AuthenticatedUser): Promise<Marca> {
    const marca = await this.marcasRepository.findOne({
      where: { id },
      relations: ['user', 'descuentos'],
    });
    if (!marca) {
      throw new NotFoundException(`Marca with ID ${id} not found`);
    }
    if (marca.user.id !== user.id) {
      throw new ForbiddenException('You do not have access to this marca');
    }
    return marca;
  }
  async update(id: string, updateMarcaDto: UpdateMarcaDto, user: AuthenticatedUser): Promise<Marca> {
    const marca = await this.findOne(id, user);
    if (updateMarcaDto.nombre !== undefined) marca.nombre = updateMarcaDto.nombre;
    if (updateMarcaDto.descripcion !== undefined) marca.descripcion = updateMarcaDto.descripcion;
    if (updateMarcaDto.activo !== undefined) marca.activo = updateMarcaDto.activo;
    if (updateMarcaDto.descuentos !== undefined) {
      marca.descuentos = updateMarcaDto.descuentos as any;
    }
    return this.marcasRepository.save(marca);
  }
  async remove(id: string, user: AuthenticatedUser): Promise<void> {
    const marca = await this.findOne(id, user);
    await this.marcasRepository.remove(marca);
  }
}
