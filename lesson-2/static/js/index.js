function getMoreInfo(clientId){
    fetch('/users/' + clientId)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
}


function goBack() {
    window.history.back();
  }