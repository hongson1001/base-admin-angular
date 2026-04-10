import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

interface StatCard {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
}

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCardModule, NzIconModule, NgxEchartsDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly stats: StatCard[] = [
    { title: 'Total Revenue', value: '567,899', change: 14.5, isPositive: true },
    { title: 'Total Sales', value: '$3,465 M', change: 6.8, isPositive: true },
    { title: 'Total Orders', value: '1,130 M', change: -5.24, isPositive: false },
    { title: 'Total Visitors', value: '1,789', change: 0.6, isPositive: true },
  ];

  readonly productSalesOptions: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#f0f0f0',
      textStyle: { color: '#333' },
    },
    legend: {
      top: 0,
      right: 0,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: { color: '#8c8c8c', fontSize: 12 },
      data: ['Gross margin', 'Revenue'],
    },
    grid: {
      left: 40,
      right: 20,
      top: 40,
      bottom: 30,
    },
    xAxis: {
      type: 'category',
      data: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#bfbfbf', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: '#f5f5f5' } },
      axisLabel: { color: '#bfbfbf', fontSize: 12 },
    },
    series: [
      {
        name: 'Gross margin',
        type: 'bar',
        barWidth: 14,
        itemStyle: { color: '#52c41a', borderRadius: [3, 3, 0, 0] },
        data: [30, 45, 35, 50, 40, 60, 80, 55, 45, 65, 50, 70],
      },
      {
        name: 'Revenue',
        type: 'bar',
        barWidth: 14,
        itemStyle: { color: '#ffa940', borderRadius: [3, 3, 0, 0] },
        data: [20, 35, 25, 40, 30, 45, 52, 40, 35, 50, 38, 55],
      },
    ],
  };

  readonly categoryOptions: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 12,
      textStyle: { color: '#8c8c8c', fontSize: 11 },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: 28, name: 'Living room', itemStyle: { color: '#52c41a' } },
          { value: 18, name: 'Office', itemStyle: { color: '#ffa940' } },
          { value: 15, name: 'Bedroom', itemStyle: { color: '#ff7a45' } },
          { value: 12, name: 'Kitchen', itemStyle: { color: '#40a9ff' } },
          { value: 10, name: 'Dining room', itemStyle: { color: '#b37feb' } },
          { value: 9, name: 'Bathroom', itemStyle: { color: '#ff4d4f' } },
          { value: 5, name: 'Lighting', itemStyle: { color: '#36cfc9' } },
          { value: 3, name: 'Outdoor', itemStyle: { color: '#597ef7' } },
        ],
      },
    ],
  };

  readonly countriesOptions: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: '#8c8c8c', fontSize: 12 },
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '80%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        data: [
          { value: 35, name: 'Russia', itemStyle: { color: '#52c41a' } },
          { value: 25, name: 'Poland', itemStyle: { color: '#ffa940' } },
          { value: 22, name: 'China', itemStyle: { color: '#ff7a45' } },
          { value: 18, name: 'Ukraine', itemStyle: { color: '#b37feb' } },
        ],
      },
    ],
  };
}
