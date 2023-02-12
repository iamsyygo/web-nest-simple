import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSimpleDto } from './dto/create-simple.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Simple } from './entities/simple.entity';
// import { UpdateSimpleDto } from './dto/update-simple.dto';

@Injectable()
export class SimpleService {
  constructor(@InjectRepository(Simple) private readonly userRepositroy: Repository<Simple>) {}
  // private readonly userRepositroy: Repository<Simple>;
  create(createSimpleDto: CreateSimpleDto) {
    return 'This action adds a new simple';
  }

  findAll() {
    // throw new Error('错误');
    // return '🛴 This action returns all simple';
    // throw new NotFoundException('找不到文章');
    // return 'This action returns all simple';
    // return new NotFoundException('找不到文章');
    return {
      city: '北京',
      weather: '晴天',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} simple`;
  }

  // update(id: number, updateSimpleDto: UpdateSimpleDto) {
  //   return `This action updates a #${id} simple`;
  // }

  remove(id: number) {
    return `This action removes a #${id} simple`;
  }

  /*
   * 新增
   * @param {CreateSimpleDto} createSimpleDto
   * @returns {Promise<Simple>}
   */
  addSimple(body: Simple): Promise<Simple> {
    console.log(this.userRepositroy);

    return this.userRepositroy.save(body);
  }
}
