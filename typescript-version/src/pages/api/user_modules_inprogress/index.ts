import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma"

type InProgress = {
  id: string
  userId: string
  moduleId: string
}

type ResponseInProgress = {
  items: InProgress[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const inProgressId = req.query.id
    if (inProgressId !== undefined) {
      const dbInProgress: InProgress = await prisma.userModulesInProgress.findUnique({
        where: {
          id: inProgressId,
        },
      })
      if (dbInProgress == undefined) {
        res.status(400).json({ error: "InProgress not found." })
        return
      }
      res.status(200).json({items: dbInProgress})
    }

    const inProgress: InProgress[] = await prisma.userModulesInProgress.findMany()
    const response: ResponseInProgress = { items: inProgress }
    res.status(200).json(response)
  }
  if (req.method === "POST") {
    const inProgress: InProgress = req.body
    try {
      const createdInProgress = await prisma.userModulesInProgress.create({
        data: inProgress
      })
      res.status(200).json({ items: createdInProgress })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          res.status(400).json({
            error: 'There is a unique constraint violation, a new inProgress cannot be created with this id'
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
    const inProgressId = req.query.id
    const dbInProgress: InProgress = await prisma.userModulesInProgress.findUnique({
      where: {
        id: inProgressId,
      },
    })
    if (dbInProgress == undefined) {
      res.status(400).json({ error: "InProgress not found." })
      return
    }

    const inProgress: InProgress = req.body
    const updateInProgress: InProgress = await prisma.userModulesInProgress.update({
      where: {
        id: inProgressId,
      },
      data: inProgress,
    })
    const response = { items: updateInProgress }
    res.status(200).json(response)
  }
  if (req.method === "DELETE") {
    const inProgressId = req.query.id
    const dbInProgres: InProgress = await prisma.userModulesInProgress.findUnique({
      where: {
        id: inProgressId,
      },
    })
    if (dbInProgres == undefined) {
      res.status(400).json({ error: "InProgress not found." })
      return
    }

    const deleteInProgress = await prisma.userModulesInProgress.delete({
      where: {
        id: inProgressId,
      },
    })

    const response = { items: deleteInProgress }
    res.status(200).json(response)
  }
}

