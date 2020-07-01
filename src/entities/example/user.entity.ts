import { 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    Column, 
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
} from "typeorm"

import { States } from "../../@common/enums/states.enum"
import { Profile } from "./profile.entity"
import { UserRoles } from "./userRoles.entity"
import { Language } from "./language.entity"

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'character varying', nullable: false })
    username: string

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

    @OneToOne(
        type => Profile,
        profile => profile.user,
        { cascade: true }
    )
    @JoinColumn({ name: 'fk_profile' })
    profile: Profile
    
    @OneToMany(
        type => UserRoles,
        userRoles => userRoles.user,
    )
    userRoles: UserRoles[]

    @ManyToOne(
        type => Language,
        language => language.users
    )
    @JoinColumn({ name: 'fk_language' })
    language: Language
}