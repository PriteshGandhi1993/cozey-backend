import { createUser, getUsers } from "../service/user.service";

export async function create(req: any) {
    return createUser(req);
}

export async function getUser() {
    const response = await getUsers();
    console.log(response);
    return response;
}