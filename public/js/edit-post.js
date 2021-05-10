async function editPostHandler(event) {
    event.preventDefault();
    // set variables for database columns
    const postTitle = document.querySelector('#post_name').value;
    const postBody = document.querySelector('#post_text').value;
    const url = window.location.pathname;
    const id = url.substring(url.lastIndexOf('/') + 1);
  
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace(`/posts/${id}`);
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#submit-btn').addEventListener('click', editPostHandler);