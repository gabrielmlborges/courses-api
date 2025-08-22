import { fastifySwagger } from '@fastify/swagger'
import fastifyAPIReference from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { getCoursesRoute } from './routes/get-courses.ts'
import { getCourseByIdRoute } from './routes/get-course-by-id.ts'
import { createCourseRoute } from './routes/create-course.ts'
import { loginRoute } from './routes/login.ts'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.register(fastifySwagger, {
    openapi: {
        info : {
            title: 'Course API',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform,
})

server.register(fastifyAPIReference, {
    routePrefix: '/docs'
})

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(getCoursesRoute)
server.register(getCourseByIdRoute)
server.register(createCourseRoute)
server.register(loginRoute)

export { server }
