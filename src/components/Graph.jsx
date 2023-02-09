import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Chart as ChartJs, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CircularSlider from "@fseehawer/react-circular-slider";
import useMousePosition from "./useMousePosition";

ChartJs.register(ArcElement, Tooltip);

function Graph({ data }) {
  const [formData, setFormData] = useState({});
  const canvasRef = useRef(null);
  const [cord, setCord] = useMousePosition(true);
  //graph value's
  const [referralEarningPer, setReferralEarningPer] = useState("10");
  const [dalalEarningPer, setDalalEarningPer] = useState("49");
  const [miscFeesEarningPer, setMiscFeesEarningPer] = useState("9");
  const [traderEarningPer, setTraderEarningPer] = useState("32");

  const [referralEarning, setReferralEarning] = useState("");
  const [dalalEarning, setDalalEarning] = useState("");
  const [miscFeesEarning, setMiscFeesEarning] = useState("");
  const [traderEarning, setTraderEarning] = useState("");

  let sliderRadius, slider1XY, slider2XY;

  useEffect(() => {
    if (data) {
      setFormData(data);
      setDataInGraph();
    }
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      console.log("CanvasRenderingContext2D", canvas.ctx);
      console.log("HTMLCanvasElement", canvas.canvas);
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

  function circleXY(r, theta) {
    // Convert angle to radians
    theta = (theta * Math.PI) / 180;

    return { x: r * Math.cos(theta), y: -r * Math.sin(theta) };
  }

  function convertPiAngle(angle) {
    const deg = (angle * 180) / Math.PI;
    return deg;
  }

  const graphLabels = {
    id: "graphLabels",
    afterDraw: (chart, args, options) => {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();
      let knobRadius;

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
      ctx.beginPath();
      const knob1X = left + width / 2 + slider1XY.x;
      const knob1Y = top + height / 2 - slider1XY.y;
      ctx.arc(knob1X, knob1Y, knobRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.fill();
      ctx.stroke();

      // second slider knob
      ctx.beginPath();
      const knob2X = left + width / 2 + slider2XY.x;
      const knob2Y = top + height / 2 - slider2XY.y;
      ctx.arc(knob2X, knob2Y, knobRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.fill();
      ctx.stroke();
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

  return (
    <GraphComponent>
      <div className="graph">
        <Doughnut
          ref={canvasRef}
          data={chartData}
          options={options}
          plugins={[graphLabels]}
          onClick={(e) => {
            setCord(e);
            if (canvasRef.current) {
              console.log(cord.x, cord.y);
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
