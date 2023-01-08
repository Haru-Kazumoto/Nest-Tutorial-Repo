import { 
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    UsePipes,
    ParseIntPipe,
    Delete,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { ValidateCreateUserPipe } from '../pipes/validate-create-user.pipe';
import { AuthGuard } from '../guards/auth/auth.guard';

/**
 * AuthGuard is use for trigger the authentication 
 * and the decorator can be use for whole controller
 * or a single endpoint method.
 */

@Controller('user')
// @UseGuards(AuthGuard)
export class UserController {
    
    constructor(private readonly userService: UserService){}

    //Get all user from array
    @Get()
    @UseGuards(AuthGuard)
    getUsers(){
        return this.userService.fetchData();
    }

    //Add new data using validation
    @Post('add')
    @UsePipes(new ValidationPipe())
    createUser(@Body(ValidateCreateUserPipe) userData: UserDto){
        console.log(userData.age.toPrecision())
        return this.userService.postUser(userData);
    }

    //Get user by id
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number){
        return this.userService.fetchDataById(id)
    }

    //Remove user by id
    @Delete('delete/:id')
    removeUserById(@Param('id', ParseIntPipe) id: number){
        return this.userService.removeUserById(id)
    }

    //Update user by id
    @Put('update/:id')
    @UsePipes(new ValidationPipe())
    updateUserById(@Param('id') id:number,@Body() userData: UserDto){
        return this.userService.updateUserById(id, userData);
    }
}
