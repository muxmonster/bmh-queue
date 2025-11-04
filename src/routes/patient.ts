import { FastifyInstance } from "fastify";
import { db } from "../db";

export default async function patientRoute(app: FastifyInstance) {
  app.get("/:hn", async (req, reply) => {
    const { hn } = req.params as { hn: string };
    const patient = await db("patient")
      .select("hn", "pname", "fname", "lname")
      .where("hn", hn)
      .first();

    if (!patient) return reply.code(404).send({ message: "Patient not found" });
    return patient;
  });
  //  select all records
   app.get("/", async (_req, reply) => {
    const patient = await db("patient")
      .select("hn","pname","fname","lname");
    if (!patient) return reply.code(404).send({ message: "Patient not found" });
    return patient;
  });
}
