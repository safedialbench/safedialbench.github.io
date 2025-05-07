function generateTable() {
  var data = score_table; // The variable from model_scores.js

  var table = '<table class="js-sort-table" id="results">';
  table += `<tr>
          <td class="js-sort-number"><strong>#</strong></td>
          <td class="js-sort"><strong>Model</strong></td>
          <td class="js-sort"><strong>Source</strong></td>
          <td class="js-sort-number"><strong><u>ASR</u></strong></td>
          <td class="js-sort-number"><strong>A.I</strong></td>
          <td class="js-sort-number"><strong>A.H</strong></td>
          <td class="js-sort-number"><strong>A.C</strong></td>
          <td class="js-sort-number"><strong>E.I</strong></td>
          <td class="js-sort-number"><strong>E.H</strong></td>
          <td class="js-sort-number"><strong>E.C</strong></td>
          <td class="js-sort-number"><strong>F.I</strong></td>
          <td class="js-sort-number"><strong>F.H</strong></td>
          <td class="js-sort-number"><strong>F.C</strong></td>
          <td class="js-sort-number"><strong>L.I</strong></td>
          <td class="js-sort-number"><strong>L.H</strong></td>
          <td class="js-sort-number"><strong>L.C</strong></td>
          <td class="js-sort-number"><strong>M.I</strong></td>
          <td class="js-sort-number"><strong>M.H</strong></td>
          <td class="js-sort-number"><strong>M.C</strong></td>
          <td class="js-sort-number"><strong>P.I</strong></td>
          <td class="js-sort-number"><strong>P.H</strong></td>
          <td class="js-sort-number"><strong>P.C</strong></td>
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
          table += `<td><b class="best-score-text">${entry['ASR'].toFixed(2).toString()}</b></td>`; // .toFixed(1): round to 1 decimal place
        }
        else {
          table += `<td><b>${entry.Model}</b></td>`;
          // table += `<td>${entry.Method}</td>`;
          table += `<td><a href="${entry.Source}" class="ext-link" style="font-size: 16px;">Link</a></td>`;
          // table += `<td>${entry.Date}</td>`;
          table += `<td><b>${entry['ASR'].toFixed(2).toString()}</b></td>`; // .toFixed(1): round to 1 decimal place
        }          

        
        table += `<td>${entry['A.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['A.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['A.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['E.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['E.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['E.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['F.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['F.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['F.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['L.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['L.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['L.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['M.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['M.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['M.C'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['P.I'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['P.H'].toFixed(2).toString()}</td>`;
        table += `<td>${entry['P.C'].toFixed(2).toString()}</td>`;
        table += '</tr>';
    }

  table += '</table>';
  document.getElementById('multitrust_leaderboard').innerHTML = table; // Assuming you have a div with id 'container' where the table will be placed
}

// Call the function when the window loads
window.onload = generateTable;
