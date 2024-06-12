import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";
import { Orders } from "./orders.entity";
import { Items } from "./items.entity";
import { ComboItem } from "./combo-item.entity";

@Entity()
export class Combos {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  name: string;
  
  @OneToMany(() => Orders, (order) => order.id)
  orders: Orders[];

  @OneToMany(() => ComboItem, (comboItem) => comboItem.id)
  comboItems: ComboItem[];

}
