// /src/lib/hosts.js
import { Hosts } from "./mongodb";

export const getAllHosts = async () => {
  const hosts = await (await Hosts()).find({}).toArray();
  return hosts;
};

export const createHost = async (newHost) => {
  const host = await (await Hosts()).insert(newHost);
  return host;
};
