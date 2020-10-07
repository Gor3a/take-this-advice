import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = { advice: "", background: "" };

  unsplashApiKey = "IYCSKRctkAM_tR2J-6kQsutrYlelI2i0fl3Mfalavks";

  unsplashRandomCity = `https://api.unsplash.com/photos/random?query=city&client_id=${this.unsplashApiKey}`;

  appRef = React.createRef(null);

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios.get("https://api.adviceslip.com/advice").then((res) => {
      const { advice } = res.data.slip;
      this.setState({ advice });
    });
    axios
      .get(this.unsplashRandomCity)
      .then((res) => {
        let background = res.data.urls.regular;
        this.setState({ background });
      })
      .catch((err) => {
        let background = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(https://cdn.cnn.com/cnnnext/dam/assets/190910120101-04-shopping-cities-photos.jpg)`;
        this.setState({ background });
      });
  };

  render() {
    return (
      <div
        className="app"
        ref={this.appRef}
        style={{ background: this.state.background }}
      >
        <div className="card">
          <h1 className="heading">{this.state.advice}</h1>
          <button className="button" onClick={() => this.fetchAdvice()}>
            <span>Give me Advice</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
