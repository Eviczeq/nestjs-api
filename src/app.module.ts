import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST') || 'mysql', // Update host to `mysql`
        port: parseInt(
          configService.get<string>('DATABASE_PORT') || '3306',
          10,
        ),
        username: configService.get<string>('DATABASE_USER') || 'root',
        password: configService.get<string>('DATABASE_PASSWORD') || 'password',
        database: configService.get<string>('DATABASE_NAME') || 'todo_db',
        entities: [User, Task],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
