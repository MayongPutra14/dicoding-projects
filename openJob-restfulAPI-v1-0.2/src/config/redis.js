import { createClient } from "redis";

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}`,
});

client.on("error", (err) => console.error("Redis Error", err));

await client.connect();

export default client;
