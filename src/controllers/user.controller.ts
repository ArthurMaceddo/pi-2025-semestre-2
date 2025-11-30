import type { Request, Response } from 'express'
import * as userService from '../services/user.services.js'

export async function createUser(req: Request, res: Response){
    const { nome, email, senha} = req.body
    const user = await userService.createUser({ nome, email, senha })
    res.status(200).json(user)
}

export async function getAllUser(req: Request, res: Response){
    const user = await userService.getAllUsers();
    res.status(200).json(user)
}

export async function getUserById(req: Request, res: Response){
    const { id } = req.params
    const user = await userService.findUserById(Number(id))
    user ? res.status(200).json(user) : res.status(404).json({ message:"User not find"})
}

export async function updateUser(req: Request, res: Response){
    const { id } = req.params
    const { name, email, password} = req.body
    const user = await userService.updateUser(Number(id), {
        name,
        email,
        password
    })
    !user ? res.status(404).json({ message: "User not find/ Couldnt find use to UPDATE"}) : res.status(200).json(user)
}

export async function deleteUserById(req: Request, res: Response){
    const { id } = req.params
    const user = await userService.deleteUser(Number(id))
    !user ? res.status(404).json({ message: "User not find/ Couldnt find use to DELETE"}) : res.status(200).json(user)
}