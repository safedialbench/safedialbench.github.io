function generateTable() {
  var data = score_table; // The variable from model_scores.js

  var table = '<table class="js-sort-table" id="results">';
  table += `<tr>
          <td class="js-sort-number"><strong>#</strong></td>
          <td class="js-sort"><strong>Model</strong></td>
          <td class="js-sort"><strong>Source</strong></td>
          <td class="js-sort-number"><strong><u>Avg.</u></strong></td>
          <td class="js-sort-number"><strong>T.I</strong></td>
          <td class="js-sort-number"><strong>T.M</strong></td>
          <td class="js-sort-number"><strong>S.T</strong></td>
          <td class="js-sort-number"><strong>S.J</strong></td>
          <td class="js-sort-number"><strong>R.O</strong></td>
          <td class="js-sort-number"><strong>R.A</strong></td>
          <td class="js-sort-number"><strong>F.S</strong></td>
          <td class="js-sort-number"><strong>F.B</strong></td>
          <td class="js-sort-number"><strong>P.A</strong></td>
          <td class="js-sort-number"><strong>P.L</strong></td>
      </tr>`;

      // sort data to make sure the best model is on top
      // first_row = '-' // "Human Performance*"
      // console.log(data);

      // get all keys in data
      var keys = Object.keys(data);
      console.log(keys)


      // for (var key in data) {
      for (var i=0; i<keys.length; i++) {
        var key = keys[i];
        console.log(key);
        var entry = data[key];

        table += '<tr>';
        table += `<td>${key}</td>`

        // for key = "1", "2", "3"
        top_ranks = ["1", "2", "3"]
        if (top_ranks.includes(key)) {
          table += `<td><b class="best-score-text">${entry.Model}</b></td>`;
          // table += `<td>${entry.Method}</td>`;
          table += `<td><a href="${entry.Source}" class="ext-link" style="font-size: 16px;">Link</a></td>`;
          // table += `<td>${entry.Date}</td>`;
          table += `<td><b class="best-score-text">${entry['Avg.'].toFixed(1).toString()}</b></td>`; // .toFixed(1): round to 1 decimal place
        }
        else {
          table += `<td><b>${entry.Model}</b></td>`;
          // table += `<td>${entry.Method}</td>`;
          table += `<td><a href="${entry.Source}" class="ext-link" style="font-size: 16px;">Link</a></td>`;
          // table += `<td>${entry.Date}</td>`;
          table += `<td><b>${entry['Avg.'].toFixed(1).toString()}</b></td>`; // .toFixed(1): round to 1 decimal place
        }          

        
        table += `<td>${entry['T.I'].toFixed(1).toString()}</td>`;
        table += `<td>${entry['T.M'].toFixed(1).toString()}</td>`;
        table += `<td>${entry['S.T'].toFixed(1).toString()}</td>`;
        table += `<td>${entry['S.J'].toFixed(1).toString()}</td>`;
        table += `<td>${entry['R.O'].toFixed(1).toString()}</td>`;
        table += `<td>${entry['R.A'].toFixed(1).toString()}</td>`;
        table += `<td>${entry['F.S'].toFixed(1).toString()}</td>`;
        table += `<td>${entry['F.B'].toFixed(1).toString()}</td>`;
        table += `<td>${entry['P.A'].toFixed(1).toString()}</td>`;
        table += `<td>${entry['P.L'].toFixed(1).toString()}</td>`;
        table += '</tr>';
    }

  table += '</table>';
  document.getElementById('multitrust_leaderboard').innerHTML = table; // Assuming you have a div with id 'container' where the table will be placed
}

// Call the function when the window loads
window.onload = generateTable;
