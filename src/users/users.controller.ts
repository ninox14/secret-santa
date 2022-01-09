import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BasicUserType, GetUserResponse } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({ type: BasicUserType })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const wishesArr = JSON.parse(createUserDto.wishes) as string[];
    try {
      const isValidLength =
        wishesArr.length > 0 &&
        wishesArr.length < 10 &&
        Array.isArray(wishesArr);
      if (!isValidLength) {
        throw new BadRequestException(
          'Wishes must be an array of strigns with length from 1 to 10 and each string must be maximum length of 100 ',
        );
      }
      wishesArr.forEach((item) => {
        if (item.length > 100) {
          throw new BadRequestException(
            'Wishes must be an array of strigns with length from 1 to 10 and each string must be maximum length of 100 ',
          );
        }
      });
      return this.usersService.create(createUserDto);
    } catch (err) {
      throw err;
    }
  }

  @ApiOkResponse({ type: GetUserResponse, isArray: true })
  @ApiNotFoundResponse()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOkResponse({ type: GetUserResponse, isArray: false })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({ type: UpdateUserDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
