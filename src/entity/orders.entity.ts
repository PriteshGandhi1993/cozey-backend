import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";
import { Users } from "./users.entity";
import { Combos } from "./combos.entity";

@Entity()
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  orderTime: Date;

  @Column()
  quantity: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users

  @ManyToOne(() => Combos, (combo) => combo.id)
  combo: Combos
}
