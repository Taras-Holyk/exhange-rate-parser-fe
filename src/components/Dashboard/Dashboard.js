import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import ApiService from './../../services/Api';
import './Dashboard.scss';
import 'react-datepicker/dist/react-datepicker.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeRates: null,
      selectedDate: new Date(),
      maxDate: new Date()
    }
  }

  fetchData = async () => {
    const { data } = await ApiService.get(`exchange-rates?date=${this.state.selectedDate}`);
    this.setState({
      exchangeRates: data
    });
  };

  exportPdf = async () => {
    const {data: {filename}} = await ApiService.get('exchange-rates/export/pdf');
    window.open(filename);
  };

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date
    });
  };

  render() {
    if (!this.state.exchangeRates) {
      return (
        <div>
          <DatePicker
            selected={this.state.selectedDate}
            onChange={this.handleDateChange}
            maxDate={this.state.maxDate}
          />
          <a href='javascript:;' onClick={this.fetchData}>Fetch data</a>
        </div>
      )
    }

    return (
      <div>
        <table>
          <thead>
          <tr>
            <th>Курс до гривні</th>
            <th>
              Готівковий ринок<br/>
              <small>Купівля / Продаж</small>
            </th>
            <th>НБУ</th>
            <th>
              Чорний ринок<br/>
              <small>Купівля / Продаж</small>
            </th>
          </tr>
          </thead>
          <tbody>
              <tr>
                <td>Долар</td>
                <td>{this.state.exchangeRates.usd.cash.purchase} / {this.state.exchangeRates.usd.cash.selling}</td>
                <td>{this.state.exchangeRates.usd.nbu}</td>
                <td>{this.state.exchangeRates.usd.black.purchase} / {this.state.exchangeRates.usd.black.selling}</td>
              </tr>
              <tr>
                <td>Євро</td>
                <td>{this.state.exchangeRates.eur.cash.purchase} / {this.state.exchangeRates.eur.cash.selling}</td>
                <td>{this.state.exchangeRates.eur.nbu}</td>
                <td>{this.state.exchangeRates.eur.black.purchase} / {this.state.exchangeRates.eur.black.selling}</td>
              </tr>
              <tr>
                <td>Рубль</td>
                <td>{this.state.exchangeRates.rub.cash.purchase} / {this.state.exchangeRates.rub.cash.selling}</td>
                <td>{this.state.exchangeRates.rub.nbu}</td>
                <td>{this.state.exchangeRates.rub.black.purchase} / {this.state.exchangeRates.rub.black.selling}</td>
              </tr>
              <tr>
                <td>Польський злотий</td>
                <td>{this.state.exchangeRates.pln.cash.purchase} / {this.state.exchangeRates.pln.cash.selling}</td>
                <td>{this.state.exchangeRates.pln.nbu}</td>
                <td>{this.state.exchangeRates.pln.black.purchase} / {this.state.exchangeRates.pln.black.selling}</td>
              </tr>
              <tr>
                <td>Англійський фунт стерлінгів</td>
                <td>{this.state.exchangeRates.gbp.cash.purchase} / {this.state.exchangeRates.gbp.cash.selling}</td>
                <td>{this.state.exchangeRates.gbp.nbu}</td>
                <td>{this.state.exchangeRates.gbp.black.purchase} / {this.state.exchangeRates.gbp.black.selling}</td>
              </tr>
              <tr>
                <td>Швейцарський франк</td>
                <td>{this.state.exchangeRates.chf.cash.purchase} / {this.state.exchangeRates.chf.cash.selling}</td>
                <td>{this.state.exchangeRates.chf.nbu}</td>
                <td>{this.state.exchangeRates.chf.black.purchase || '-'} / {this.state.exchangeRates.chf.black.selling}</td>
              </tr>
          </tbody>
        </table>
        <DatePicker
          selected={this.state.selectedDate}
          onChange={this.handleDateChange}
          maxDate={this.state.maxDate}
        />
        <a href='javascript:;' onClick={this.fetchData}>Update data</a>
        <div>
          <a href='javascript:;'>Export to csv</a>
          <a href='javascript:;' onClick={this.exportPdf}>Export to pdf</a>
        </div>
      </div>
    );
  }
}

export default Dashboard;
