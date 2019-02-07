import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import BackgroundWrapper from './BackgroundWrapper'

export default class TimeSlotGroup extends Component {
  renderDoctorSlot() {
    let slots = this.props.getters ? this.props.getters.getDoctors : []
    let output = []
    if (slots.length > 0) {
      for (let i = 0; i < slots.length; i++) {
        if (slots[i].start.getTime() === this.props.group[0].getTime()) {
          output.push(
            <span
              key={`slot-${i}-${slots[i].color[0]}-${slots[i].color[1]}-${
                slots[i].color[2]
              }`}
              className={`slot-time-slot-group-hack slot-color-${
                slots[i].color[0]
              }-${slots[i].color[1]}-${slots[i].color[2]}`}
              style={{
                borderColor: `rgba(${slots[i].color[0]},${slots[i].color[1]},${
                  slots[i].color[2]
                },0)`,
                borderBottom: `9px solid rgba(${slots[i].color[0]},${
                  slots[i].color[1]
                },${slots[i].color[2]},0)`,
                background: `rgba(${slots[i].color[0]},${slots[i].color[1]},${
                  slots[i].color[2]
                },.5)`,
              }}
            >
              &nbsp;
            </span>
          )
        }
      }
    }
    return output
  }

  render() {
    const {
      renderSlot,
      resource,
      group,
      getters,
      components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
    } = this.props

    return (
      <div className="rbc-timeslot-group">
        {group.map((value, idx) => {
          const slotProps = getters ? getters.slotProp(value, resource) : {}
          return (
            <Wrapper key={idx} value={value} resource={resource}>
              <div
                {...slotProps}
                className={cn('rbc-time-slot', slotProps.className)}
              >
                {this.renderDoctorSlot().map(el => el)}
                {renderSlot && renderSlot(value, idx)}
              </div>
            </Wrapper>
          )
        })}
      </div>
    )
  }
}

TimeSlotGroup.propTypes = {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object,
  doctorSlots: PropTypes.array,
}
