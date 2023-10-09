import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
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
  @Column()
  role: string;
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
