import * as React from "react";
import { useEffect, useState } from "react";
import { UserdataUseCase } from "../domain/UserdataUseCase";
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
import Navbar from "../components/dashboard/Navbar";
const DashboardPage: React.FC = () => {
  const useCase = new UserdataUseCase();
  const [dataPie, setDataPie] = useState({} as ChartData);
  const [dataDoughnut, setDataDoughnut] = useState({} as ChartData);
  const [dataBarLikes, setDataBarLikes] = useState({} as ChartData);
  const [dataBarLater, setDataBarLater] = useState({} as ChartData);
  const [dataBarNoLikes, setDataBarNoLikes] = useState({} as ChartData);
  const [options, setOptions] = useState({} as ChartOptions);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalCategoriesLikes, setTotalCategoriesLikes] = useState(0);
  const [totalCategoriesNoLikes, setTotalCategoriesNoLikes] = useState(0);
  const [totalCategoriesLater, setTotalCategoriesLater] = useState(0);
  const backgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];
  const borderColor = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];
  const borderWidth = 1;

  useEffect(() => {
    useCase
      .list()
      .then((response: Response) => response.json())
      .then((data: Userdata[]) => {
        const { likesAll, latersAll, noLikesAll } = groupData(data);
        setTotalLikes(likesAll.length);
        bindData(
          benefitsDecorator(likesAll),
          benefitsDecorator(latersAll),
          benefitsDecorator(noLikesAll)
        );
      });
  }, []);
  const cleanDuplicates = (benefits: Benefit[]) => {
    const cleans = benefits.reduce((out: Benefit[] = [], benefit: Benefit) => {
      if (out.length > 0) {
        const exists = out.filter((b) => b.id === benefit.id);
        if (exists.length > 0) return out;
        else return [...out, { ...benefit }];
      } else return [...out, { ...benefit }];
    }, []);
    return cleans;
  };
  const groupData = (userData: Userdata[]) => {
    const likesAll = userData.reduce((out: Benefit[], user: Userdata) => {
      return [...out, ...cleanDuplicates(user.likes)];
    }, []);
    const latersAll = userData.reduce((out: Benefit[], user: Userdata) => {
      return [...out, ...cleanDuplicates(user.later)];
    }, []);
    const noLikesAll = userData.reduce((out: Benefit[], user: Userdata) => {
      return [...out, ...cleanDuplicates(user["not-likes"])];
    }, []);
    return { likesAll, latersAll, noLikesAll };
  };
  const getCategoria = (objInteres: Benefit[]) => {
    return objInteres.reduce((out: any, obj: Benefit) => {
      const result = out.filter((o: any) => o.category === obj.category);
      if (result.length === 0) {
        const cantCategory = objInteres.filter(
          (l: any) => l.category === obj.category
        ).length;
        return [
          ...out,
          {
            category: obj.category,
            cant: cantCategory > 0 ? cantCategory : 0,
          },
        ];
      }
      return out;
    }, []);
  };
  const bindData = (
    likes: Benefit[],
    laters: Benefit[],
    notLikes: Benefit[]
  ) => {
    const categoriesLikes = getCategoria(likes);
    const categoriesLaters = getCategoria(laters);
    const categoriesNoLikes = getCategoria(notLikes);

    setTotalCategoriesLikes(categoriesLikes.length);
    setTotalCategoriesLater(categoriesLaters.length);
    setTotalCategoriesNoLikes(categoriesNoLikes.length);

    setDataPie({
      labels: ["Likes", "Laters", "Not-Likes"],
      datasets: [
        {
          label: "# likes por categoria",
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
    });
    setDataBarLikes({
      labels: categoriesLikes.reduce((out: any, category: any) => {
        return [...out, category.category];
      }, []),
      datasets: [
        {
          label: "# likes por categoria",
          data: categoriesLikes.reduce((out: any, category: any) => {
            return [...out, category.cant];
          }, []),
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    });
    setDataBarLater({
      labels: categoriesLaters.reduce((out: any, category: any) => {
        return [...out, category.category];
      }, []),
      datasets: [
        {
          label: "# laters por categoria",
          data: categoriesLaters.reduce((out: any, category: any) => {
            return [...out, category.cant];
          }, []),
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    });

    console.log("categoriesNoLikes", categoriesLaters);

    setDataBarNoLikes({
      labels: categoriesNoLikes.reduce((out: any, category: any) => {
        return [...out, category.category];
      }, []),
      datasets: [
        {
          label: "# no-likes por categoria",
          data: categoriesNoLikes.reduce((out: any, category: any) => {
            return [...out, category.cant];
          }, []),
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    });
    setDataDoughnut({
      labels: ["Likes", "Laters", "Not-Likes"],
      datasets: [
        {
          label: "interes",
          data: [likes.length, laters.length, notLikes.length],
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    });
    setOptions({
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "rgb(255, 99, 132)",
          },
        },
      },
    });
  };
  return (
    <div>
      <Navbar />
      <div className="section">
        <div className="columns  is-variable is-desktop">
          <div className="column">
            <div className="card has-background-primary has-text-white">
              <div className="card-header">
                <div className="card-header-title has-text-white">
                  # Beneficios
                </div>
              </div>
              <div className="card-content">
                <p className="is-size-3">{0} - disponibles</p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card has-background-warning has-text-black">
              <div className="card-header">
                <div className="card-header-title has-text-white">
                  # Categorias likes
                </div>
              </div>
              <div className="card-content">
                <p className="is-size-3">
                  {totalCategoriesLikes} - disponibles
                </p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card has-background-info has-text-white">
              <div className="card-header">
                <div className="card-header-title has-text-white">
                  % Interes
                </div>
              </div>
              <div className="card-content">
                <p className="is-size-3">78 %</p>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card has-background-danger has-text-white">
              <div className="card-header">
                <div className="card-header-title has-text-white">
                  # Total likes
                </div>
              </div>
              <div className="card-content">
                <p className="is-size-3">{totalLikes}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="columns  is-variable is-desktop">
          <div className="column is-3">
            <Doughnut data={dataDoughnut} />
          </div>
          <div className="column is-3">
            <Doughnut data={dataDoughnut} />
          </div>
          <div className="column is-3">
            <Doughnut data={dataDoughnut} />
          </div>
          <div className="column is-3">
            <Doughnut data={dataDoughnut} />
          </div>
        </div>

        <div className="columns is-variable is-desktop">
          <div className="column is-6">
            <VerticalBar data={dataBarLikes} options={options} />
          </div>
          <div className="column">
            <Doughnut data={dataBarLikes} />
          </div>
        </div>
        <div className="columns is-variable is-desktop">
          <div className="column is-6">
            <HorizontalsBar data={dataBarLater} options={options} />
          </div>
          <div className="column">
            <Pie data={dataBarLater} />
          </div>
        </div>
        <div className="columns is-variable is-desktop">
          <div className="column is-6">
            <VerticalBar data={dataBarNoLikes} options={options} />
          </div>
          <div className="column">
            <Doughnut data={dataBarNoLikes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
