import { UserCreate } from '@/models/user.interface';
import prisma from './index';

export const getAllAsync = async () => {
    const users = await prisma.user.findMany({});
    return users;
}

export const getAsync = async (user: string, password: string) => {
    const userFound = await prisma.user.findFirst({
        where: { user, password }
    });
    return userFound;
}

export const createAsync = async (user: UserCreate) => {
    const userType = await prisma.userType.findFirst({
        where: { type: user.type }
    });

}