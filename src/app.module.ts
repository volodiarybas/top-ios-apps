import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [ApplicationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
