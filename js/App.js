import React, { Component } from 'react';
import load from './utils/load'
import Button from './components/Button';
import UserList from './components/UserList';
import ActiveUser from './components/ActiveUser';
import SearchBar from './components/SearchBar';
import Toolbar from './components/Toolbar';



// render(<App data='data.json' />, document.getElementById('app'));
export default class App extends Component {
  constructor(props) {
    super(props);
    //Устанавливаем состояние
    this.state = {
      data: null,
      active: 0,
      term: ''
    };
    // сразу загружаем данные
    this.loadData();
  }

  loadData() {
    //Загружаем данные из файла, переданного в качестве параметра
    load(this.props.data).then(users => {
      //После загрузки обновляем состояние
      this.initialData = JSON.parse(users);
      this.setState({
        data: this.initialData
      });
    });
  }

  updateData(config) {
    this.setState(config);
  }

  render() {
    return (
      <div className="app container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <SearchBar
              term={this.state.term}
              data={this.state.data}
              update={this.updateData.bind(this)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <Toolbar
              initialData={this.initialData}
              data={this.state.data}
              update={this.updateData.bind(this)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4 col-md-3 col-lg-2">
            <ActiveUser data={this.state.data} active={this.state.active} />
          </div>
          <div className="col-sm-8 col-md-9 col-lg-10">
            <UserList data={this.state.data} update={this.updateData.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
