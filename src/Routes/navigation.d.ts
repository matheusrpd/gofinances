import { GoFinancesRoutesList } from "./app.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends GoFinancesRoutesList {}
  }
}