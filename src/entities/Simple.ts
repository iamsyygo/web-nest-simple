import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("simple", { schema: "nest-simple" })
export class Simple {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "主键" })
  id: number;

  @Column("varchar", { name: "name", comment: "名称", length: 255 })
  name: string;

  @Column("varchar", { name: "address", comment: "所在地", length: 255 })
  address: string;
}
