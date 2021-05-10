const postHandler = (event) => {
  // event delegation to determine if a delete or edit button was clicked and run the appropriate function
  if (event.target.hasAttribute('data-delete-id')) {
    deletePost(event);
  } else if (event.target.hasAttribute('data-edit-id')) {
    editPost(event);
  }
};

// use dataset to get id for post and submit delete request
const deletePost = async (event) => {
  const id = event.target.getAttribute('data-delete-id');

  let confirmation = confirm('This will delete the post, and cannot be undone. Would you like to continue?');

  if (confirmation === true) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      // alert(response.statusText);
    }
  }
};

// use dataset to get id for post and load edit-post page
const editPost = async (event) => {

  const id = event.target.getAttribute('data-edit-id');
  console.log(id)
  window.location.replace(`/edit-post/${id}`)
}


const newPost = async (event) => {
  const newPostDiv = document.getElementById("new-post-div");
  if (newPostDiv.style.display === "none") {
    newPostDiv.style.display = "block";
    newPostDiv.style.transition = "all .25s ease-in-out";
  } else {
    newPostDiv.style.display = "none";
  }
}

const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post_name').value;
  const body = document.querySelector('#post_text').value;

  if (title && body) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body
      }),
      headers: {
        'Content-Type': 'application/json',
      },

    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // alert('Bummer. Something went wrong.')
    }
  } else {
    // alert('You must enter both a title and text')
  }
};


const getJoke = () => {
  // const jokeText=document.querySelector('.joke-text')
  // make an API request to https://icanhazdadjoke.com/'
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    /* convert Stringified JSON response to Javascript Object */
    return response.json();
  }).then((data) => {
    /* replace innerText of .joke-text with data.joke */
    // extract the joke text
    const joke = data.joke;
    // do the replacement
    jokeText.innerText = joke;
  }).catch(function (error) {
    // if some error occured
    jokeText.innerText = 'Oops! Some error happened :(';
    console.log(error);
  });
}

const jokeText = document.querySelector('.joke-text');

getJoke();

document.querySelector('#posts-container').addEventListener('click', postHandler)

document.querySelector('#new-post').addEventListener('click', newPost)

document.querySelector('#submit-btn').addEventListener('click', newPostHandler)