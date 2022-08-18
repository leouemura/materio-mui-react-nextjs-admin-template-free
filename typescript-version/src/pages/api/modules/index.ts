import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma"

type Module = {
  id: string
  title: string
}

type ResponseModule = {
  items: Module[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const moduleId = req.query.id
    if (moduleId !== undefined) {
      const dbModule: Module = await prisma.module.findUnique({
        where: {
          id: moduleId,
        },
      })
      if (dbModule == undefined) {
        res.status(400).json({ error: "Module not found." })
        return
      }
      res.status(200).json({items: dbModule})
    }

    const module: Module[] = await prisma.module.findMany()
    const response: ResponseModule = { items: module }
    res.status(200).json(response)
  }
  if (req.method === "POST") {
    const module: Module = req.body
    try {
      const createdModule = await prisma.module.create({
        data: module
      })
      res.status(200).json({ items: createdModule })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          res.status(400).json({
            error: 'There is a unique constraint violation, a new module cannot be created with this id'
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
    const moduleId = req.query.id
    const dbModule: Module = await prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    })
    if (dbModule == undefined) {
      res.status(400).json({ error: "Module not found." })
      return
    }

    const module: Module = req.body
    const updateModule: Module = await prisma.module.update({
      where: {
        id: moduleId,
      },
      data: module,
    })
    const response = { items: updateModule }
    res.status(200).json(response)
  }
  if (req.method === "DELETE") {
    const moduleId = req.query.id
    const dbModule: Module = await prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    })
    if (dbModule == undefined) {
      res.status(400).json({ error: "Module not found." })
      return
    }

    const deleteModule = await prisma.module.delete({
      where: {
        id: moduleId,
      },
    })

    const response = { items: deleteModule }
    res.status(200).json(response)
  }
}