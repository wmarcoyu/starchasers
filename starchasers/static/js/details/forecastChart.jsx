/* eslint-disable react/prop-types  */
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
  Tooltip,
} from "chart.js";

import { DarkHours, MoonPhase, Score } from "./nightInfo";
import MilkyWay from "./milkyWayActivity";

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

class ForecastTransparencyChart extends React.Component {
  // props: fetchedData
  constructor(props) {
    super(props);

    this.state = {
      chartHeight: 0,
      colors: [
        "rgb(173, 207, 242)", // Poor
        "rgb(105, 175, 246)", // Below Average
        "rgb(19, 131, 247)", // Average
        "rgb(0, 70, 255)", // Good
        "rgb(0, 0, 160)", // Excellent
      ],
      hours: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      translation: {
        1: "Poor",
        2: "Below average",
        3: "Average",
        4: "Good",
        5: "Excellent",
      },
    };

    this.chartRef = React.createRef();
    this.updateSize = this.updateSize.bind(this);
    this.getBackgroundColor = this.getBackgroundColor.bind(this);
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize);
  }

  getBackgroundColor(transparency) {
    // `transparency` is on a scale of 1 to 5. `colors` array is 0-indexed.
    const { colors } = this.state;
    const intValue = Math.round(transparency);
    const index = intValue - 1;
    return colors[index];
  }

  updateSize() {
    const chartElement = this.chartRef.current;
    if (chartElement) {
      /* const numOfBars = this.state.data.labels.length; */
      const numOfBars = 24;
      const barWidth = chartElement.offsetWidth / numOfBars;

      this.setState({
        chartHeight: barWidth,
      });
    }
  }

  render() {
    const { fetchedData } = this.props;
    const { hours, translation, chartHeight } = this.state;

    return (
      <div className="row forecast m-0">
        {Object.entries(fetchedData.data).map(([date, dayObject]) => (
          // dayObject is a JSON object with `hours` being keys and
          // JSON objects as values, where each object contains
          // `transparency`, `cloud`, `humidity`, and `aerosol` data.
          // 0 4 1
          <div
            className="row daily-forecast m-0 mb-4 mt-1"
            ref={this.chartRef}
            style={{
              height: `${chartHeight}px`,
            }}
            key={`${date}`}
          >
            <div className="col date">{date}</div>

            <Bar
              className="col data"
              data={{
                labels: hours,
                datasets: [
                  {
                    data: hours.map((hour) =>
                      hour in dayObject ? dayObject[hour].transparency : null
                    ),

                    backgroundColor: hours.map((hour) =>
                      hour in dayObject
                        ? this.getBackgroundColor(dayObject[hour].transparency)
                        : null
                    ),

                    barPercentage: 1,
                    categoryPercentage: 1,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                title: { display: false },
                legend: { display: false },
                plugins: {
                  // Show information when cursor is hovering over bars.
                  tooltip: {
                    enabled: true,
                    callbacks: {
                      label: (context) => {
                        const dayData = hours.map((hour) => dayObject[hour]);
                        const hourData = dayData[context.dataIndex];
                        // Shorten variable name a bit. `tsprcy` means
                        // `transparency`, obviously.
                        const trsprcy = translation[hourData.transparency];
                        // Round to 2 decimal places.
                        const cloud = hourData.cloud.toFixed(2);
                        const humidity = hourData.humidity.toFixed(2);
                        const aerosol = hourData.aerosol.toFixed(2);
                        let label = "";
                        label += `Transparency: ${trsprcy}.\t`;

                        label += `Cloud cover: ${cloud}%.\t`;
                        label += `Relative humidity: ${humidity}%.\t`;
                        label += `Aerosol optical depth: ${aerosol}.`;
                        return label;
                      },
                    },
                  },
                },

                scales: {
                  y: {
                    type: "linear",
                    beginAtZero: true,
                    max: 1,
                    display: false,
                    grid: {
                      display: false,
                    },
                  },
                  x: {
                    type: "category",
                    position: "top",
                    display: true,
                    grid: {
                      display: false,
                    },
                  },
                },
                elements: {
                  bar: {
                    borderWidth: 0, // Remove border around bars if any
                  },
                },
                layout: {
                  padding: 0, // Remove padding around canvas
                },
              }}
            />
          </div>
        ))}

        <div className="col dummy-div-to-correct-padding">
          <div className="row forecast-auxiliary-info row-cols-4">
            <DarkHours darkHours={fetchedData.dark_hours} />
            <MoonPhase moonPhase={fetchedData.moon_activity} />
            <MilkyWay milkyWayData={fetchedData.milky_way} />
            <Score score={fetchedData.score} />
          </div>
        </div>
      </div>
    );
  }
}

export default ForecastTransparencyChart;
