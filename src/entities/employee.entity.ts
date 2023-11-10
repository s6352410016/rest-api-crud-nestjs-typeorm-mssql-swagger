import { Column , CreateDateColumn , UpdateDateColumn , Entity , PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "employee_tb"})
export class Employee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    empFullname: string;

    @Column("varchar")
    empAddress: string;

    @Column("varchar")
    empTel: string;

    @Column("int")
    empSalary: number;

    @Column("varchar")
    empPhoto: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}