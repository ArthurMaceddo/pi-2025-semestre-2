import type { Request, Response } from "express";
import * as budgetItemService from "../services/budgetItem.service.js";

// POST /budgets/:budgetId/items
export async function createItem(req: Request, res: Response) {
  try {
    const { budgetId } = req.params;

    // ATENÇÃO: O Budget ID é Int no seu banco, então convertemos para Number
    const itemData = { 
        ...req.body, 
        budgetId: Number(budgetId) 
    };

    const item = await budgetItemService.createBudgetItem(itemData);
    res.status(201).json(item);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: error.message || "Erro ao criar item" });
  }
}

// GET /budgets/:budgetId/items
export async function getItemsByBudget(req: Request, res: Response) {
  try {
    const { budgetId } = req.params;
    // ATENÇÃO: O Budget ID é Int
    const items = await budgetItemService.getItemsByBudget(Number(budgetId));
    res.status(200).json(items);
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Erro ao buscar itens" });
  }
}

// GET /items/:id
export async function getItemById(req: Request<{ id: string}>, res: Response) {
  try {
    const { id } = req.params; // Esse é o ID do ITEM (UUID)

    // O Item ID é String (UUID), NÃO use Number()
    const item = await budgetItemService.findItemById(id);
    
    if (!item) {
        return res.status(404).json({ message: "Item não encontrado" });
    }

    res.status(200).json(item);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}

// PUT /items/:id
export async function updateItem(
   req: Request<{ id: string }>,   // ← AQUI resolve o erro do ------------------>(id)<-
  res: Response   //              item = await budgetItemService.updateBudgetItem(id)  
) {
  try {
    const { id } = req.params;
    const { quantity, unitPrice } = req.body;

    // criamos  o objeto sem propriedades undefined
    const data: any = {};

    if (quantity !== undefined) data.quantity = Number(quantity);
    if (unitPrice !== undefined) data.unitPrice = Number(unitPrice);

    const item = await budgetItemService.updateBudgetItem(id, data);

    res.status(200).json(item);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}


// DELETE /items/:id

export async function deleteItemById(
  req: Request<{ id: string }>,   // ← AQUI resolve o erro do ------------------>(id)<-
  res: Response   //              item = await budgetItemService.deleteBudgetItem(id)  
) {
  try {
    const { id } = req.params;

    const item = await budgetItemService.deleteBudgetItem(id);

    res.status(200).json({
      message: "Item deletado com sucesso",
      data: item
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}