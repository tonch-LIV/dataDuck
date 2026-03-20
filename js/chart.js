'use strict';

let canvasElem = document.getElementById('chart')

/* TODO:
 * - Instantiate a new AppState
 * - Use a method on that AppState to load vote data from localStorage.
 * - Create a data object for chart.js using your AppState's allProducts array.
 * - Combine the data object with configuration information for chart.js type, colors, etc
 * - Call chart.js with the configuration and the canvasElem
 *
 */
function renderChart() {
  //load data
  let state = new AppState();
  state.loadItems();

  console.log(state.allProducts); // test

  // arrays
  let productNames = [];
  let votes = [];
  let views = [];

  for (let i = 0; i < state.allProducts.length; i++) {
    productNames.push(state.allProducts[i].name);
    votes.push(state.allProducts[i].timesClicked);
    views.push(state.allProducts[i].timesShown);
  }

  console.log(productNames, votes, views); //  test

  // data object
  let data = {
    labels: productNames,
    datasets: [
      {
        label: 'Votes',
        data: votes,
        borderWidth: 1,
        backgroundColor: 'rgba(28, 19, 209, 0.7)'
      },
      {
        label: 'Views',
        data: views,
        borderWidth: 1,
        backgroundColor: 'rgba(234, 132, 23, 0.74)'
      }
    ]
  };

  // config
  let config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // render chart
  new Chart(canvasElem, config);
};

renderChart();
