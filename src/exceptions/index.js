export function CalcException(message) {
    this.message = message;

    this.getMessage = () => this.message;
};