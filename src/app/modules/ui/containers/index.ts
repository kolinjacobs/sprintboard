import {ReportsContainerComponent} from "./reports-container/reports-container.component";
import {BacklogContainerComponent} from "./backlog-container/backlog-container.component";
import {DashboardContainerComponent} from "./dashboard-container/dashboard-container.component";

export const containers: any[] = [
  BacklogContainerComponent,
  DashboardContainerComponent,
  ReportsContainerComponent
];

export * from "./reports-container/reports-container.component";
export * from "./backlog-container/backlog-container.component";
export * from "./dashboard-container/dashboard-container.component";
