import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  SelfBackendVerifier,
  AllIds,
  DefaultConfigStore
} from "@selfxyz/core";

const app = express();
const port = 8083;

app.use(cors());
app.use(bodyParser.json());

const configStore = new DefaultConfigStore({
  minimumAge: 18,
  excludedCountries: [],
  ofac: false,
});

const verifier = new SelfBackendVerifier(
  "myapp-prod",  // must match frontend scope
  "https://7704-2401-4900-8826-df5-cd4c-8527-f172-296e.ngrok-free.app",  // ngrok public URL
  true,  // test mode
  AllIds,
  configStore,
  "uuid"
);

app.post("/verify", async (req, res) => {
  try {
    const { attestationId, proof, publicSignals, userContextData } = req.body;

    const result = await verifier.verify(
      attestationId,
      proof,
      publicSignals,
      userContextData
    );

    if (!result.isValidDetails.isValid) {
      return res.status(400).json({ message: "Verification failed", result });
    }

    return res.status(200).json({
      status: "success",
      credentialSubject: result.discloseOutput,
    });
  } catch (err) {
    console.error("Verify error:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
}); 