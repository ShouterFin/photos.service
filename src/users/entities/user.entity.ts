import { Photo } from "src/photos/entities/photo.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({unique: true})
    username: string;
    @Column()
    password: string;
    @Column()
    name: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Profile, (profile) => profile.user, {cascade: true}) // Define the relationship between the User and Profile entities
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Photo, (photo) => photo.user) // Define the relationship between the User and Photo entities
    photos: Photo[];
}