import { model, models, Schema } from "mongoose";


export const UserSchema = new Schema({

})

export const ComplianceUser  = models.ComplianceUser || model("ComplianceUser", UserSchema);