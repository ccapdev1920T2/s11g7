const mongoose = require('mongoose')

/**
 * Represents the timeslot of the class.
 * 
 * @param day Follows /[MTWHFSL]/ regex format (e.g. "M", "T") for repeating classes, 
 * or must be a date with the format MM/DD for single-day classes (e.g. "2/28").
 * @param time String in military time, no colon (e.g. "2359", "1231").
 * @param room Code of room of the class (e.g. "A1403", "G203").
 */
var ClassTimeSchema = mongoose.Schema({
    
    day: {
        type: String,
        required: true,
        match: /^[MTWHFSL]$|^\d{1,2}\/\d{1,2}$/
    },
    time: {
        type: {
            from: {
                type: String,
                required: true,
                match: /^([01]\d|2[0-3])([0-5]\d)$/
            },
            to: {
                type: String,
                required: true,
                match: /^([01]\d|2[0-3])([0-5]\d)$/
            }
        }
    },
    room: {
        type: String,
        required: true
    }
})

module.exports = ClassTimeSchema
// module.exports = mongoose.model('ClassTime', ClassTimeSchema)