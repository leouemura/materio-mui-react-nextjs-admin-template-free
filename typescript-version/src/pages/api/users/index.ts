import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../lib/prisma"

type User = {
  id: string
  name: string
  username: string
  email: string
  emailVerified: string
  image: string
  // accounts: 
  // sessions: 
  stripeCustomerId: string
  isActive: boolean
}

type ResponseUser = {
  items: User[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const userId = req.query.id
    if (userId !== undefined) {
      const dbUser: User = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
      if (dbUser == undefined) {
        res.status(400).json({ error: "User not found." })
        return
      }
      res.status(200).json({items: dbUser})
    }

    const user: User[] = await prisma.user.findMany()
    const response: ResponseUser = { items: user }
    res.status(200).json(response)
  }
  if (req.method === "POST") {
    const user: User = req.body
    try {
      const createdUser = await prisma.user.create({
        data: user
      })
      res.status(200).json({ items: createdUser })
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          res.status(400).json({
            error: 'There is a unique constraint violation, a new user cannot be created with this id'
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
    const userId = req.query.id
    const dbUser: User = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (dbUser == undefined) {
      res.status(400).json({ error: "User not found." })
      return
    }

    const user: User = req.body
    const updateUsers: User = await prisma.user.update({
      where: {
        id: userId,
      },
      data: user,
    })
    const response = { items: updateUsers }
    res.status(200).json(response)
  }
  if (req.method === "DELETE") {
    const userId = req.query.id
    const dbUser: User = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (dbUser == undefined) {
      res.status(400).json({ error: "User not found." })
      return
    }

    const deleteUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    })

    const response = { items: deleteUser }
    res.status(200).json(response)
  }
}

