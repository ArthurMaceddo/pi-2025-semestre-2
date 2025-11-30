import type { Request, Response } from 'express'
import * as clientService from '../services/client.services.js'

export async function createClient(req: Request, res: Response){
    const { nome, email, telefone, empresa} = req.body
    const client = await clientService.createClient({ nome, email, telefone, empresa })
    res.status(200).json(client)
}

export async function getAllClient(req: Request, res: Response){
    const client = await clientService.getAllClients();
    res.status(200).json(client)
}

export async function getClientById(req: Request, res: Response){
    const { id } = req.params
    const client = await clientService.findClientById(Number(id))
    client ? res.status(200).json(client) : res.status(404).json({ message:"cliente não encontrado"})
}

export async function updateClient(req: Request, res: Response){
    const { id } = req.params
    const { nome, email, senha} = req.body
    const client = await clientService.updateClient(Number(id), {
        nome,
        email,
        senha
    })
    !client ? res.status(404).json({ message: "Cliente não encontrado/Não foi possível encontrar o usuário para ATUALIZAR"}) : res.status(200).json(client)
}

export async function deleteclientById(req: Request, res: Response){
    const { id } = req.params
    const client = await clientService.deleteClient(Number(id))
    !client ? res.status(404).json({ message: "Cliente não encontrado/Não foi possível encontrar o usuário para DELETAR"}) : res.status(200).json(client)
}