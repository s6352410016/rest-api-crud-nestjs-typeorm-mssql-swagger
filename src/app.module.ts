import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [
    EmployeeModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'bunlung',
      password: '5087',
      database: 'rest_api_crud_nestjs_db',
      entities: [Employee],
      synchronize: true,
      options: {
        encrypt: false
      }
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
