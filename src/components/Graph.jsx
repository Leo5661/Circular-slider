import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Chart as ChartJs, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { circleXY, convertPiAngle, isPointerOnKnob } from "../Utils/Utils.js";

ChartJs.register(ArcElement, Tooltip);

function Graph({ data }) {
  const [formData, setFormData] = useState({});
  const canvasRef = useRef(null);

  //graph value's
  const [referralEarningPer, setReferralEarningPer] = useState("10");
  const [dalalEarningPer, setDalalEarningPer] = useState("49");
  const [miscFeesEarningPer, setMiscFeesEarningPer] = useState("9");
  const [traderEarningPer, setTraderEarningPer] = useState("32");

  const [referralEarning, setReferralEarning] = useState("");
  const [dalalEarning, setDalalEarning] = useState("");
  const [miscFeesEarning, setMiscFeesEarning] = useState("");
  const [traderEarning, setTraderEarning] = useState("");

  useEffect(() => {
    if (data) {
      setFormData(data);
      setDataInGraph();
    }
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
    }
  }, []);

  const setDataInGraph = () => {
    // setReferralEarningPer(formData.referralPer);

    const dalalEarningVal =
      Number(formData.grossEarnings) * Number(dalalEarningPer / 100);
    const miscFeesEarningVal =
      Number(formData.grossEarnings) * Number(miscFeesEarningPer / 100);
    const traderEarningVal =
      Number(formData.grossEarnings) * Number(traderEarningPer / 100);
    const referralEarningVal =
      Number(formData.grossEarnings) * Number(referralEarningPer / 100);

    setDalalEarning(dalalEarningVal);
    setMiscFeesEarning(miscFeesEarningVal);
    setTraderEarning(traderEarningVal);
    setReferralEarning(referralEarningVal);
  };

  const chartData = {
    labels: [
      `Dalal Earning ${dalalEarning}`,
      `Misc Fess ${miscFeesEarning}`,
      `Trader Earning ${traderEarning}`,
      `Referral Earning ${referralEarning}`,
    ],
    datasets: [
      {
        label: "Chart",
        data: [
          dalalEarningPer,
          miscFeesEarningPer,
          traderEarningPer,
          referralEarningPer,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(233, 154, 51, 1)",
          "rgba(122, 122, 122, 1)",
          "rgba(245, 242, 53, 1)",
        ],
        borderColor: ["#ffffff"],
        borderWidth: 2,
        cutout: "85%",
        padding: "20px",
      },
    ],
  };

  const graphLabels = {
    id: "graphLabels",

    afterDraw: (chart, args, options) => {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();

      let sliderRadius,
        slider1XY,
        slider2XY,
        knobRadius,
        knob1X,
        knob1Y,
        knob2X,
        knob2Y;

      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((arc, j) => {
          if (j === 1) {
            sliderRadius =
              arc.innerRadius + (arc.outerRadius - arc.innerRadius) / 2;

            knobRadius = (arc.outerRadius - arc.innerRadius) / 2 - 10;

            slider1XY = circleXY(sliderRadius, convertPiAngle(arc.startAngle));
            slider2XY = circleXY(sliderRadius, convertPiAngle(arc.endAngle));
          }
        });
      });

      // first slider knob
      knob1X = left + width / 2 + slider1XY.x;
      knob1Y = top + height / 2 - slider1XY.y;
      ctx.beginPath();
      ctx.arc(knob1X, knob1Y, knobRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      // second slider knob
      knob2X = left + width / 2 + slider2XY.x;
      knob2Y = top + height / 2 - slider2XY.y;
      ctx.beginPath();
      ctx.arc(knob2X, knob2Y, knobRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    },

    afterEvent: (chart, args) => {
      const {
        ctx,
        canvas,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();
      let sliderRadius,
        slider1XY,
        slider2XY,
        knobRadius,
        knob1X,
        knob1Y,
        knob2X,
        knob2Y;

      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((arc, j) => {
          if (j === 1) {
            sliderRadius =
              arc.innerRadius + (arc.outerRadius - arc.innerRadius) / 2;

            knobRadius = (arc.outerRadius - arc.innerRadius) / 2 - 10;

            slider1XY = circleXY(sliderRadius, convertPiAngle(arc.startAngle));
            slider2XY = circleXY(sliderRadius, convertPiAngle(arc.endAngle));
          }
        });
      });

      // for first slider
      knob1X = left + width / 2 + slider1XY.x;
      knob1Y = top + height / 2 - slider1XY.y;

      // for second slider
      knob2X = left + width / 2 + slider2XY.x;
      knob2Y = top + height / 2 - slider2XY.y;

      canvas.addEventListener("pointermove", () => {
        const x = args.event.x;
        const y = args.event.y;

        if (isPointerOnKnob(x, y, knob1X, knob1Y, knobRadius)) {
          canvas.style.cursor = "pointer";
        } else if (isPointerOnKnob(x, y, knob2X, knob2Y, knobRadius)) {
          canvas.style.cursor = "pointer";
        } else {
          canvas.style.cursor = "default";
        }
      });
    },
  };

  const options = {
    padding: "0",
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 10,
    },
    legend: {
      display: false,
    },
  };

  function handelClick(chart) {
    const {
      ctx,
      canvas,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;

    console.log(canvas);

    let sliderRadius,
      slider1XY,
      slider2XY,
      knobRadius,
      knob1X,
      knob1Y,
      knob2X,
      knob2Y;

    chart.data.datasets.forEach((dataset, i) => {
      chart.getDatasetMeta(i).data.forEach((arc, j) => {
        if (j === 1) {
          sliderRadius =
            arc.innerRadius + (arc.outerRadius - arc.innerRadius) / 2;

          knobRadius = (arc.outerRadius - arc.innerRadius) / 2 - 10;

          slider1XY = circleXY(sliderRadius, convertPiAngle(arc.startAngle));
          slider2XY = circleXY(sliderRadius, convertPiAngle(arc.endAngle));
        }
      });
    });

    // for first slider
    knob1X = left + width / 2 + slider1XY.x;
    knob1Y = top + height / 2 - slider1XY.y;

    // for second slider
    knob2X = left + width / 2 + slider2XY.x;
    knob2Y = top + height / 2 - slider2XY.y;

    let isClicked = false;
    canvas.addEventListener("pointerdown", () => (isClicked = true));
    canvas.addEventListener("pointerup", () => (isClicked = false));

    canvas.addEventListener("pointermove", (event) => {
      if (isClicked) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const delY = top + height / 2 - y;
        const delX = left + width / 2 - x;

        const theta = Math.atan2(-delX, delY);

        let deg = Math.round(theta * (180 / Math.PI));

        if (deg < 0) {
          deg = deg + 360;
        }

        if (isPointerOnKnob(x, y, knob1X, knob1Y, knobRadius)) {
          const rad = deg * (Math.PI / 180);

          chart.data.datasets.forEach((dataset, i) => {
            const percentVal = Math.round((deg / 360) * 100);
            setDalalEarningPer(`${percentVal}`);
          });
        } else if (isPointerOnKnob(x, y, knob1X, knob1Y, knobRadius)) {
          const rad = deg * (Math.PI / 180);

          chart.data.datasets.forEach((dataset, i) => {
            const percentVal = Math.round((deg / 360) * 100);
            miscFeesEarningPer(`${percentVal}`);
          });
        }
      }
    });
  }

  return (
    <GraphComponent>
      <div className="graph">
        <Doughnut
          ref={canvasRef}
          data={chartData}
          options={options}
          plugins={[graphLabels]}
          onClick={(e) => {
            if (canvasRef.current) {
              const chart = canvasRef.current;
              handelClick(chart);
            }
          }}
        />
      </div>
      <div className="slider"></div>
      <div className="info"></div>
    </GraphComponent>
  );
}

const GraphComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
  border-radius: 1rem;
  .graph {
    position: absolute;
    width: 50%;
    height: 50%;
  }
`;

export default Graph;
