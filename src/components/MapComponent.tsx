import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type MapComponentProps = {
  countryCases: any;
};

type CountryCase = {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
};

const MapComponent = (props: MapComponentProps) => {
  const { countryCases } = props;

  // Calculate the total cases for a country
  const getTotalCases = (
    activeCases: number,
    recoveredCases: number,
    deathCases: number
  ) => {
    return activeCases + recoveredCases + deathCases;
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{
        height: "100%",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {countryCases.map((countryCase: CountryCase) => (
        <Marker
          key={countryCase.country}
          position={[countryCase.countryInfo.lat, countryCase.countryInfo.long]}
        >
          <Popup>
            <div>
              <h2>{countryCase.country}</h2>
              <p>
                <strong>Total Cases:</strong>{" "}
                {getTotalCases(
                  countryCase.active,
                  countryCase.recovered,
                  countryCase.deaths
                )}
              </p>
              <p>
                <strong>Active Cases:</strong> {countryCase.active}
              </p>
              <p>
                <strong>Recovered Cases:</strong> {countryCase.recovered}
              </p>
              <p>
                <strong>Deaths:</strong> {countryCase.deaths}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
