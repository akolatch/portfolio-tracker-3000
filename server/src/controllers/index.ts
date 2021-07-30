import { Request, Response } from 'express';

interface IUpdates {
  text?: string | undefined;
  completed?: boolean | undefined;
}

export const portfolios = {
  getAll: async (req: Request, res: Response) => {},

  create: async (req: Request, res: Response) => {},

  update: async (req: Request, res: Response) => {},

  delete: async (req: Request, res: Response) => {},
};
