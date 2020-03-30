import mongoose from 'mongoose'

let ClassTimeSchema = mongoose.Schema({
    /* If repeating = true, then timeslot follow /[MTWHFS]+/ regex format (e.g. "MW", "TH"),
       else must be a date with the format MM/DD */
    timeslot: {
        type: String,
        required: true,
        validate: function(v) {
            return /^[MTWHFS]+$|^\d{1,2}\/\d{1,2}$/.test(v)
        }
    },
    room: {
        type: String,
        required: true
    }
})

module.exports('ClassTime', ClassTimeSchema)