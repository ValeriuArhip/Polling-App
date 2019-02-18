import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/charts/charts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(BaseChartDirective) private _chart: BaseChartDirective;


  title = 'pollingApp';
  options = []; //to store options
  question = ''; //to store question
  optionsCount = 0; //to store count
  option = ''; //for current option binding

  votes: number[] = []; //to save votes
  vote_id: number = 0; // self explanatory

  //All related to charts
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  //set various chart options. yAxes defines how it should mean between axis,
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          steps : 1,
          stepValue : 1,
          max : 10,
      }]
  }
  };
  public barChartLabels: any[] = [];
  public barChartData: Array<{data: number[], backgroundColor: string, label: string}> = [];

  //colors to use for charts
  public COLORS_TO_CHOOSE_FROM: Array<string> = [
    'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Orange', 'Purple', 'Black', 'Grey', 'Brown'
  ]
  onAdd() {
    if (this.optionsCount === 10) {
      return;
    }
    this.optionsCount++;
    const tempOpt = this.option;
    this.options.push(tempOpt);
    this.option = '';
    this.barChartLabels.push(tempOpt);
    console.log(this.barChartLabels);
    this.votes.push(0);
    this.barChartData.push({data: [],backgroundColor: this.COLORS_TO_CHOOSE_FROM[this.optionsCount-1], label: tempOpt});
    if (this._chart) {
    this._chart.chart.config.data.labels = this.barChartLabels;
    this._chart.chart.config.data.datasets = this.barChartData;
    this._chart.chart.update();
    }
    console.log(this.barChartData);
  }
  saveQuestion(q) {
    this.question = q;
  }
  onDelete(id){
    const ops = [];
    for(let i = 0; i < this.options.length; i++) {
      if (i!=id) {
        ops.push(this.options[i]);
      }
    }
    this.options = ops;
    this.optionsCount--;
    this.barChartData.splice(id,1);
    this.barChartLabels.splice(id,1);
    if (this._chart) {
      this._chart.chart.config.data.labels = this.barChartLabels;
      this._chart.chart.config.data.datasets = this.barChartData;
      this._chart.chart.update();
      }
  }
  vote() {
    this.votes[this.vote_id]++;
    console.log(this.vote_id);
    if (this.barChartData[this.vote_id].data.length == 0){
      for (let i = 0 ; i < this.vote_id; i++) {
        this.barChartData[this.vote_id].data.push(0);
      }
      this.barChartData[this.vote_id].data.push(1);
    } else {
      for (let i = 0 ; i < this.vote_id; i++) {
        this.barChartData[this.vote_id].data.push(0);
      }
      this.barChartData[this.vote_id].data[this.vote_id]++;
    }
    console.log(this.barChartData);
    if(this._chart)
       this._chart.chart.update();
  }
  resetFullUI () {
    this.votes.length = 0;
    this.options.length = 0;
    this.optionsCount = 0;
    this.question = '';
    while(this.barChartData.length) this.barChartData.pop();
    while(this.barChartLabels.length) this.barChartLabels.pop();
  }

}
