
import { CustomError } from "../interface/customError";
class AppError extends Error{
  public readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

  }
}
export default AppError;