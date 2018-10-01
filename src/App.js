import React, { Component } from 'react';
import Header from './Header/header'
import Content from './Content/content'
import './App.css';

class App extends Component {
  render() {
    return (
     <div>
      <Header />
      <Content />
     </div>
    );
  }
}

export default App;
