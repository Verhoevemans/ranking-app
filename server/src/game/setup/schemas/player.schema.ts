import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

/*
@Schema()
export class Player {
  @Prop()
  email: string;
  
  @Prop()
  name: string;
}
*/

export const PlayerSchema = new mongoose.Schema({
  email: String,
  name: String
});