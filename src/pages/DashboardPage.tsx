import * as React from "react";
import { useEffect, useState } from "react";
import { BenefitsUseCase } from "../domain/BenefitsUseCase";
import { UserdataUseCase } from "../domain/UserdataUseCase";
import { MisionsUseCase } from "../domain/MisionsUseCase";

import {
  ChartData,
  ChartOptions,
} from "../components/dashboard/entity/ChartData";
import {
  VerticalBar,
  Pie,
  Doughnut,
  HorizontalsBar,
} from "../components/dashboard/charts";
import { Userdata } from "../domain/entity/Userdata";
import { Benefit, benefitsDecorator } from "../domain/entity/Benefit";
import rgbaColorsJson from "../components/dashboard/json/rgbaColors.json";
import "../components/dashboard/Dashboard.scss";
import Navbar from "../components/dashboard/Navbar";
import DashboardCards from "../components/dashboard/Cards";
import {
  groupData,
  getCategoryBenefits,
  cleanDuplicatesBenefits,
  getInterest,
} from "../components/dashboard/Data";
import { Mision } from "../domain/entity/Mision";
import { defaults } from "react-chartjs-2";

defaults.global.tooltips.enabled = true;
defaults.global.title.display = true;

const DashboardPage: React.FC = () => {
  const benefitsUseCase = new BenefitsUseCase();
  const useCaseUser = new UserdataUseCase();
  const useCaseMision = new MisionsUseCase();

  const [dataPie, setDataPie] = useState({} as ChartData);
  const [dataDoughnut, setDataDoughnut] = useState({} as ChartData);
  const [dataBarLikes, setDataBarLikes] = useState({} as ChartData);
  const [dataBarLater, setDataBarLater] = useState({} as ChartData);
  const [dataBarNoLikes, setDataBarNoLikes] = useState({} as ChartData);
  const [dataInterest, setDataInterest] = useState({} as ChartData);

  const [totalLikes, setTotalLikes] = useState(0);
  const [totalLater, setTotalLater] = useState(0);
  const [totalNoLikes, setTotalNoLikes] = useState(0);
  const [totalBeneficios, setTotalBeneficios] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalMisiones, setTotalMisiones] = useState(0);

  const backgroundColor = rgbaColorsJson.backgroundColor;
  const borderColor = rgbaColorsJson.borderColor;
  const borderWidth = 1;

  useEffect(() => {
    useCaseUser
      .list()
      .then((response: Response) => response.json())
      .then((data: Userdata[]) => {
        console.log("Userdata", data);

        const { likesAll, latersAll, noLikesAll, interestAll } = groupData(
          data
        );
        setTotalLikes(likesAll.length);
        setTotalLater(latersAll.length);
        setTotalNoLikes(noLikesAll.length);

        bindData(
          benefitsDecorator(likesAll),
          benefitsDecorator(latersAll),
          benefitsDecorator(noLikesAll),
          interestAll
        );
      });
    benefitsUseCase
      .list()
      .then((response: Response) => response.json())
      .then((data: Benefit[]) => {
        console.log("benefits", data);

        const clean = cleanDuplicatesBenefits(data);
        setTotalBeneficios(clean.length);
        setTotalCategories(getCategoryBenefits(clean).length);
      });

    useCaseMision
      .list()
      .then((response: Response) => response.json())
      .then((data: Mision) => {
        console.log("mision", data);
        setTotalMisiones(data.disponibles.length);
      });
  }, []);

  const bindData = (
    likes: Benefit[],
    laters: Benefit[],
    notLikes: Benefit[],
    interestAll: any
  ) => {
    console.log("likes", likes);
    console.log("laters", laters);
    console.log("notLikes", notLikes);
    const categoriesLikes = getCategoryBenefits(likes);
    const categoriesLaters = getCategoryBenefits(laters);
    const categoriesNoLikes = getCategoryBenefits(notLikes);

    const interestGroup = getInterest(interestAll);

    const interest = {
      labels: interestGroup.reduce((out: any, interest: any) => {
        return [...out, interest.name];
      }, []),
      datasets: [
        {
          label: "#interes por categoria",
          data: interestGroup.reduce((out: any, interest: any) => {
            return [...out, interest.cant];
          }, []),
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    };
    const pie = {
      labels: ["like", "later", "no-like"],
      datasets: [
        {
          label: "#like por categoria",
          data: [likes.length, laters.length, notLikes.length],
          backgroundColor: [
            backgroundColor[0],
            backgroundColor[1],
            backgroundColor[2],
          ],
          borderColor,
          borderWidth,
        },
      ],
    };
    const likesBar = {
      labels: categoriesLikes.reduce((out: any, category: any) => {
        return [...out, category.category];
      }, []),
      datasets: [
        {
          label: "# like por categoria",
          data: categoriesLikes.reduce((out: any, category: any) => {
            return [...out, category.cant];
          }, []),
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    };
    const latersBar = {
      labels: categoriesLaters.reduce((out: any, category: any) => {
        return [...out, category.category];
      }, []),
      datasets: [
        {
          label: "# later por categoria",
          data: categoriesLaters.reduce((out: any, category: any) => {
            return [...out, category.cant];
          }, []),
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    };
    const noLikesBar = {
      labels: categoriesNoLikes.reduce((out: any, category: any) => {
        return [...out, category.category];
      }, []),
      datasets: [
        {
          label: "# no-like por categoria",
          data: categoriesNoLikes.reduce((out: any, category: any) => {
            return [...out, category.cant];
          }, []),
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    };
    const dough = {
      labels: ["likes", "laters", "no-likes"],
      datasets: [
        {
          label: "interes",
          data: [likes.length, laters.length, notLikes.length],
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    };
    console.log("likesBar", likesBar);

    setDataPie(pie);
    setDataBarLikes(likesBar);
    setDataBarLater(latersBar);
    setDataBarNoLikes(noLikesBar);
    setDataDoughnut(dough);
    setDataInterest(interest);
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="section">
        <DashboardCards
          data={{
            totalCategories,
            totalBeneficios,
            totalLikes,
            totalLater,
            totalNoLikes,
            totalMisiones,
          }}
        />
        <div className="columns">
          <div className="column is-3">
            <Doughnut
              data={dataDoughnut}
              options={{
                legend: { display: true, position: "top" },
                title: {
                  align: "center",
                  display: true,
                  position: "bottom",
                  text: "interes en beneficio",
                },
              }}
            />
          </div>
          <div className="column is-3">
            <HorizontalsBar
              data={dataDoughnut}
              options={{
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                legend: { display: false },
                title: {
                  align: "center",
                  display: true,
                  position: "bottom",
                  text: "interes en beneficio",
                },
              }}
            />
          </div>
          <div className="column is-3">
            <Doughnut
              data={dataInterest}
              options={{
                legend: { display: true, position: "top" },
                title: {
                  align: "center",
                  display: true,
                  position: "bottom",
                  text: "Onboarding Intereses",
                },
              }}
            />
          </div>
          <div className="column is-3">
            <HorizontalsBar
              data={dataInterest}
              options={{
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                legend: { display: false },
                title: {
                  align: "center",
                  display: true,
                  position: "bottom",
                  text: "Onboarding Intereses",
                },
              }}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            <VerticalBar
              data={dataBarLikes}
              options={{
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                legend: { display: false },
                title: {
                  align: "center",
                  display: true,
                  position: "top",
                  text: "#like por categoría",
                },
              }}
            />
          </div>
          <div className="column">
            <Doughnut
              data={dataBarLikes}
              options={{
                legend: { display: true, position: "bottom" },
                title: {
                  align: "center",
                  display: true,
                  position: "top",
                  text: "#like por categoría ",
                },
              }}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            <Pie
              data={dataBarLater}
              options={{
                legend: { display: true, position: "bottom" },
                title: {
                  align: "center",
                  display: true,
                  position: "top",
                  text: "#later por categoría",
                },
              }}
            />
          </div>
          <div className="column">
            <HorizontalsBar
              data={dataBarLater}
              options={{
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                legend: { display: false },
                title: {
                  align: "center",
                  display: true,
                  position: "top",
                  text: "#later por categoría",
                },
              }}
            />
          </div>
        </div>
        <div className="columns  is-desktop">
          <div className="column is-6">
            <VerticalBar
              data={dataBarNoLikes}
              options={{
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
                legend: { display: false },
                title: {
                  align: "center",
                  display: true,
                  position: "top",
                  text: "#no-like por categoría",
                },
              }}
            />
          </div>
          <div className="column">
            <Doughnut
              data={dataBarNoLikes}
              options={{
                legend: { display: true, position: "bottom" },
                title: {
                  align: "center",
                  display: true,
                  position: "top",
                  text: "#no-like por categoría",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
