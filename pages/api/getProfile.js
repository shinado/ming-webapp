import { createOrbitDB } from "@orbitdb/core";
import { create } from "ipfs-core";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const address = req.body.address;
    console.log("getProfile.address: ", address);

    // Create an IPFS instance with defaults.
    const ipfs = await create();
    const orbitdb = await createOrbitDB({ ipfs });
    const db = await orbitdb.open("ming-db", { type: "documents" });

    if (!db.get("address")) {
      db.put("address", address);
    }

    // Close your db and stop OrbitDB and IPFS.
    await db.close();
    await orbitdb.stop();
    await ipfs.stop();

    const newAddress = await db.get("address");
    console.log("new.address: ", newAddress);
    res.status(200).json({address: newAddress});

    // res.status(200).json({ db: address });
  } else {
    // Handle other HTTP methods or return an error
    res.status(405).send("Method Not Allowed");
  }
}
