import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException ,
  HttpStatus
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { ifError } from 'assert';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: UserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe')
    console.log(metadata)
    console.log(value)

    const parseAgeToInt = parseInt(value.age.toString());

    if(isNaN(parseAgeToInt)) {
      console.log(`${value.age} is not a number!`)
      throw new HttpException(
        "Invalid data type for property age. Expected Number",
        HttpStatus.BAD_REQUEST
      );
    } 
    console.log(`${parseAgeToInt} is a number, returning...`)
    return {
      ...value, age: parseAgeToInt
    };
  }
}
