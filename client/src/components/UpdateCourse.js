import React, {Component} from 'react';

export default class UpdateCourse extends Component {
    state = {
        courseData: {
            title: "",
            user: {},
            materialsNeeded: ""
        }
    }

    componentDidMount() {
        fetch(`//localhost:5000/api/courses/${this.props.match.params.id}`)
          .then(res => res.json())
          .then(resData => {
            this.setState({
              courseData: resData
            })
        })
    }

    
}