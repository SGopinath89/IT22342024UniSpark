document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const user = {
                username: formData.get('username'),
                password: formData.get('password'),
                year: formData.get('year'),
                role: formData.get('role'),
                approved: formData.get('role') === 'admin' // Automatically approve if admin
            };

            if (formData.get('password') !== formData.get('confirm_password')) {
                alert('Passwords do not match!');
                return;
            }

            const requests = JSON.parse(localStorage.getItem('signupRequests') || '[]');
            requests.push(user);
            localStorage.setItem('signupRequests', JSON.stringify(requests));

            alert('Sign up request sent for approval.');
            event.target.reset();
        });
    }

    const requestList = document.getElementById("requestList");
    if (requestList) {
        const requests = JSON.parse(localStorage.getItem('signupRequests') || '[]');

        requests.forEach((request, index) => {
            if (!request.approved) {
                const listItem = document.createElement("li");
                listItem.textContent = `${request.username} - ${request.role}`;
                listItem.setAttribute("data-index", index);

                const approveButton = document.createElement("button");
                approveButton.textContent = "Approve";
                approveButton.classList.add("button");
                approveButton.addEventListener("click", function() {
                    request.approved = true;
                    localStorage.setItem('signupRequests', JSON.stringify(requests));
                    listItem.remove();
                });

                const rejectButton = document.createElement("button");
                rejectButton.textContent = "Reject";
                rejectButton.classList.add("button");
                rejectButton.addEventListener("click", function() {
                    requests.splice(index, 1);
                    localStorage.setItem('signupRequests', JSON.stringify(requests));
                    listItem.remove();
                });

                listItem.appendChild(approveButton);
                listItem.appendChild(rejectButton);

                requestList.appendChild(listItem);
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const username = formData.get('username');
            const password = formData.get('password');
            const role = formData.get('role');

            if (role === 'admin') {
                // Directly log in the admin without checking for approval
                window.location.href = 'homeAdmin.html';
                return;
            }

            const requests = JSON.parse(localStorage.getItem('signupRequests') || '[]');
            const user = requests.find(request => request.username === username && request.password === password && request.role === role && request.approved);

            if (user) {
                switch (role) {
                    case 'student':
                        window.location.href = 'homeStudent.html';
                        break;
                    case 'lecturer':
                        window.location.href = 'homeLecturer.html';
                        break;
                    case 'instructor':
                        window.location.href = 'homeInstructor.html';
                        break;
                    case 'admin':
                        window.location.href = 'homeAdmin.html';
                        break;
                    default:
                        alert('Invalid role.');
                }
            } else {
                alert('Invalid credentials or your account is not approved yet.');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const courseButtons = document.querySelectorAll('.course-button');
    
        courseButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const courseName = event.target.textContent.trim();
                let targetPage = '';
    
                switch (courseName) {
                    case 'IT':
                        targetPage = 'subjectList_IT.html';
                        break;
                    case 'AMC':
                        targetPage = 'subjectList_AMC.html';
                        break;
                    case 'BIO':
                        targetPage = 'subjectList_BIO.html';
                        break;
                    default:
                        console.error('Unknown course:', courseName);
                        return;
                }
    
                window.location.href = targetPage;
            });
        });
    });
	
	// Handle Course button click
    const courseButton = document.getElementById('courseButton');
    courseButton.addEventListener('click', function() {
        window.location.href = 'course.html'; // Change to the actual course page URL
    });

    // Handle Quiz button click
    const quizButton = document.getElementById('quizButton');
    quizButton.addEventListener('click', function() {
        window.location.href = 'quiz.html'; // Change to the actual quiz page URL
    });

    // Handle Chat with Instructor button click
    const chatButton = document.getElementById('chatButton');
    chatButton.addEventListener('click', function() {
        window.location.href = 'chat.html'; // Change to the actual chat page URL
    });

    const chatMessages =document.getElementById('chat-messages');
    const chatInput =document.getElementById('chat-input');
    const sendBtn =document.getElementById('send-btn');
    const instructorId = 'INSTRUCTOR_ID'; // Replace with actual instructor ID
    const studentId = 'STUDENT_ID'; // Replace with actual student ID (you should get this from your auth system)
});
