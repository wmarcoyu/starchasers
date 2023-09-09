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

import MilkyWaySeason from "./milkyWaySeason";
import NewMoonDates from "./newMoonDates";
import Bortle from "./bortle";
import MeteorShower from "./meteorShower";

Chart.register(BarController, CategoryScale, LinearScale, BarElement, Tooltip);

class HistoryTransparencyChart extends React.Component {
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
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      numericalMonths: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
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
      const numOfBars = 12;
      const barWidth = chartElement.offsetWidth / numOfBars;

      this.setState({
        chartHeight: barWidth,
      });
    }
  }

  render() {
    const { fetchedData } = this.props;
    const { months, numericalMonths, chartHeight, translation } = this.state;
    return (
      <div className="row history m-0 justify-content-md-center row-cols-1">
        <div
          className="row history-chart"
          ref={this.chartRef}
          style={{
            height: `${chartHeight}px`,
          }}
        >
          <Bar
            className="col data"
            data={{
              labels: months,
              datasets: [
                {
                  data: numericalMonths.map(
                    (monthIndex) => fetchedData.transparency[monthIndex]
                  ),

                  backgroundColor: numericalMonths.map((monthIndex) =>
                    this.getBackgroundColor(
                      fetchedData.transparency[monthIndex]
                    )
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
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: (context) => {
                      // A string that represents a month. E.g. "1" for Jan.
                      const numericalMonth = numericalMonths[context.dataIndex];
                      let label = "";
                      const transparency =
                        translation[fetchedData.transparency[numericalMonth]];
                      const cloud = fetchedData.cloud[numericalMonth].toFixed(2);
                      const humidity =
                        fetchedData.humidity[numericalMonth].toFixed(2);
                      const aerosol =
                        fetchedData.aerosol[numericalMonth].toFixed(2);
                      label += `Transparency: ${transparency}.\t`;
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

        <div className="col dummy-div-to-correct-padding">
          <div className="row history-auxiliary-info row-cols-4">
            <Bortle bortle={fetchedData.bortle} />

            <MilkyWaySeason
              season={fetchedData.milky_way_season}
              year={fetchedData.year}
            />

            <NewMoonDates
              allDates={fetchedData.new_moon_dates}
              year={fetchedData.year}
            />

            <MeteorShower data={fetchedData.next_meteor_shower} />
          </div>
        </div>
      </div>
    );
  }
}

export default HistoryTransparencyChart;
