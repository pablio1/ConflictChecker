import React, { Component } from 'react'

export default class componentName extends Component {

    state = {
        showErrors: false,
        isConflict: false,
        isOverload: false,
        draftSchedules: [
            {
                edpcode: '1231',
                subject_name: 'test',
                subject_type: 'test',
                days: 'MW',
                begin_time: '7:30',
                end_time: '7:40',
                mdn: 'MWF',
                m_begin_time: 'test',
                m_end_time: 'test',
                units: '13',
                room: '121',
                size: '21',
                max_size: '25',
            },
            {
                edpcode: '1231',
                subject_name: 'test',
                subject_type: 'test',
                days: 'MW',
                begin_time: '7:30',
                end_time: '7:40',
                mdn: 'MWF',
                m_begin_time: 'test',
                m_end_time: 'test',
                units: '13',
                room: '121',
                size: '21',
                max_size: '25',
            }
        ]
    }


    conflictChecker = (e) => {
        const [draftSchedules] = this.state;

        const selectedSchedule = {
            edpcode: e.edpcode,
            subject_name: e.subject_name,
            subject_type: e.subject_type,
            days: e.days,
            begin_time: e.begin_time,
            end_time: e.end_time,
            mdn: e.mdn,
            m_begin_time: e.m_end_time,
            m_end_time: e.m_end_time,
            units: e.units,
            room: e.room,
            size: e.size,
            max_size: e.max_size,
        }

        for(var days = 0; days < 7; days++){
            for(var index = 0; index < draftSchedules.length; index++)
            {
                var object = draftSchedules[index];
                
                if(object.mdn === "MW" && selectedSchedule.mdn === "MW")
                {
                    if(selectedSchedule.m_begin_time === object.m_begin_time && selectedSchedule.m_begin_time === object.m_end_time)
                    {
                        this.setState({
                            isConflict: true,
                        });
                    }
                    if(selectedSchedule.m_end_time === object.m_begin_time && selectedSchedule.m_end_time === object.m_end_time)
                    {
                        this.setState({
                            isConflict: true,
                        });
                    }
                }
            }
        }
    }
    render() {
        const[draftSchedules] = this.state;
        
        const selectedSchedule = {
            edpcode: '1231',
            subject_name: 'test',
            subject_type: 'test',
            days: 'MW',
            begin_time: '7:30',
            end_time: '7:40',
            mdn: 'MWF',
            m_begin_time: 'test',
            m_end_time: 'test',
            units: '13',
            room: '121',
            size: '21',
            max_size: '25',
        }

        this.conflictChecker(selectedSchedule);

        return (
            <div>
                {
                    isConflict ?
                    (
                        <h1>Conflict</h1>
                    ):"not Conflict"
                }
            </div>
        )
    }
}
