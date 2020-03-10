<template>
<div>

    <FullCalendar
        defaultView = "timeGridWeek"
        :plugins = "calendarPlugins"
        :header = "false"
        :events = "calendarEvents"
        :eventColor = "'rgb(0, 112, 60)'"
        :eventTextColor = "'white'"
        :allDaySlot = "false"
        :hiddenDays = '[0]'
        :minTime = "'07:30:00'"
        :maxTime = "'22:30:00'"
        :height = "'auto'"
        :columnHeaderFormat = "{
            weekday: 'short'
        }"
    />

</div>

</template>


<script>
require('@fullcalendar/core/main.min.css')
require('@fullcalendar/daygrid/main.min.css')
require('@fullcalendar/timegrid/main.min.css')

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
    components: {
        FullCalendar
    },
    data(){
        return {
            calendarPlugins:[
                                dayGridPlugin,
                                timeGridPlugin
                            ],
            calendarEvents: [
                                {
                                    title: 'GEETHIC',
                                    daysOfWeek: ['1', '3'],
                                    startTime: '07:30:00',
                                    endTime: '9:00:00'
                                },
                                {
                                    title: 'STALGCM',
                                    daysOfWeek: ['1', '3'],
                                    startTime: '09:15:00',
                                    endTime: '10:45:00'
                                },
                                {
                                    title: 'CCAPDEV',
                                    daysOfWeek: ['1', '3'],
                                    startTime: '11:00:00',
                                    endTime: '12:30:00'
                                },
                                {
                                    title: 'ST-MATH',
                                    daysOfWeek: ['2', '4'],
                                    startTime: '07:30:00',
                                    endTime: '9:00:00'
                                },
                                {
                                    title: 'CSARCH1',
                                    daysOfWeek: ['2', '4'],
                                    startTime: '11:00:00',
                                    endTime: '12:30:00'
                                },
                                {
                                    title: 'GESPORT',
                                    daysOfWeek: ['2'],
                                    startTime: '13:00:00',
                                    endTime: '15:00:00'
                                },
                            ]
        }
    }
}
</script>

<style scoped>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
</style>