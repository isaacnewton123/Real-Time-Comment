const socket = io();
let offset = 0;
const limit = 5;

document.getElementById('submitComment').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    if (name && comment) {
        const fileUpload = document.getElementById('fileUpload');
        const file = fileUpload.files[0];
        const formData = new FormData();
        formData.append('name', name);
        formData.append('comment', comment);
        if (file) {
            formData.append('file', file);
        }
        fetch('/comments', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(() => {
            document.getElementById('name').value = '';
            document.getElementById('comment').value = '';
            fileUpload.value = '';
            hideEmojiPicker();
            showPopup('Your comment has been submitted');
        })
        .catch(error => console.error('Error submitting comment:', error));
    } else {
        alert('Please enter your name and comment.');
    }
});

socket.on('newComment', (comment) => {
    const commentHistory = document.getElementById('commentHistory');
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `<strong>${comment.name}:</strong> ${comment.comment}`;
    if (comment.imageUrl) {
        commentDiv.innerHTML += `<br><img src="${comment.imageUrl}" style="max-width: 100%;">`;
    }
    commentHistory.prepend(commentDiv);
});

socket.on('onlineUsers', (count) => {
    document.getElementById('onlineCount').innerText = count;
});

document.getElementById('loadMoreComments').addEventListener('click', () => {
    offset += limit;
    loadComments(offset, limit);
});

window.onload = () => {
    loadComments(offset, limit);
};

function loadComments(offset, limit) {
    fetch(`/comments?offset=${offset}&limit=${limit}`)
        .then(response => response.json())
        .then(comments => {
            const commentHistory = document.getElementById('commentHistory');
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `<strong>${comment.name}:</strong> ${comment.comment}`;
                if (comment.imageUrl) {
                    commentDiv.innerHTML += `<br><img src="${comment.imageUrl}" style="max-width: 100%;">`;
                }
                commentHistory.appendChild(commentDiv);
            });

            if (comments.length < limit) {
                document.getElementById('loadMoreComments').style.display = 'none';
            }
        });
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupText = document.querySelector('.popup-text');
    popupText.innerText = message;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

function toggleEmojiPicker() {
    const emojiPicker = document.getElementById('emojiPicker');
    emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
}

function hideEmojiPicker() {
    document.getElementById('emojiPicker').style.display = 'none';
}
