import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128, nullable: false })
  title: string;

  @Column({ default: false, nullable: false })
  isCompleted: boolean;

  @Column({ nullable: false })
  createdAt: string;

  @Column({ nullable: false })
  updatedAt: string;
}
