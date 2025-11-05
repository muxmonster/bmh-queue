import Fastify from "fastify";
import dotenv from "dotenv";
import jwt from "@fastify/jwt";


import patientRoute from "./routes/patient";
import ovstRoute from "./routes/ovst";
import rxOperatorRoute from "./routes/rx_operator";

dotenv.config();

const app = Fastify({ logger: true });

// Register JWT
app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

app.post("/api/login", async (req, reply) => {
  const token = app.jwt.sign({ role: "client" }, { expiresIn: "8h" });
  return { token };
});

app.register(patientRoute, { prefix: "/api/patient" });
app.register(ovstRoute, { prefix: "/api/ovst" });
app.register(rxOperatorRoute, { prefix: "/api/rx" });

const start = async () => {
  try {
    const port = Number(process.env.PORT || 3000);
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Server running at http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
