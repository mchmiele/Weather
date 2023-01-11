import { Temperature } from "./temperature";
import { Weather } from "./weather";

export class DailyForecast {
    weather: Weather;
    dt: number;
    temp: Temperature;
}