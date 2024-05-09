import { Module } from "@nestjs/common";
import { JobGroupController } from "./jobgroup.controller";
import { JobGroupService } from "./jobgroup.service";

@Module({
    
    controllers: [JobGroupController],
    providers: [JobGroupService],
  })
  export class JobGroupModule {}