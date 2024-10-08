import { prop, Ref, getModelForClass } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Session {
  @prop()
  user: Ref<User>;

  @prop({ default: true })
  valid: boolean;
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: { timestamps: true },
});

export default SessionModel;
