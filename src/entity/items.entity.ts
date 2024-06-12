import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany} from "typeorm";
import { Combos } from "./combos.entity";
import { ComboItem } from "./combo-item.entity";

@Entity()
export class Items {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({unique: true})
  name: string;

  @OneToMany(() => ComboItem, (comboItem) => comboItem.id, {
    cascade: true,
  })
  combos: Combos[];
}
