import { Body, Controller, UseInterceptors, UploadedFile , Post, Get, Param, Put, Delete } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/entities/employee.entity';
import { CreateEmployeeDto } from 'src/dtos/create-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { options } from '../multerOptions/multer-options';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { Response } from 'src/interfaces/response.interface';
import { UpdateEmployeeDto } from 'src/dtos/update-employee.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateEmployeeDto})
    @ApiResponse({status: 201 , description: "Employee Created Successfully."})
    @Post("create")
    @UseInterceptors(FileInterceptor("empPhoto", options))
    async createEmployee(
        @UploadedFile() file: Express.Multer.File,
        @Body() createEmployeeDto: CreateEmployeeDto
    ): Promise<Employee> {
        return this.employeeService.createEmployee(createEmployeeDto , file.filename);
    }

    @ApiResponse({status: 200 , description: "This Action Return All Employees."})
    @Get("getAll")
    async getAllEmployee(): Promise<Employee[] | Response>{
        return this.employeeService.getAllEmployee();
    }

    @ApiResponse({status: 200 , description: "This Action Return Employee By Id"})
    @Get("getById/:id")
    async getEmployeeById(@Param("id") id: number): Promise<Employee | Response>{
        return this.employeeService.getEmployeeById(id);
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({type: UpdateEmployeeDto})
    @ApiResponse({status: 200 , description: "Employee Updated Successfully."})
    @Put("update/:id")
    @UseInterceptors(FileInterceptor("empPhoto", options))
    async updateEmployee(
        @UploadedFile() file: Express.Multer.File,
        @Body() updateEmployeeDto: UpdateEmployeeDto,
        @Param("id") id: number
    ){
        return this.employeeService.updateEmployee(updateEmployeeDto , id , file);
    }

    @ApiResponse({status: 200 , description: "Employee Deleted Successfully."})
    @Delete("delete/:id")
    async deleteEmployee(@Param("id") id: number): Promise<Response>{
        return this.employeeService.deleteEmployee(id);
    }
}
