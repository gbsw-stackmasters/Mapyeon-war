import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export default class UsersEntity {
  @PrimaryGeneratedColumn('increment', { name: 'idx' })
  idx: number;

  @Column({ name: 'id', type: 'varchar', length: 40, nullable: false, unique: true })
  id: string;

  @Column({ name: 'pw', type: 'text', nullable: false })
  pw: string;

}