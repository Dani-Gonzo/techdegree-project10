import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    courseTitles: []
  }

  componentDidMount() {
    fetch('//localhost:5000/api/courses')
      .then(res => res.json())
      .then(resData => {
        this.setState({
          courseTitles: resData.map(course => course.title)
        })
      })
  }

  render() {
    const titles = this.state.courseTitles.map(title => {
      return (
        <li>{title}</li>
      );
    });

    return (
      <div>
        <ul>
          {titles}
        </ul>
      </div>
    );
  }
}

export default App;
