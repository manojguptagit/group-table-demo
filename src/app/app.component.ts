import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  displayedColumns = ['priority', 'status', 'dateCreated', 'testNumber', 'testCurrency', 'testTime'];
  dataSource = [
    { priority: 'P1', status: 'Undefined', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P1', status: 'Undefined', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P1', status: 'Undefined', dateCreated: '11/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P1', status: 'Undefined', dateCreated: '11/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P1', status: 'Open', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P1', status: 'Open', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P1', status: 'Open', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P1', status: 'Open', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P1', status: 'New', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P1', status: 'New', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'Undefined', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'Undefined', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'Undefined', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'Undefined', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'Open', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'Open', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'Open', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'Open', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'New', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
    { priority: 'P2', status: 'New', dateCreated: '12/12/12', testNumber: 545, testCurrency: 45, testTime: '12:45' },
  ];

  spanningColumns = ['priority', 'status', 'dateCreated'];

  spans = [];

  constructor() {
    this.cacheSpan('priority', d => d.priority);
    this.cacheSpan('status', d => d.priority + d.status);
    this.cacheSpan('dateCreated', d => d.priority + d.status + d.dateCreated);

    // this.prepareColSpans();
    console.log('Spans = ' + JSON.stringify(this.spans));
  }

  prepareColSpans(): void {
    let prevValue = '';
    this.spanningColumns.forEach(spanningColumn => {

      for (let i = 0; i < this.dataSource.length;) {
        let currentValue = prevValue + this.dataSource[i][spanningColumn];
        console.log('Current Value = ' + currentValue);
        let count = 1;

        // Iterate through the remaining rows to see how many match
        // the current value as retrieved through the accessor.
        for (let j = i + 1; j < this.dataSource.length; j++) {
          if (currentValue != prevValue + this.dataSource[j][spanningColumn]) {
            break;
          }
          count++;
        }

        if (!this.spans[i]) {
          this.spans[i] = {};
        }

        // Store the number of similar values that were found (the span)
        // and skip i to the next unique row.
        this.spans[i][spanningColumn] = count;
        i += count;
        prevValue = currentValue;
      }
    });

  }

  /**
   * Evaluated and store an evaluation of the rowspan for each row.
   * The key determines the column it affects, and the accessor determines the
   * value that should be checked for spanning.
   */
  cacheSpan(key, accessor) {
    for (let i = 0; i < this.dataSource.length;) {
      let currentValue = accessor(this.dataSource[i]);
      console.log('Current Value = ' + currentValue);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < this.dataSource.length; j++) {
        if (currentValue != accessor(this.dataSource[j])) {
          break;
        }
        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  getDisplay(col, index) {
    if (this.spanningColumns.indexOf(col) < 0) {
      return 1;
    } else {
      return this.spans[index] && this.spans[index][col];
    }
  }

  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }
}

