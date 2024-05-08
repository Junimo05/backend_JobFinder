import { Module } from '@nestjs/common';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';


@Module({
  controllers: [EmployerController],
  providers: [EmployerService]
})
export class EmployerModule {}