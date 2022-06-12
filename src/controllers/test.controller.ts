import { Request, Response } from "express";

export const getTests = (req: Request, res: Response) => {

    res.json({
        msg: 'getTestings'
    });

}

export const getTest = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'getTesting'
    });

}

export const postTest = (req: Request, res: Response) => {

    const { body } = req;

    res.json({
        msg: 'postTesting',
        body
    });
}

export const putTest = (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'putTesting'
    });
}

export const deleteTest = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'deleteTesting',
        id
    });
}