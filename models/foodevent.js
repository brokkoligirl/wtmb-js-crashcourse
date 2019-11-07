module.exports = class FoodEvent {
    constructor(eventName, eventHost, eventDate, maxAttendees, eventAttendees = []) {
        this.eventName = eventName;
        this.eventHost = eventHost;
        this.eventDate = eventDate;
        this.maxAttendees = maxAttendees;
        this.eventAttendees = eventAttendees;
    }
}
