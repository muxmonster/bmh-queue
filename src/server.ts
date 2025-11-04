import Fastify from "fastify";
import dotenv from "dotenv";
import patientRoute from "./routes/patient";
import ovstRoute from "./routes/ovst";
import rxOperatorRoute from "./routes/rx_operator";

dotenv.config();

const app = Fastify({ logger: true });

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
