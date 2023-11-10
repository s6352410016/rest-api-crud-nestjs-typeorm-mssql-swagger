import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from 'src/dtos/create-employee.dto';
import { UpdateEmployeeDto } from 'src/dtos/update-employee.dto';
import { Employee } from 'src/entities/employee.entity';
import { Response } from 'src/interfaces/response.interface';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>
    ) { }

    async createEmployee(createEmployeeDto: CreateEmployeeDto, fileName: string): Promise<Employee> {
        try {
            const { empFullname, empAddress, empTel, empSalary } = createEmployeeDto;
            const data = this.employeeRepository.create({
                empFullname,
                empAddress,
                empTel,
                empSalary,
                empPhoto: fileName
            });
            return await this.employeeRepository.save(data);
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }

    async getAllEmployee(): Promise<Employee[] | Response> {
        try {
            const data = await this.employeeRepository.find();
            if (data.length === 0) {
                return {
                    msg: "Employees Not Found."
                }
            }
            return data;
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }

    async getEmployeeById(id: number): Promise<Employee | Response> {
        try {
            const data = await this.employeeRepository.findOne({
                where: {
                    id
                }
            });
            if (!data) {
                return {
                    msg: "Employee Not Found."
                }
            }
            return data;
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }

    async updateEmployee(updateEmployeeDto: UpdateEmployeeDto, id: number, file: Express.Multer.File): Promise<Employee | Response> {
        try {
            const { empFullname, empAddress, empTel, empSalary } = updateEmployeeDto;
            const data = await this.employeeRepository.findOne({
                where: {
                    id
                }
            });
            if (!data) {
                return {
                    msg: "Employee Not Found."
                }
            }

            //not update photo
            if (!file) {
                data.empFullname = empFullname;
                data.empAddress = empAddress;
                data.empTel = empTel;
                data.empSalary = empSalary;

                await this.employeeRepository.update(id, {
                    empFullname,
                    empAddress,
                    empTel,
                    empSalary
                });
                
                return data;
            }

            //update photo         
            if(data.empPhoto){
                await fs.unlink(path.join(process.cwd(), `./images/${data.empPhoto}`)); 
            }

            data.empFullname = empFullname;
            data.empAddress = empAddress;
            data.empTel = empTel;
            data.empSalary = empSalary;
            data.empPhoto = file?.filename;

            await this.employeeRepository.update(id, {
                empFullname,
                empAddress,
                empTel,
                empSalary,
                empPhoto: file?.filename
            });
            return data;
        } catch (err) {
            console.log(`error: ${err}`);
        }
    }

    async deleteEmployee(id: number): Promise<Response>{
        try{
            const data = await this.employeeRepository.findOne({
                where: {
                    id
                }
            });
            if (!data) {
                return {
                    msg: "Employee Not Found."
                }
            }
            if(data.empPhoto){
                await fs.unlink(path.join(process.cwd(), `./images/${data.empPhoto}`)); 
            }
            await this.employeeRepository.delete(id);
            return{
                msg: "Employee Deleted Successfully."
            }
        }catch(err){
            console.log(`error: ${err}`);
        }
    }
}
