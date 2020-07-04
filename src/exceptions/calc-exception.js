const CalcException = function(message) {
    this.message = message;

    this.getMessage = () => this.message;
};

export default CalcException;