import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';


@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService]
})
export class ApplicationModule {}