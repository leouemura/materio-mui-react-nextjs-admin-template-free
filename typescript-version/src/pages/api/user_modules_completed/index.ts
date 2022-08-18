import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma"

type Completed = {
  id: string
  userId: string
  moduleId: string
}

type ResponseCompleted = {
  items: Completed[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const completedId = req.query.id
    if (completedId !== undefined) {
      const dbCompleted: Completed = await prisma.userModulesCompleted.findUnique({
        where: {
          id: completedId,
        },
      })
      if (dbCompleted == undefined) {
        res.status(400).json({ error: "Completed not found." })
        return
      }
      res.status(200).json({items: dbCompleted})
    }

    const completed: Completed[] = await prisma.userModulesCompleted.findMany()
    const response: ResponseCompleted = { items: completed }
    res.status(200).json(response)
  }
  if (req.method === "POST") {
    const completed: Completed = req.body
    try {
      const createdCompleted = await prisma.userModulesCompleted.create({
        data: completed
      })
      res.status(200).json({ items: createdCompleted })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          res.status(400).json({
            error: 'There is a unique constraint violation, a new completed cannot be created with this id'
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
    const completedId = req.query.id
    const dbCompleted: Completed = await prisma.userModulesCompleted.findUnique({
      where: {
        id: completedId,
      },
    })
    if (dbCompleted == undefined) {
      res.status(400).json({ error: "Completed not found." })
      return
    }

    const completed: Completed = req.body
    const updateCompleted: Completed = await prisma.userModulesCompleted.update({
      where: {
        id: completedId,
      },
      data: completed,
    })
    const response = { items: updateCompleted }
    res.status(200).json(response)
  }
  if (req.method === "DELETE") {
    const completedId = req.query.id
    const dbCompleted: Completed = await prisma.userModulesCompleted.findUnique({
      where: {
        id: completedId,
      },
    })
    if (dbCompleted == undefined) {
      res.status(400).json({ error: "Completed not found." })
      return
    }

    const deleteCompleteds = await prisma.userModulesCompleted.delete({
      where: {
        id: completedId,
      },
    })

    const response = { items: deleteCompleteds }
    res.status(200).json(response)
  }
}

