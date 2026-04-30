import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarcasService } from './marcas.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/types/jwt-payload.interface';

@ApiTags('marcas')
@ApiBearerAuth()
@Controller('marcas')
@UseGuards(JwtAuthGuard)
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva marca' })
  @ApiResponse({ status: 201, description: 'Marca creada exitosamente' })
  create(
    @Body() createMarcaDto: CreateMarcaDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.marcasService.create(createMarcaDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las marcas del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de marcas' })
  findAll(@CurrentUser() user: AuthenticatedUser) {
    return this.marcasService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una marca por ID' })
  @ApiResponse({ status: 200, description: 'Detalle de la marca' })
  @ApiResponse({ status: 404, description: 'Marca no encontrada' })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.marcasService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una marca' })
  @ApiResponse({ status: 200, description: 'Marca actualizada' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMarcaDto: UpdateMarcaDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.marcasService.update(id, updateMarcaDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una marca' })
  @ApiResponse({ status: 200, description: 'Marca eliminada' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.marcasService.remove(id, user);
  }
}
