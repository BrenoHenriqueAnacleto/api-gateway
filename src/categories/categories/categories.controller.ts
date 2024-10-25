import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from '../../dtos/category/create-category.dto';
import { Observable } from 'rxjs';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller('api/v1/categories')
export class CategoriesController {
  private logger = new Logger(CategoriesController.name);

  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categories')
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategory: CreateCategoryDto) {
    this.clientAdminBackend.emit('create-category', createCategory);
  }

  @Get('categories')
  getCategories(): Observable<any> {
    this.logger.log('Buscando todas catergorias');
    return this.clientAdminBackend.send('get-categories', '');
  }

  @Get('categories/:categoryId')
  getCategoriesById(@Param('categoryId') _id: string): Observable<any> {
    this.logger.log('Buscando as catergorias com id' + _id);
    return this.clientAdminBackend.send('get-categories', _id || '');
  }
}
