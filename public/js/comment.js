const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-text').value;
    // get post id from url
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);

  if (comment_text) {
    const response = await fetch(`/api/comment`, { 
      method: 'POST',
      body: JSON.stringify({id: id, body: comment_text}),
      headers: {
        'Content-Type': 'application/json', 
  
      },
      
    });
    console.log(response)
    if (response.ok) {
      window.location.reload();
    } else {
      //alert('Bummer. Something went wrong.')
    }
  } else {
    //alert('You must enter both a title and text')
  }
  };

  
  
  document.querySelector('#submit-btn').addEventListener('click', newCommentHandler)
  