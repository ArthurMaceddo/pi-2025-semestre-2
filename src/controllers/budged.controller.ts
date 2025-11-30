import type { Request, Response } from "express";
import * as budgetService from "../services/budget.services.js";

export async function createBudget(req: Request, res: Response) {
  try {
    const budget = await budgetService.createBudget(req.body);
    res.status(201).json(budget);
  } catch (Error: any) {
    console.log(Error);
    res.status(400).json({ Error: Error.message || "Erro ao criar budget" });
  }
}

export async function getAllBudget(req: Request, res: Response) {
  try {
    const budget = await budgetService.getAllBudgets();
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar orçamentos" });
  }
}

export async function getBudgetById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const budget = await budgetService.findBudgetById(Number(id));
    res.status(200).json(budget);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

export async function updatebudget(req: Request, res: Response) {
  try{
    const { id } = req.params;
    const budget = await budgetService.updateBudget(Number(id), req.body)
    res.status(200).json(budget)
  }catch(error: any){
    res.status(404).json({ message: error.message})
  }
}

export async function deletebudgetById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const budget = await budgetService.deleteBudget(Number(id));
    res.status(200).json({ message: "Orçamento deletado com sucesso", data: budget });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}