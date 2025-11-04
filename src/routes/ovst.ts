import { FastifyInstance } from "fastify";
import { db } from "../db";

export default async function ovstRoute(app: FastifyInstance) {
  app.get("/:vn", async (req, reply) => {
    const { vn } = req.params as { vn: string };

    const ovst = await db("ovst as o")
      .leftJoin("patient as p", "o.hn", "p.hn")
      .select(
        "o.vn",
        "o.hn",
        "p.pname",
        "p.fname",
        "p.lname",
        "o.vstdate",
        "o.oqueue"
      )
      .where("o.vn", vn)
      .first();

    if (!ovst) return reply.code(404).send({ message: "Visit not found" });
    return ovst;
  });
}
