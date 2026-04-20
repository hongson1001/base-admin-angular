import { Routes } from '@angular/router';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard').then((m) => m.Dashboard),
    providers: [provideEchartsCore({ echarts })],
  },
];

export default routes;
