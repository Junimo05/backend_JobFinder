import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './Job/job.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApplicationModule } from './Application/application.module';
import { EmployerModule } from './Employer/employer.module';
import { EmployeeModule } from './Employee/employee.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    PrismaModule,
    JobModule,
    ApplicationModule,
    EmployerModule,
    EmployeeModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
