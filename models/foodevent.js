module.exports = class FoodEvent {
    constructor(eventName, eventHost, eventDate, maxAttendees) {
        this.eventName = eventName;
        this.eventHost = eventHost;
        this.eventDate = eventDate;
        this.maxAttendees = maxAttendees;
        this.eventAttendees = [];
    }
}
