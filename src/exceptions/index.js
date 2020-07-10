export function CalcException(message, displayMessage = "Entrada inválida.") {
  this.message = message;
  this.displayMessage = displayMessage;

  this.getMessage = () => this.message;
  this.getDisplayMessage = () => this.displayMessage;
}
