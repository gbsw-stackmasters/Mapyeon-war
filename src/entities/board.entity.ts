import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UsersEntity from "./auth.entity";

@Entity({ name: 'board' })
export default class BoardEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column({ name: 'title', type: 'varchar', length: 120, nullable: false})
  title: string;

  @Column({ name: 'content', type: 'text', nullable: false })
  content: string;

  @Column({name: 'isShow', type: 'boolean', nullable: false})
  isShow: boolean

  @CreateDateColumn({type: "timestamp", name: 'createdAt'})
  createdAt: Date

  @ManyToOne(() => UsersEntity, user => user.board, {onDelete: 'CASCADE'})
  user: UsersEntity;

}
