import { 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    Column, 
    OneToMany,
} from "typeorm"

import { States } from "../../@common/enums/states.enum"
import { UserRoles } from "./userRoles.entity"

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'character varying', nullable: false })
    name: string

    @Column({ type: 'character varying', nullable: false, unique: true })
    email: string

    @Column({ type: 'character varying', nullable: false })
    password: string

    @Column({ type: 'enum', enum: States, default: States.ACTIVE })
    state: States

    @CreateDateColumn({ type: 'timestamp', name: 'create_ad' })
    createAd: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'update_ad' })
    updateAd: Date
    
    @OneToMany(
        type => UserRoles,
        userRoles => userRoles.user,
    )
    userRoles: UserRoles[]
}