import { FastifyRequest, FastifyReply } from "fastify";

export async function authVerify(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    return reply.code(401).send({ code: 401, message: "Unauthorized" });
  }
}