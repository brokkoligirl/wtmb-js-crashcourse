module.exports = class Reservation {
    constructor(restaurant, patron, resDate, resTime, numberOfPeople) {
        this.restaurant = restaurant;
        this.patron = patron;
        this.resDate = resDate;
        this.resTime = resTime;
        this.numberOfPeople = numberOfPeople;
        this.approved = false;
        this.message = "";
    }
}
