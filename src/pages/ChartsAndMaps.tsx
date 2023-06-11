import CircularProgress from "@mui/material/CircularProgress";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import {
  fetchCountryCases,
  fetchGlobalCases,
  fetchHistoricalCases,
} from "../api/api";
import MapComponent from "../components/MapComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Coronavirus Cases",
    },
  },
};

const ChartsAndMaps = () => {
  const { data: countryCases, isLoading: fetchingCountryData } = useQuery({
    queryKey: ["countryCases"],
    queryFn: fetchCountryCases,
  });

  const { data: globalCases, isLoading: fetchingGlobalData } = useQuery({
    queryKey: ["globalCases"],
    queryFn: fetchGlobalCases,
  });

  const { data: historicalCases, isLoading: fetchingHistoricData } = useQuery({
    queryKey: ["historicalCases"],
    queryFn: fetchHistoricalCases,
  });

  // historicalCasesFluctuations
  let historicalCasesFluctuations: any = {};
  if (!fetchingHistoricData) {
    historicalCasesFluctuations = {
      labels: Object.keys(historicalCases?.cases),
      datasets: [
        {
          label: "Cases",
          data: Object.values(historicalCases?.cases),
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
        {
          label: "Recovered",
          data: Object.values(historicalCases?.recovered),
          backgroundColor: "rgb(53, 162, 235)",
          borderColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Deaths",
          data: Object.values(historicalCases?.deaths),
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };
  }

  let countryCasesFluctuation: any = {};
  if (!fetchingCountryData) {
    countryCasesFluctuation = {
      labels: countryCases?.map((country: any) => country.country),
      datasets: [
        {
          label: "Cases",
          data: countryCases?.map((country: any) => country.cases),
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    };
  }

  let globalCasesFluctuation: any = {};
  if (!fetchingGlobalData) {
    globalCasesFluctuation = {
      labels: ["Cases", "Recovered", "Deaths", "Active"],
      datasets: [
        {
          label: "Cases",
          data: [
            globalCases?.cases,
            globalCases?.recovered,
            globalCases?.deaths,
            globalCases?.active,
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(53, 162, 235)",
            "rgb(75, 192, 192)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
  }

  if (fetchingCountryData || fetchingGlobalData || fetchingHistoricData) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mt-16 flex flex-col items-center w-full h-auto overflow-auto gap-5">
      <div className="flex flex-col lg:flex-row lg:w-full justify-center gap-5 mt-5">
        {/* Historic cases fluctuation */}
        {!fetchingHistoricData && (
          <div className="w-full lg:w-1/2 bg-gray-950 rounded-lg flex justify-center flex-col items-center p-5">
            <h2 className="text-xl text-white font-bold mb-4 px-4 py-2">
              Historic Covid Cases Fluctuation
            </h2>
            <Line
              data={historicalCasesFluctuations}
              options={options}
              className="bg-white"
              style={{ width: "100%", height: "400px" }}
            />
          </div>
        )}

        {/* Pie chart showing global cases deaths active population */}
        {!fetchingGlobalData && (
          <div className="w-full lg:w-1/2 bg-gray-950 rounded-lg flex justify-center flex-col items-center p-5">
            <h2 className="text-xl font-bold mb-4">Global Covid Cases</h2>
            <div className="h-96">
              <Pie data={globalCasesFluctuation} options={options} />
            </div>
          </div>
        )}
      </div>

      {/* Bar chart showing country cases */}
      {!fetchingCountryData && (
        <div className="w-full lg:w-4/5 rounded-lg flex justify-center flex-col items-center p-5">
          <h2 className="text-xl font-bold mb-4">Country Covid Cases</h2>
          <Bar
            data={countryCasesFluctuation}
            options={options}
            className="bg-white rounded-lg p-4"
            style={{ width: "100%", height: "600px" }}
          />
        </div>
      )}

      {/* map component */}
      {countryCases && countryCases.length > 0 ? (
        <div className="w-full lg:w-4/5 rounded-lg flex flex-col items-center p-5 bg-white mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Map</h2>
          <div className="w-full h-96 lg:h-96 relative">
            <MapComponent countryCases={countryCases} />
          </div>
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-xl font-bold mb-4 text-black">Map</h2>
            <p className="text-red-500">No data available</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ChartsAndMaps;
