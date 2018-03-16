module.exports.replaceAndTrim = function() {
    String.prototype.replaceAndTrim = function() {
        return this.replace('\n', '').trim();
    }
}