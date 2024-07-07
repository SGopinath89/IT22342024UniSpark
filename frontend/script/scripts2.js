document.addEventListener("DOMContentLoaded", () => {
	
	document.addEventListener('DOMContentLoaded', () => {
  const uploadButtons = document.querySelectorAll('.upload');

 // script.js

document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('uploadForm');

  if (uploadForm) {
    uploadForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Upload failed');
        }
        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Upload failed. Please try again.');
      }
    });
  }
});


	
	const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const role = 'student'; // or 'instructor' - set this based on the logged-in user
    const studentId = 'STUDENT_ID'; // Replace with actual student ID
    const instructorId = 'INSTRUCTOR_ID'; // Replace with actual instructor ID

    // Load existing messages
    async function loadMessages() {
        try {
            const response = await fetch(`/api/chat/${studentId}/${instructorId}`);
            const messages = await response.json();

            chatMessages.innerHTML = '';
            messages.forEach(message => {
                addMessageToChat(message);
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    // Add message to chat box
    function addMessageToChat(message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', message.sender === role ? role : (role === 'student' ? 'instructor' : 'student'));

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message.message;

        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message
    sendBtn.addEventListener('click', async () => {
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        const message = {
            sender: role,
            message: messageText
        };

        try {
            const response = await fetch(`/api/chat/${studentId}/${instructorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });

            const savedMessage = await response.json();
            addMessageToChat(savedMessage);

            chatInput.value = '';
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Load messages on page load
    loadMessages();
});
});