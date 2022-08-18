import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma"

type Notebook = {
  id: string
  title: string
  author: string
  moduleId: string
}

type ResponseNotebook = {
  items: Notebook[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const notebookId = req.query.id
    if (notebookId !== undefined) {
      const dbNotebook: Notebook = await prisma.notebooks.findUnique({
        where: {
          id: notebookId,
        },
      })
      if (dbNotebook == undefined) {
        res.status(400).json({ error: "Notebook not found." })
        return
      }
      res.status(200).json({items: dbNotebook})
    }

    // extended functionality list all by moduleId
    const moduleId = req.query.moduleId
    if (moduleId !== undefined) {
      const dbNotebook: Notebook = await prisma.notebooks.findMany({
        where: {
          moduleId: moduleId,
        },
      })
      if (dbNotebook == undefined) {
        res.status(400).json({ error: "Notebook not found." })
        return
      }
      res.status(200).json({items: dbNotebook})
    }

    const notebook: Notebook[] = await prisma.notebooks.findMany()
    const response: ResponseNotebook = { items: notebook }
    res.status(200).json(response)
  }
  if (req.method === "POST") {
    const notebook: Notebook = req.body
    try {
      const createdNotebook = await prisma.notebooks.create({
        data: notebook
      })
      res.status(200).json({ items: createdNotebook })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          res.status(400).json({
            error: 'There is a unique constraint violation, a new notebook cannot be created with this id'
          })
          return
        }
        res.status(400).json({ error: err })
        return
      }
      res.status(400).json({ error: "Unknown error!" })
    }
  }
  if (req.method === "PUT") {
    const notebookId = req.query.id
    const dbNotebook: Notebook = await prisma.notebooks.findUnique({
      where: {
        id: notebookId,
      },
    })
    if (dbNotebook == undefined) {
      res.status(400).json({ error: "Notebook not found." })
      return
    }

    const notebook: Notebook = req.body
    const updateNotebook: Notebook = await prisma.notebooks.update({
      where: {
        id: notebookId,
      },
      data: notebook,
    })
    const response = { items: updateNotebook }
    res.status(200).json(response)
  }
  if (req.method === "DELETE") {
    const notebookId = req.query.id
    const dbNotebook: Notebook = await prisma.notebooks.findUnique({
      where: {
        id: notebookId,
      },
    })
    if (dbNotebook == undefined) {
      res.status(400).json({ error: "Notebook not found." })
      return
    }

    const deleteNotebook = await prisma.notebooks.delete({
      where: {
        id: notebookId,
      },
    })

    const response = { items: deleteNotebook }
    res.status(200).json(response)
  }
}

