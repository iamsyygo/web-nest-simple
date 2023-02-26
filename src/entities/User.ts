import { Column, Entity } from 'typeorm';
@Entity('user', { schema: 'nest-simple' })
export class User {
  @Column('varchar', { name: 'name', comment: '用户名', length: 255 })
  name: string;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱',
    length: 20,
  })
  email: string | null;

  @Column('varchar', { name: 'password', comment: '密码', length: 20 })
  password: string;

  @Column('varchar', { name: 'role', comment: '角色', length: 20 })
  role: string;
}
