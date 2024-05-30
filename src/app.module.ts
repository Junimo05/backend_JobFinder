import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './Job/job.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApplicationModule } from './Application/application.module';
import { EmployerModule } from './Employer/employer.module';
import { EmployeeModule } from './Employee/employee.module';
import { UserModule } from './User/user.module';
import { JobGroupModule } from './JobGroup/jobgroup.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { from } from 'rxjs';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigService from @nestjs/config
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    } 
    ),
    MulterModule,
    PrismaModule,
    JobModule,
    ApplicationModule,
    EmployerModule,
    EmployeeModule,
    UserModule,
    JobGroupModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({ 
        transport: {
          host: configService.get('MAIL_HOST'),
          port: 587,
          secure: false,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD')
          },
        },
        defaults: {
          from: `"Confirmed Email" <${configService.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, '../src/templates/email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
    }),
    inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
