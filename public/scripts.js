document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const commentForm = document.getElementById('commentForm');
    const commentsDiv = document.getElementById('comments');

    socket.on('initial-comments', (comments) => {
        comments.forEach(comment => addComment(comment));
    });

    socket.on('new-comment', (comment) => {
        addComment(comment);
    });

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(commentForm);
        
        fetch('/comment', {
            method: 'POST',
            body: formData
        }).then(response => response.text())
          .then(data => {
              console.log(data);
              commentForm.reset();
          });
    });

    function addComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        
        let content = `<strong>${comment.username}</strong><br>${comment.message}<br><small>${new Date(comment.timestamp).toLocaleString()}</small>`;
        if (comment.file) {
            if (isImage(comment.file)) {
                content += `<br><img src="${comment.file}" alt="Image" style="max-width: 100%; height: auto;">`;
            } else if (isVideo(comment.file)) {
                content += `<br><video controls style="max-width: 100%; height: auto;">
                                <source src="${comment.file}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>`;
            } else {
                content += `<br><a href="${comment.file}" target="_blank">View attachment</a>`;
            }
        }
        
        commentElement.innerHTML = content;
        commentsDiv.insertBefore(commentElement, commentsDiv.firstChild);
    }

    function isImage(file) {
        return /\.(jpg|jpeg|png|gif)$/i.test(file);
    }

    function isVideo(file) {
        return /\.(mp4|webm|ogg|mkv)$/i.test(file);
    }
});
