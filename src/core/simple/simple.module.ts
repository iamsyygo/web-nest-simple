import { Module } from '@nestjs/common';
import { SimpleService } from './simple.service';
import { SimpleController } from './simple.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Simple } from './entities/simple.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Simple])],
  controllers: [SimpleController],
  providers: [SimpleService],
})
export class SimpleModule {}
