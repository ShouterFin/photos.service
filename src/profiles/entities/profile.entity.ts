import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    gender: string;
    @Column()
    photo: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}