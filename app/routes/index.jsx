import { json, useLoaderData } from "remix";
import { Redis } from "@upstash/redis";

const redis = Redis.fromCloudflareEnv();

export const loader = async () => {
  const start = new Date();
  const count = await redis.incr("counter");
  return json({ count, loadingTime: new Date() - start });
};

export default function Index() {
  const { count, loadingTime } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Record speeds with Remix on Cloudflare and Upstash Redis</h1>
      <p>
        In the last <b>{loadingTime} ms</b> this app ...
      </p>
      <ul>
        <li>
          incremented the page view counter on an{" "}
          <a href="https://upstash.com/redis">Upstash Redis</a>{" "}
          <a href="https://docs.upstash.com/redis/features/globaldatabase">
            Global Database
          </a>
        </li>
        <li>fetched the current page view count</li>
      </ul>

      <p>This was done {count} times already.</p>
    </div>
  );
}
