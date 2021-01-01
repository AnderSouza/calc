export class CalcException {
  message: string;
  displayMessage: string;

  constructor(message: string, displayMessage: string = "Invalid entry.") {
    this.message = message;
    this.displayMessage = displayMessage;
  }

  getMessage = () => this.message;
  getDisplayMessage = () => this.displayMessage;
}
