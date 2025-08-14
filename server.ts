import { eq } from 'drizzle-orm'
import fastify from 'fastify'
import { validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod'
import { db } from './src/database/client.ts'
import { courses } from './src/database/schema.ts'

const server = fastify()

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.get('/courses', async (_, reply) => {
    const result = await db.select().from(courses)

    return reply.send( {courses: result })
})

server.get('/courses/:id', async (request, reply) => {
    type Params = {
        id: string
    }

    const params = request.params as Params
    const courseId = params.id

    const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId))

    if (result.length > 0) return { course: result[0] }

    return reply.status(404).send()
})

server.post('/courses', async (request, reply) => {
    type Body = {
        title: string
    }
    const body = request.body as Body
    const courseTitle = body.title
    if (!courseTitle) return reply.status(400).send({ message: 'Titulo obrigatorio' })
    const result = await db
        .insert(courses)
        .values({ title: courseTitle })
        .returning()
    return reply.status(201).send({ courseId: result[0] })
})

server.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})
