const axios = require("axios");
const path = require("path");
const FormData = require("form-data");
const fs = require("fs");
import { IncomingForm } from "formidable";
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiMGQ5ZmU5Yy1mY2UxLTQxNTAtOTg2OC03MjA4MGFmNzQwZjIiLCJlbWFpbCI6InNoaW5hZG8wMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImEwYzY1ZGY4ODE3ZjkzYmYxODY1Iiwic2NvcGVkS2V5U2VjcmV0IjoiYjlmNWIxOTFhYjZmMDZlZTliYjBkNzgwOThmN2JmNWZjM2EzOTQzYjBiMmY0YTllZDZlNzAzN2RlNzM2YmEzNSIsImlhdCI6MTcwMzc1MTY4OX0.VQgk6ogBQ8wwlFWzeyDeGTugKWLAoDYc_dZq9hL-qlE";

export const config = {
  api: {
    bodyParser: false, // Turn off body parsing, since Formidable will handle it
  },
};

export default async function handler(req, res) {
  //get formdata from req

  console.log("uploading...");

  const form = new IncomingForm({
    uploadDir: "./uploads",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Implement your logic here (e.g., save file info to database)
    const file = files.file[0]; // Access the file from the request
    // console.log("file: ", file);
    // console.log("fields: ", fields);

    const path = file.filepath;
    console.log("file.path: ", path);

    const formData = new FormData();
    formData.append("file", fs.createReadStream(path));

    const pinataMetadata = JSON.stringify({
      name: "Filename",
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    try {
      const result = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data;`,
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      console.log(result.data);

      res.status(200).json(result.data);
    } catch (error) {
      console.log(error);
    }
  });
}
