import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Simple {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键',
  })
  id?: number;

  @ApiProperty({ description: 'name' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '名称',
  })
  name: string;

  @ApiProperty({ description: '所在地' })
  @Column({
    type: 'varchar',
    length: 255,
    comment: '所在地',
  })
  address: string;
}
