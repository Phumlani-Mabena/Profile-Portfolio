const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active'); 
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

const resumeBtns = document.querySelectorAll('.resume-btn')

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});

document.getElementById("downloadButton").addEventListener("click", function () {
    var a = document.createElement("a");
    a.href = "Imgs/Mabena.P.Cv.pdf";
    a.download = "Mabena.P.Cv.pdf";
    a.click();
  });



document.addEventListener("DOMContentLoaded", function () {
    const text = "Hi. I’m Phumlani Mabena.\nA Full Stack Developer.";
    const typewriterText = document.getElementById("typewriter-text");
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            if (text.charAt(index) === "\n") {
                typewriterText.innerHTML += "<br>";
            } else {
                typewriterText.innerHTML += text.charAt(index);
            }
            index++;
            setTimeout(typeWriter, 100); 
        }
    }
});
typeWriter();

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
}

arrowRight.addEventListener('click', () => {
    if (index < 4) {
        index++; 
        arrowLeft.classList.remove('disabled');
    }
    else {
        index = 5;
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled');
    }
    else {
        index = 0;
        arrowLeft.classList.add('disabled');
    }
    activePortfolio();
});


/* Chatbot JS */
const chatbotIcon = document.querySelector('.chatbot-icon');
const chatbotWindow = document.querySelector('.chatbot-window');
const chatbotBody = document.querySelector('.chatbot-body');
const inputField = document.querySelector('.chatbot-footer input');
const sendButton = document.querySelector('.chatbot-footer button');
const closeButton = document.querySelector('.close-btn');

// Toggle the chatbot window visibility
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'flex' : 'none';
}

// Close button functionality
closeButton.addEventListener('click', () => {
    chatbotWindow.style.display = 'none';
});

// Send a message
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const chatbotBody = document.getElementById('chatbotBody');
    
    // Get the user's message
    const message = userInput.value.trim();

    // Do nothing if the input is empty
    if (message === '') return;

    // Display user's message in the chatbot body
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chatbot-message user';
    userMessageDiv.textContent = message;
    chatbotBody.appendChild(userMessageDiv);

    // Clear the input field
    userInput.value = '';

    // Simulate a bot response using generateResponse
    setTimeout(() => {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chatbot-message bot';
        const botResponse = generateResponse(message);
        botMessageDiv.innerHTML = botResponse;
        chatbotBody.appendChild(botMessageDiv);

        // Scroll to the latest message
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 1000); // Simulate a delay for the bot's response
}

function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotBody = document.getElementById('chatbotBody');

    if (chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '') {
        chatbotWindow.style.display = 'flex';
    } else {
        chatbotWindow.style.display = 'none';
        chatbotBody.innerHTML = ''; // Clear previous messages
    }
}



// Add message function
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', sender);
    messageElement.innerHTML = text; // Use innerHTML if text contains HTML (e.g., email with <strong>)
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight; // Scroll to the latest message
}

// Speak text function for Text-to-Speech
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes("female") || 
        voice.lang === "en-US" || 
        voice.name.includes("Google UK English Female")
    );

    utterance.voice = femaleVoice || voices[0];
    utterance.rate = 1; // Adjust speech rate
    utterance.pitch = 1; // Adjust pitch
    window.speechSynthesis.speak(utterance);
}

// Generate response function (enhanced response logic with humor and emojis)
function generateResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hello')) {
        return '👋 Hello!, How can I help you today? ';
    }
    else if (lowerCaseMessage.includes('how are you')) {
        return 'I’m doing great! How can I assist you?';
    }
    else if (lowerCaseMessage.includes('What is your educational background?') || lowerCaseMessage.includes('education')) {
        return 'I hold a National Diploma in Information Technology Software Development from Nelson Mandela University, where I honed my skills in programming';
    }
    else if (lowerCaseMessage.includes('What do you like about programming?') || lowerCaseMessage.includes('what do you like about programming')) {
        return 'I enjoy creating solutions that make life easier and more efficient. Programming allows me to turn ideas into functional applications, and I love seeing users interact with my work.';
    }
    else if (lowerCaseMessage.includes('services') || lowerCaseMessage.includes('skills')) {
        return 'I’m skilled in C#, JavaScript, Python, and SQL, along with front-end technologies like HTML and CSS. I also have a certificate of completion in applied data science with Python';
    }
    else if (lowerCaseMessage.includes('experience') || lowerCaseMessage.includes('background')) {
        return 'Currently aining experience in Microsoft Application Management, focusing on developing web applications with Javascript, HTML, and CSS.';
    }
    else if (lowerCaseMessage.includes('availability') || lowerCaseMessage.includes('available')) {
        return "I’m currently available for freelance projects, internships, and full-time roles. Let’s connect and discuss how we can collaborate!";
    }
    else if (lowerCaseMessage.includes('Are you open to remote work or relocation?') || lowerCaseMessage.includes('remote work')) {
        return 'Yes, I’m based in Johannesburg, South Africa, but I’m open to remote opportunities or relocating for the right role.';
    }
    else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('email')) {
        return 'You can send me an email at <strong>phumlanimabena2@gmail.com</strong>. I’m also on LinkedIn if you want to connect!';
    }
    else if (lowerCaseMessage.includes('projects') || lowerCaseMessage.includes('Can you tell me about a project you have worked on?')) {
        return 'Sure! In my final year, I developed a web application using ASP.NET MVC Core and SQL Server. The app featured real-time quizzes with JavaScript to provide instant feedback, enhancing the user experience. Fell free to check out my portfolio ';
    }
    else if (lowerCaseMessage.includes('languages') || lowerCaseMessage.includes('tech')) {
        return 'I have worked with JavaScript, C# ASP.NET MVC Core, HTML/CSS, and Microsoft SQL Server, feel free to check out the resume tab > skills ';
    }
    else if (lowerCaseMessage.includes('soft skills') || lowerCaseMessage.includes('What soft skills do you bring to the table?')) {
        return 'I’m a team player, adaptable, and a quick learner. I also value communication and collaboration in every project I work on.';
    }
    else if (lowerCaseMessage.includes('career goals') || lowerCaseMessage.includes('What are your career goals?')) {
        return 'My goal is to grow in the IT industry, focusing on software development and exploring advanced areas like artificial intelligence and data analytics.';
    }
    else if (lowerCaseMessage.includes('What keeps you motivated in your career?') || lowerCaseMessage.includes('motivation')) {
        return 'I’m driven by the opportunity to solve problems and continuously learn new technologies. The fast-paced nature of the IT industry keeps me motivated.';
    }
    else {
        return '🤔 I’m not quite sure how to answer that, but I’d love to hear more! Feel free to contact me via email or connect on LinkedIn!';
    }
}

