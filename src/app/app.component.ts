import { Component, VERSION } from '@angular/core';

export interface Question {
  id: string;
  options: Option[];
}

export interface Option {
  optionId: string;
  pointToQuestion: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  question1 = <Question>{
    id: 'Q1',
    options: [
      { optionId: 'O1-1', pointToQuestion: 'Q2' },
      { optionId: 'O1-2', pointToQuestion: 'Q3' }
    ]
  };
  question2 = <Question>{
    id: 'Q2',
    options: [{ optionId: 'O2-1', pointToQuestion: '04' }]
  };
  question3 = <Question>{
    id: 'Q3',
    options: [{ optionId: 'O3-1', pointToQuestion: null }]
  };
  question4 = <Question>{
    id: 'Q4',
    options: [{ optionId: 'O4-1', pointToQuestion: null }]
  };

  questionDict = {
    ['Q1']: this.question1,
    ['Q2']: this.question2,
    ['Q3']: this.question3,
    ['Q4']: this.question4
  };

  possibleResults: string[][] = [];

  ngOnInit() {
    this.calculatePossibleResults(this.question1);
    console.log(this.possibleResults);
  }

  calculatePossibleResults(entryQuestion: Question) {
    entryQuestion.options.forEach(opt => this.calculateCurrentResult(opt));
  }

  calculateCurrentResult(option: Option, currentResult: string[] = []) {
    if (option.pointToQuestion) {
      this.possibleResults.push(currentResult);
    } else {
      const newCurrentResult = [...currentResult];
      newCurrentResult.push(option.pointToQuestion);
      const nextQuestion = this.questionDict[option.pointToQuestion];
      nextQuestion.options.forEach(opt =>
        this.calculateCurrentResult(opt, newCurrentResult)
      );
    }
  }
}
