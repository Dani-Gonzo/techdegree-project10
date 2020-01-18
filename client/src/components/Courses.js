import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// Fetch data for all courses and render cards and links for each, displaying the course title on the cards
export default class Courses extends Component {
    state = {
        // Render requires initialization
        courseData: []
      }

    componentDidMount() {
        // Call courses api to find all the courses that currently exist
        fetch('//localhost:5000/api/courses')
            .then(res => {
                // TODO: What you doing here?
                if (res.status === 500) {
                    this.props.history.push('/error');
                } else {
                    return res.json();
                }
            })
          .then(resData => {
                // Set course data into state
                this.setState({
                    courseData: resData
                })
            }
        )
    }

    render() {
        // Go through each course in courseData array and create a display Link for it
        const titles = this.state.courseData.map(course => {
            return (
                <div className="grid-33"><Link className="course--module course--link" to={`/courses/${course.id}`}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                </Link></div>
            )
        });

        return (
            <div className="bounds">
                {titles}
                <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </Link></div>
            </div>
        )
    }
}