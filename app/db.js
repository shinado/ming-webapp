import { createOrbitDB } from "@orbitdb/core";
import { create } from "ipfs-core";

export async function getGhostProfile(address) {
  // Create an IPFS instance with defaults.
  const ipfs = await create();
  const orbitdb = await createOrbitDB({ ipfs });
  const db = await orbitdb.open("ming-db", {});
  console.log("ming-db address", db.address);
}
