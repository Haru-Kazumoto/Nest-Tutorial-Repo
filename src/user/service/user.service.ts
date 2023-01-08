import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import MOCKED_DATA from '../db/clone.data.json'

@Injectable()
export class UserService {

    fakeData = MOCKED_DATA;

    //Get all data
    fetchData(){
        return this.fakeData;
    }

    //Push data to array
    postUser(userDetails: UserDto){
        this.fakeData.push(userDetails);
        return "Data has added to array";
    }

    //Get user by id
    fetchDataById(id: number){
        const dataId = this.fakeData.findIndex(
            (objId) => objId.id === id
        );
        if(!dataId) return "Data not found";
    }

    //Delete user by id 
    removeUserById(id: number){
        const objIdWithIndex = this.fakeData.findIndex(
            (obj) => obj.id === id
        );
        if(objIdWithIndex > -1){
            this.fakeData.splice(objIdWithIndex,1);
            return "Data number ["+id+"] has deleted";
        }
        return "Data not found";
    }

    //Update user by id
    updateUserById(id: number, userDto: UserDto){
        const objId = this.fakeData.findIndex(
            (obj) => obj.id === +id
        )
        // const objCompare = this.fakeData.sort(
        //     function(a,b){
        //         return a.id - b.id || a.username.localeCompare(b.username)
        //     }
        // )
        if(objId > -1){
            this.fakeData.splice(objId,1)
            const newData = {id : id,...userDto}
            return this.fakeData.unshift(newData)
        }
    }
}