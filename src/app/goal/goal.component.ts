import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  
  goals: Goal[];
  alertService: AlertService;
  quote: Quote;
  
  toggleDetails(index) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }
  
  completeGoal(isComplete, index) {
    if(isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`);

      if(toDelete) {
        this.goals.splice(index, 1);
        this.alertService.alertMe("The goal has been deleted!")
      }
    }
  }
  
  addNewGoal(goal) {
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }
  
  constructor(goalService: GoalService, alertService: AlertService, private http: HttpClient) {
    this.goals = goalService.getGoals();
    this.alertService = alertService;
  }
  
  ngOnInit(): void {

    interface ApiResponse {
      author: string;
      quote: string;
    }

    this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data => {
      this.quote = new Quote(data.author, data.quote);
    })

  }
  
}
