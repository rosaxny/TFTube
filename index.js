let pageToken = {};

const endpoint='https://www.googleapis.com/youtube/v3/search';

function apiFunction(str,cb){
  let formQuery = {
    part: 'snippet',
    key: 'AIzaSyBulISD75zhez62BB5L1BnZn7VllIUyAd4',
    q: `${str}`
    // pageToken: pageToken['current']
  };
  $.getJSON(endpoint, formQuery,cb);
}

// format
function images(video){
  let imgUrl = video['snippet']['thumbnails']['medium']['url'];
  let channelLink = video['snippet']['channelId'];
  let channelName = video['snippet']['channelTitle'];
  let videoName = video['snippet']['title'];
  let description = video['snippet']['description'];
  return `
    <br>
    <a href="https://www.youtube.com/watch?v=${video['id']['videoId']}">
      <img src="${imgUrl}" alt="${description}">
      <h4>${videoName}</h4>
    </a>
    <p>More from 
      <a href="https://www.youtube.com/channel/${channelLink}/videos">
        ${channelName}
      </a>
    </p>`;
}


  // $('.token').click(function(){
  //   pageToken['current'] = $(this).val() === 'Next' ? pageToken.nextPage : getQuery();
  //   console.log('token.click', pageToken);
  // })


// for each item
function displayResults(data) {
  // pageToken.nextPage = data.nextPageToken;
  // pageToken.prevPage = data.prevPageToken;
  // console.log(`nextpagetoken: ${data['nextPageToken']}, prevPageToken: ${data['prevPageToken']}`);
  
  let numResults = data['pageInfo']['totalResults'];
  
  const results = data['items'].map((item) => images(item));
  $('.number-of-results').html(`<p>${numResults} results</p><br><div class="results"></div>`);
  $('.results').html(results);
  
}

function getQuery() {
  $('.js-form').submit(function(event) {
    event.preventDefault();
    let search = $(this).find('.js-query');
    let searchText = search.val();
    apiFunction(searchText, displayResults);
  });
}

$(getQuery);