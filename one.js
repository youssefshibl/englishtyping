const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json'
    }
  };
  
  fetch('https://api.notion.com/v1/blocks/58b830dba8594ea39658ea86f03c75f7/children', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));