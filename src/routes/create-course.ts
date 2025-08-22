import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import { z } from 'zod'
import { checkUserRole } from './hooks/check-user-role.ts'
import { checkRequestJWT } from './hooks/check-request-jwt.ts'

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
    server.post('/courses', {
      preHandler: [
        checkRequestJWT,
        checkUserRole('manager')
      ],
        schema: {
            tags: ['courses'],
            summary: 'Create a course',
            body: z.object({
                title: z.string().min(5, 'Titulo precisa ter 5 characteres'),
            }),
            response: {
                201: z.object({ courseId: z.uuid() }).describe('Created.')
            }
        }
    }, async (request, reply) => {
        const body = request.body.title

        const result = await db
            .insert(courses)
            .values({ title: body })
            .returning()

        return reply.status(201).send({ courseId: result[0].id })
    })
}
