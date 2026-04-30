import { IsString, IsNotEmpty, IsOptional, IsBoolean, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDescuentoDto {
  @ApiProperty({ example: 'PROMO1' })
  @IsString()
  @IsNotEmpty()
  etiqueta: string;

  @ApiProperty({ example: 10.5 })
  @IsNumber()
  @IsNotEmpty()
  valor: number;
}

export class CreateMarcaDto {
  @ApiProperty({ example: 'Nike' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Ropa deportiva', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @ApiProperty({ type: [CreateDescuentoDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDescuentoDto)
  @IsOptional()
  descuentos?: CreateDescuentoDto[];
}
