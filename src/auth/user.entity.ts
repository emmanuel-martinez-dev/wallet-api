import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    EntityRepository,
    Repository,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar' })
    walletAddress: string;

    @Column({ nullable: true, type: 'varchar' })
    username: string;

    @Column({ nullable: true, type: 'varchar' })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date | string;

    @UpdateDateColumn()
    updatedAt: Date | string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> { }