class Helper {
  static getActualDate() {
    // TODO naze
    let date = new Date(Date.now());
    date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return date;
  }
}
module.exports = Helper;
