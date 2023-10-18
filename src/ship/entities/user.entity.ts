import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  username: string;
  @Column()
  email: string;
  @Column({ nullable: true })
  password: string;
  @CreateDateColumn({ nullable: true })
  createAt: Date;
  @UpdateDateColumn({ nullable: true })
  updateAt: Date;
  @Column()
  role: string;
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
