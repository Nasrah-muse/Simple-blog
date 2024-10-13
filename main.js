
const blogForm = document.querySelector('#blog-form');
const postTitleInput = document.querySelector('#postTitle');
const postImageInput = document.querySelector('#postImage');
const postContentInput = document.querySelector('#postContent');
const postsList = document.querySelector('#postsList');

 document.addEventListener('DOMContentLoaded', loadPosts);

// Add new post
blogForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const postTitle = postTitleInput.value.trim();
    const postImage = postImageInput.value.trim();
    const postContent = postContentInput.value.trim();

    if (postTitle !== '' && postContent !== '') {
        const post = {
            id: Date.now(),
            title: postTitle,
            image: postImage,
            content: postContent,
        };

        // Add post to DOM and localStorage
        addPostToDOM(post);
        savePostToLocalStorage(post);

        // Clear the form fields
        postTitleInput.value = '';
        postImageInput.value = '';
        postContentInput.value = '';
    }
});

// Function to load posts from localStorage and display them
function loadPosts() {
    const posts = getPostsFromLocalStorage();
    posts.forEach(post => addPostToDOM(post));
}

// Function to add a post to the DOM
function addPostToDOM(post) {
    const li = document.createElement('li');
    li.className = 'post-item';
    li.dataset.id = post.id;
    li.innerHTML = `
        <h3>${post.title}</h3>
        ${post.image ? `<img src="${post.image}" alt="Post image">` : ''}
        <p>${post.content}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
    postsList.appendChild(li);

    // Attach event listeners to the edit and delete buttons
    li.querySelector('.edit-btn').addEventListener('click', function () {
        editPost(post.id);
    });
    li.querySelector('.delete-btn').addEventListener('click', function () {
        deletePost(post.id, li);
    });
}

// Edit a post
function editPost(postId) {
    const posts = getPostsFromLocalStorage();
    const post = posts.find(p => p.id === postId);

    if (post) {
        const newTitle = prompt('Edit title:', post.title);
        const newContent = prompt('Edit content:', post.content);

        if (newTitle && newContent) {
            post.title = newTitle;
            post.content = newContent;

            // Update localStorage
            localStorage.setItem('posts', JSON.stringify(posts));

            // Update  DOM
            postsList.innerHTML = '';
            loadPosts();
        }
    }
}

//  delete a post
function deletePost(postId, li) {
    let posts = getPostsFromLocalStorage();
    posts = posts.filter(post => post.id !== postId);

    // Update localStorage
    localStorage.setItem('posts', JSON.stringify(posts));

    // Remove
    li.remove();
}

// Function to save a post to localStorage
function savePostToLocalStorage(post) {
    const posts = getPostsFromLocalStorage();
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to get posts from localStorage
function getPostsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}
