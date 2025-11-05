import { FastifyInstance } from "fastify";
import { db } from "../db";

export default async function rxOperatorRoute(app: FastifyInstance) {
  app.get("/:vn", async (req, reply) => {
    const { vn } = req.params as { vn: string };

    const status = await db("rx_operator as r")
      .leftJoin("ovst as o", "r.vn", "o.vn")
      .leftJoin("patient as p", "o.hn", "p.hn")
      .select(
        "r.vn",
        "r.prepare_rx",
        "o.hn",
        "o.oqueue",
        "p.pname",
        "p.fname",
        "p.lname"
      )
      .where("r.vn", vn)
      .where("r.prepare_rx","Y")
      .first();

    if (!status)
      return reply.code(404).send({ message: "Drug status not found" });
    return status;
  });
}
