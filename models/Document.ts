import { model, models, Schema } from "mongoose";

const DocumentSchema = new Schema(
  {},
  {
    timestamps: true,
  }
);

const DocumentModel =
  model("Document", DocumentSchema, "documents") || models.Document;
export default DocumentModel;
