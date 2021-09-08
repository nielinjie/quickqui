import { Model } from "./Model";
import { Log } from "./Log";
export interface ModelValidator {
  validate(model: Model): ValidateLog[];
}

export class ValidateLog implements Log {
  category: string = "model-validate";
  level: string;
  message: string = "";
  context: string = "";
  constructor(context: string, message: string, level: string = "error") {
    this.message = message;
    this.context = context;
    this.level = level;
  }
}
export class ValidateError extends ValidateLog {
  constructor(context: string, message: string) {
    super(context, message, "error");
  }
}