import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn, Unique, Index} from "typeorm";
import { Orders } from "./orders.entity";
import { Combos } from "./combos.entity";
import { Items } from "./items.entity";

@Entity()
@Index(["id", "combo", "item"], { unique: true })
export class ComboItem {
  
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne(() => Combos, (combo) => combo.id)
  @JoinColumn()
  combo: Combos;

  @ManyToOne(() => Items, (item) => item.id)
  @JoinColumn()
  item: Items;

}
