import { Module } from '@nestjs/common';
import { JobsController } from './job.controller';
import { JobService } from './job.service';


@Module({
  controllers: [JobsController],
  providers: [JobService]
})
export class JobModule {}