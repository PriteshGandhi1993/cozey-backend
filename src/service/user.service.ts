import { Database } from "../dataSources"
import { Users } from "../entity/users.entity";

const userRepo = Database.getInstance().getRepository(Users)

export async function createUser(req: any) {
    let user = new Users();
    user.name = req?.name;
    if(!user.name) {
        throw new Error("Request is not valid, name is required");
    }
    const response = userRepo.save(user);
    console.log(response);
    return response;
}

export async function getUsers() {
    const response = await userRepo.find();
    console.log(response);
    return response;
}

export async function getUserById(id: string) {
    const response = await userRepo.find({
        id: id
    });
    console.log(response);
    return response;
}