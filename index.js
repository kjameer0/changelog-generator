document.querySelector('#testButton').addEventListener
('click', async() => {
      const inputPersonalAccess  = await document.querySelector('#personalAccessToken').value
      const inputGithubUrl = await document.querySelector('#githubUrl').value

      //console.log(inputPersonalAccess)


      fetch(`${inputGithubUrl} + ${inputPersonalAccess}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    key1: 'value1',
    key2: 'value2'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

    }
)