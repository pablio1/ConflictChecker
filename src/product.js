import React, { Component } from 'react'

export default class product extends Component {
    state = {
        showErrors: false,
        isConflict: false,
        isOverload: false,
        draftSchedules: [
            {
                edpcode: '1',
                subject_name: 'MATH1',
                subject_type: 'Lecture',
                days: 'MW',
                begin_time: '7:30',
                end_time: '9:00',
                mdn: 'AM',
                m_begin_time: '7:30',
                m_end_time: '9:00',
                units: '13',
                room: '121',
                size: '21',
                max_size: '25',
            },
            {
              edpcode: '2',
              subject_name: 'ENGLISH 1',
              subject_type: 'Lecture',
              days: 'MW',
              begin_time: '9:30',
              end_time: '10:30',
              mdn: 'AM',
              m_begin_time: '9:30',
              m_end_time: '10:30',
              units: '13',
              room: '121',
              size: '21',
              max_size: '25',
          },
          {
              edpcode: '3',
              subject_name: 'PE 1',
              subject_type: 'Lecture',
              days: 'MW',
              begin_time: '8:30',
              end_time: '10:30',
              mdn: 'AM',
              m_begin_time: '8:30',
              m_end_time: '10:30',
              units: '13',
              room: '121',
              size: '21',
              max_size: '25',
          }
        ],
        selectedSchedules:[]
    }

    toSeconds = (time) => {
      var bits = time.split(':');
      return bits[0]*3600 + bits[1]*60;
    }

    conflictChecker = (e, data) => {
      const {isConflict, selectedSchedules} = this.state;
      let conflict= isConflict;

      const selectedSchedule = {
          edpcode: data.edpcode,
          subject_name: data.subject_name,
          subject_type: data.subject_type,
          days: data.days,
          begin_time: data.begin_time,
          end_time: data.end_time,
          mdn: data.mdn,
          m_begin_time: data.m_begin_time,
          m_end_time: data.m_end_time,
          units: data.units,
          room: data.room,
          size: data.size,
          max_size: data.max_size,
      }

      //console.log('timeConvert',this.toSeconds(selectedSchedule.m_begin_time));
      console.log('select',selectedSchedule);
      
        for(var index = 0; index < selectedSchedules.length; index++)
        {
            var object = selectedSchedules[index];
            if(object.days === "MW" && selectedSchedule.days === "MW")
            {
                console.log('object start Time',this.toSeconds(object.m_begin_time));
                console.log('object end time', this.toSeconds(object.m_end_time));

                //39600 > 27000 && 39600 < 39600 //8:30 > 7:30 && 8:30 < 9:30
                if(this.toSeconds(selectedSchedule.m_begin_time) > this.toSeconds(object.m_begin_time) && 
                this.toSeconds(selectedSchedule.m_begin_time) < this.toSeconds(object.m_end_time))
                {
                  conflict = true;
                  console.log('test 12');
                }
                if(this.toSeconds(selectedSchedule.m_end_time) > this.toSeconds(object.m_begin_time) &&
                this.toSeconds(selectedSchedule.m_end_time) < this.toSeconds(object.m_end_time))
                {
                  conflict = true;
                  console.log('test 22');
                }
            }
        }
        //selectedSchedules.push(selectedSchedule);
        if(conflict){
          console.log('status',conflict);
          this.setState({isConflict: true});
        }
        this.setState(prevState => ({
          ...prevState,
          selectedSchedules: [...prevState.selectedSchedules,selectedSchedule]
       }))
       

    }

    
    render() {
        const{draftSchedules,selectedSchedules} = this.state;
        //const values = {selectedSchedules};
        return (
            <div>
                {
                    this.state.isConflict ?
                    (
                        <div className="m-5">
                            <ul className="alert alert-danger">
                                <li><h3>Conflict</h3></li>
                            </ul>
                        </div>
                    ):""
                }
                <h1 className="mt-5">SelectedSchedule</h1>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>EDP Code</th>
                      <th>Subject</th>
                      <th>Subject Type</th>
                      <th>Days</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      selectedSchedules.map(data => {
                        return(
                          <tr key={data.edpcode}>
                              <td>{data.edpcode}</td>
                              <td>{data.subject_name}</td>
                              <td>{data.subject_type}</td>
                              <td>{data.days}</td>
                              <td>{data.begin_time} - {data.end_time} {data.mdn}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

                <h1 className="mt-5">Search Subject</h1>
                <table className="table table-striped">
                <thead>
                  <tr>
                    <th>EDP Code</th>
                    <th>Subject</th>
                    <th>Subject Type</th>
                    <th>Days</th>
                    <th>Time</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    {
                      draftSchedules.map(data => {
                        
                        console.log(data);
                        return(
                          <tr key={data.edpcode}>
                              <td>{data.edpcode}</td>
                              <td>{data.subject_name}</td>
                              <td>{data.subject_type}</td>
                              <td>{data.days}</td>
                              <td>{data.begin_time} - {data.end_time} {data.mdn}</td>
                              <td><button onClick={(e) => this.conflictChecker(e, data)}>Add</button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
            </div>
        )
    }
}
