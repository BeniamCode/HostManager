// src/pages/api/hosts.js

import Astro from "astro";
import { createHost, getAllHosts } from "../../lib/hosts";

export const get = async () => {
  try {
    const hosts = await getAllHosts();
    return Astro.fetchContent(JSON.stringify(hosts));
  } catch (error) {
    return Astro.fetchContent(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

export const post = async ({ request }) => {
  const newHost = await request.json();
  try {
    const host = await createHost(newHost);
    return Astro.fetchContent(JSON.stringify(host));
  } catch (error) {
    return Astro.fetchContent(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
