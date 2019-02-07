import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import ExampleControlSlot from '../ExampleControlSlot'
import doctors from '../doctors'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const propTypes = {}

class Selectable extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = { events }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  eventProp = ({ event, start, end, isSelected }) => {
    // debugger
    // console.info(obj);
    // return 'sisaclass';
    return {
      style: {
        eventColor: {
          color: '#00ff00',
        },
      },
    }
  }

  render() {
    // const { localizer } = this.props
    return (
      <>
        <ExampleControlSlot.Entry waitForOutlet>
          <strong>
            Click an event to see more info, or drag the mouse over the calendar
            to select a date/time range.
          </strong>
        </ExampleControlSlot.Entry>
        <BigCalendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={BigCalendar.Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2019, 0, 19)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          doctors={doctors}
          step={15}
          eventPropGetter={this.eventProp}
        />
      </>
    )
  }
}

Selectable.propTypes = propTypes

export default Selectable
