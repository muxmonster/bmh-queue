import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { role: string };  // type ของ payload เวลาสร้าง token
    user: { role: string };     // type ของ user หลัง verify แล้ว
  }
}

declare module "fastify" {
  interface FastifyRequest {
    jwtVerify(): Promise<{ role: string }>;
  }
}
