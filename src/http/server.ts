import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { createCampaign } from "./routes/campaign/create";
import { GetById } from "./routes/campaign/get-by-id";
import { Delete } from "./routes/campaign/delete";
import { Update } from "./routes/campaign/update";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "SampleApi",
      description: "Sample backend service for managing campaigns",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.register(createCampaign);
app.register(GetById);
app.register(Delete);
app.register(Update);

app.listen({ port: 3000 }).then(() => {
  console.log("Server is running on port http://localhost:3000/docs");
});
