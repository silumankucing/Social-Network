const API_BASE = window.API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:3000`;

const feedData = [
    {
        type: "photo",
        user: "kuro",
        username: "@silumankucing",
        avatar: "http://localhost/data/silumankucing/profile/ava_silumankucing.png",
        content: "http://localhost/data/silumankucing/photo/photo_silumankucing_001.png",
        caption: "This is a photo caption describing the content of the photo.",
        title: "Campus"
    },
    {
        type: "text",
        user: "kuro",
        username: "@silumankucing",
        avatar: "http://localhost/data/silumankucing/profile/ava_silumankucing.png",
        content: "BJIRR",
        caption: "",
        title: ""
    },
    {
        type: "video",
        user: "kuro",
        username: "@silumankucing",
        avatar: "http://localhost/data/silumankucing/profile/ava_silumankucing.png",
        content: "http://localhost/data/silumankucing/video/video_silumankucing_001.mp4",
        caption: "This is a video caption describing the content of the video.",
        title: "FPV Race"
    },
    {
        type: "audio",
        user: "kuro",
        username: "@silumankucing",
        avatar: "http://localhost/data/silumankucing/profile/ava_silumankucing.png",
        content: "http://localhost/data/silumankucing/audio/audio_silumankucing_001.mp3",
        caption: "This is an audio caption describing the content of the audio.",
        title: "Coding Podcast"
    },
    {
        type: "text",
        user: "kuro",
        username: "@silumankucing",
        avatar: "http://localhost/data/silumankucing/profile/ava_silumankucing.png",
        content: "test microblogging, hehe...",
        caption: "",
        title: ""
    },
    {
        type: "text",
        user: "kuro",
        username: "@silumankucing",
        avatar: "http://localhost/data/silumankucing/profile/ava_silumankucing.png",
        content: "Hehe",
        caption: "",
        title: ""
    }
];

const chat_accounts = [
    {
        name: "Budiono Siregar",
        username: "@budionosiregar",
        avatar: "http://localhost/data/budionosiregar/profile/ava_budionosiregar.png",
        messages: [
            { from: "them", text: "Hello! 👋", time: "10:00" },
            { from: "me", text: "Hi, how are you?", time: "10:01" }
        ]
    },
    {
        name: "Nobita",
        username: "@nobita",
        avatar: "http://localhost/data/nobita/profile/ava_nobita.png",
        messages: [
            { from: "them", text: "Halo!", time: "09:00" },
            { from: "me", text: "Apa kabar?", time: "09:01" }
        ]
    },
    {
        name: "Yantoo",
        username: "@yantoo",
        avatar: "http://localhost/data/yantoo/profile/ava_yantoo.png",
        messages: [
            { from: "them", text: "Hello! 👋", time: "10:00" },
            { from: "me", text: "Hi, how are you?", time: "10:01" }
        ]
    },
    {
        name: "Reza",
        username: "@reza",
        avatar: "http://localhost/data/reza/profile/ava_reza.png",
        messages: [
            { from: "them", text: "Halo!", time: "09:00" },
            { from: "me", text: "Apa kabar?", time: "09:01" }
        ]
    }
];

const notifications = [
    {
        user: "John Doe",
        action: "liked your post",
        time: "2h",
        avatar: "http://localhost/data/silumankucing/profile/ava_silumankucing.png"
    },
    {
        user: "Jane Smith",
        action: "commented on your photo",
        time: "5h",
        avatar: "http://localhost/data/silumankucing/profile/ava_silumankucing.png"
    },
    {
        user: "Mike Johnson",
        action: "followed you",
        time: "1d",
        avatar: "http://localhost/data/nobita/profile/ava_nobita.png"
    },
    {
        user: "Jane Smith",
        action: "commented on your photo",
        time: "5h",
        avatar: "http://localhost/data/nobita/profile/ava_nobita.png"
    },
    {
        user: "Jane Smith",
        action: "commented on your photo",
        time: "5h",
        avatar: "http://localhost/data/budionosiregar/profile/ava_budionosiregar.png"
    },
    {
        user: "Jane Smith",
        action: "commented on your photo",
        time: "5h",
        avatar: "http://localhost/data/silumankucing/profile/ava_silumankucing.png"
    }
];

const followers = [
    {
        name: "Budiono Siregar",
        username: "@budionosiregar",
        avatar: "http://localhost/data/budionosiregar/profile/ava_budionosiregar.png",
        bio: "Engineer & Traveler"
    },
    {
        name: "Nobita",
        username: "@nobita",
        avatar: "http://localhost/data/nobita/profile/ava_nobita.png",
        bio: "Dreamer"
    }
];

const following = [
    {
        name: "Yantoo",
        username: "@yantoo",
        avatar: "http://localhost/data/yantoo/profile/ava_yantoo.png",
        bio: "Cat Feeder"
    },
    {
        name: "reza",
        username: "@reza",
        avatar: "http://localhost/data/reza/profile/ava_reza.png",
        bio: "Business management"
    }
];

let selectedAccountIndex = 0;

function showContent(type) {
    if (type === 'message') {
        renderMessageUI();
    } else if (type === 'feed') {
        renderFeed();
    } else if (type === 'notification') {
        renderNotificationList();
    } else if (type === 'create') {
        renderCreateForm();
    } else if (type === 'setting') {
        renderSettingForm();
    } else if (type === 'followers' || type === 'following') {
        renderFollowPage(type);
    } else if (type === 'logout') {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');
        const leftContainer = document.querySelector('.left-container');
        if (leftContainer) leftContainer.style.display = 'none';
        renderLandingPage();
    }
}

// --- LANDING PAGE --- //

function renderLandingPage() {

    const leftContainer = document.querySelector('.left-container');
    if (leftContainer) leftContainer.style.display = 'none';

    const rightContainer = document.getElementById('right-container');
    rightContainer.innerHTML = `
        <div class="landing-container" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:80vh;">
            <img src="/src/assets/logo.png" alt="Logo" style="width:80px;margin-bottom:24px;">
            <h1 style="margin-bottom:16px;">Welcome to nolifepeople</h1>
            <p style="margin-bottom:32px;color:#555;">Connect, share, and explore with others.</p>
            
            <div style="display:flex;gap:18px;">
                <button onclick="renderLoginPage()" class="login-btn" style="padding:10px 28px;font-size:1.1em;">Login</button>
                <button onclick="renderRegisterPage()" class="login-btn" style="padding:10px 28px;font-size:1.1em;background:#eee;color:#222;">Register</button>
            </div>
        </div>
    `;
}

// --- FEED --- //

function renderFeed(filterType = 'all') {
    const rightContainer = document.getElementById('right-container');
    const filteredFeed = (filterType && filterType !== 'all')
        ? feedData.filter(item => item.type === filterType)
        : feedData;

    rightContainer.innerHTML = `
        <div id="feed-container" class="feed">
            ${filteredFeed.map((item, idx) => renderFeedItem(item, idx)).join('')}
        </div>
    `;
}

function renderFeedItem(item, idx) {
    let media = "";
    if (item.type === "photo") {
        media = `<img src="${item.content}" alt="Photo">`;
    } else if (item.type === "video") {
        media = `<video controls src="${item.content}"></video>`;
    } else if (item.type === "audio") {
        media = `<audio controls src="${item.content}"></audio>`;
    } else if (item.type === "text") {
        media = `<p>${item.content}</p>`;
    }
    return `
        <div class="feed-item">
            <div class="feed-header">
                <img src="${item.avatar}" alt="User Avatar" class="feed-avatar">
                <span class="feed-username">${item.username}</span>
            </div>

            ${media}
            ${item.title ? `<h3>${item.title}</h3>` : ""}
            ${item.caption ? `<p class="caption">${item.caption}</p>` : ""}

            <div class="actions" style="display: flex; gap: 10px; align-items: center; justify-content: flex-start;">

                <button class="like-btn">Like</button>
                <button class="comment-btn" onclick="toggleComment(${idx})">Comment</button>
            </div>

            <div class="comment-section" id="comment-section-${idx}" style="display:none; margin-top:10px; flex-direction: row; gap: 8px; align-items: center;">
                <input type="text" placeholder="Add a comment..." class="comment-input">
                <button class="send-btn">Send</button>
            </div>
        </div>
    `;
}

function toggleComment(idx) {
    const section = document.getElementById(`comment-section-${idx}`);
    if (section) {
        section.style.display = section.style.display === 'none' ? 'flex' : 'none';
    }
}

// --- MESSAGE --- //

function renderMessageUI() {
    const rightContainer = document.getElementById('right-container');
    rightContainer.innerHTML = `
        <div class="whatsapp-container">
            <div class="wa-sidebar">
                <div class="wa-account-list">
                    ${chat_accounts.map((acc, idx) => `
                        <div class="wa-account${idx === selectedAccountIndex ? ' active' : ''}" data-idx="${idx}">
                            <img src="${acc.avatar}" class="wa-avatar" alt="Avatar">
                            <div>
                                <div class="wa-account-name">${acc.name}</div>
                                <div class="wa-account-username">${acc.username ? acc.username : ''}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="wa-chat-area">
                <div class="wa-chat-messages" id="chat-messages">
                    ${chat_accounts[selectedAccountIndex].messages.map(msg => `
                        <div class="wa-message ${msg.from === 'me' ? 'sent' : 'received'}">
                            <div class="wa-message-content">${msg.text}</div>
                            <div class="wa-message-time">${msg.time}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="wa-chat-input-container">
                    <input type="text" id="chat-input" placeholder="Type a message..." class="wa-chat-input">
                    <button class="wa-send-btn" onclick="sendMessage()">Send</button>
                </div>
            </div>
        </div>
    `;

    document.querySelectorAll('.wa-account').forEach(el => {
        el.addEventListener('click', function() {
            selectedAccountIndex = parseInt(this.getAttribute('data-idx'));
            renderMessageUI();
        });
    });
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    if (chatInput.value.trim() !== '') {
        chat_accounts[selectedAccountIndex].messages.push({
            from: 'me',
            text: chatInput.value,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        renderMessageUI();
        setTimeout(() => {
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 0);
    }
}

function renderNotificationList() {
    const rightContainer = document.getElementById('right-container');
    rightContainer.innerHTML = `
        <div class="notification-feed">
            ${notifications.map(n =>
                `<div class="notification-item">
                    <img src="${n.avatar}" alt="${n.user}" class="notification-avatar">
                    <div class="notification-content">
                        <p><strong>${n.user}</strong> ${n.action}</p>
                        <span class="notification-time">${n.time}</span>
                    </div>
                </div>`
            ).join('')}
        </div>
    `;
}

function renderCreateForm() {
    const rightContainer = document.getElementById('right-container');
    rightContainer.innerHTML = `
        <h2>What's Up?</h2>
        <select id="create-select" onchange="handleCreateSelection(this.value)">
            <option value="text">What Happen?</option>
            <option value="video">Picture in Motion</option>
            <option value="audio">Lets Yapping</option>
            <option value="photo">Capture</option>
        </select>
        <div id="create-form-container"></div>
    `;
}

function handleCreateSelection(type) {
    const formContainer = document.getElementById('create-form-container');
    if (type === 'text') {
        formContainer.innerHTML = `
            <form>
                <label>Text Content: <textarea name="text-content"></textarea></label><br>
                <button type="submit">Submit</button>
            </form>
        `;
    } else if (type === 'video') {
        formContainer.innerHTML = `
            <form>
                <label>Video ID: <input type="text" name="video-id"></label><br>
                <label>Video Title: <input type="text" name="video-title"></label><br>
                <label>Video File: <input type="file" name="video-file" accept="video/*"></label><br>
                <label>Video Caption: <textarea name="video-caption"></textarea></label><br>
                <button type="submit">Submit</button>
            </form>
        `;
    } else if (type === 'audio') {
        formContainer.innerHTML = `
            <form>
                <label>Audio ID: <input type="text" name="audio-id"></label><br>
                <label>Audio Title: <input type="text" name="audio-title"></label><br>
                <label>Audio File: <input type="file" name="audio-file" accept="audio/*"></label><br>
                <label>Audio Caption: <textarea name="audio-caption"></textarea></label><br>
                <button type="submit">Submit</button>
            </form>
        `;
    } else if (type === 'photo') {
        formContainer.innerHTML = `
            <form>
                <label>Photo ID: <input type="text" name="photo-id"></label><br>
                <label>Photo Title: <input type="text" name="photo-title"></label><br>
                <label>Photo File: <input type="file" name="photo-file" accept="image/*"></label><br>
                <label>Photo Caption: <textarea name="photo-caption"></textarea></label><br>
                <button type="submit">Submit</button>
            </form>
        `;
    } else {
        formContainer.innerHTML = '';
    }
}

function renderSettingForm() {
    const rightContainer = document.getElementById('right-container');
    rightContainer.innerHTML = `
        <form id="setting-form">
            <label for="avatar-upload">Avatar</label>
            <input type="file" id="avatar-upload" accept="image/*"><br>
            <img id="avatar-preview" src="http://localhost/data/silumankucing/profile/ava_silumankucing.png" alt="Avatar" style="width:80px;height:80px;border-radius:50%;margin-bottom:10px;"><br>
            <label for="username">UserID</label>
            <input type="text" id="user_id" placeholder="user_id" disabled><br>
            <label for="username">Username</label>
            <input type="text" id="username" placeholder="username"><br>
            <label for="email">Fullname</label>
            <input type="text" id="full_name" placeholder="full_name"><br>
            <label for="gender">Gender</label>
            <select id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select><br>
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="email"><br>
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="password"><br>
            <label for="email">Bio</label>
            <input type="text" id="bio" placeholder="bio"><br>
            <button type="submit">Save Changes</button>
        </form>
    `;

    const avatarInput = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');
    avatarInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarPreview.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// --- FOLLOWER/FOLLOWING --- //

function renderFollowPage(activeTab = 'followers') {
    const rightContainer = document.getElementById('right-container');
    const data = activeTab === 'followers' ? followers : following;
    const title = activeTab === 'followers' ? 'Followers' : 'Following';

    rightContainer.innerHTML = `
        <h2>${title}</h2>
        <div class="follow-list">
            ${data.map(user => `
                <div class="follow-item">
                    <img src="${user.avatar}" class="follow-avatar" alt="${user.name}">
                    <div class="follow-info">
                        <div class="follow-name">${user.name}</div>
                        <div class="follow-username">${user.username}</div>
                        <div class="follow-bio">${user.bio}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function openFilterPopup() {
    document.getElementById('filter-popup').style.display = 'flex';
}

function closeFilterPopup() {
    document.getElementById('filter-popup').style.display = 'none';
}

function applyFeedFilter(type) {
    closeFilterPopup();
    renderFeed(type);
}

function openSearchPopup() {
    alert('Search popup opened!');
}

// --- USER LOGIN --- //

function renderLoginPage() {
    const rightContainer = document.getElementById('right-container');
    rightContainer.innerHTML = `
        <div class="login-container">
            <form class="login-form" id="loginForm">
                <img src="http://localhost/src/assets/logo.png" alt="Logo" style="width:60px; margin-bottom:16px;">
                <h2>Login to nolifepeople</h2>
                <input type="text" id="login-username" placeholder="Username" required>
                <input type="password" id="login-password" placeholder="Password" required>
                <button type="submit" class="login-btn">Login</button>
                <div id="login-error" style="color:#d32f2f; margin-top:10px; display:none;"></div>
                <div class="register-link" style="margin-top:12px;">
                    Don't have an account? <a href="#" onclick="renderRegisterPage();return false;">Register</a>
                </div>
            </form>
        </div>
    `;

    document.getElementById('loginForm').onsubmit = async function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const errorDiv = document.getElementById('login-error');
        errorDiv.style.display = 'none';

        try {
            const response = await fetch(`${API_BASE}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            });
            const result = await response.json();

            if (response.ok) {
                if (result.success) {
                    // Simpan session
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('username', result.username);

                    // Tampilkan feed
                    const leftContainer = document.querySelector('.left-container');
                    if (leftContainer) leftContainer.style.display = '';
                    renderFeed();
                } else {
                    errorDiv.textContent = result.message || "Login failed.";
                    errorDiv.style.display = 'block';
                }
            } else {
                errorDiv.textContent = "HTTP error: " + response.status;
                errorDiv.style.display = 'block';
            }
        } catch (error) {
            errorDiv.textContent = "Unable to connect to server.";
            errorDiv.style.display = 'block';
            console.error("Login error:", error);
        }
    };
}

// --- USER REGISTER --- //

function renderRegisterPage() {
    const rightContainer = document.getElementById('right-container');
    rightContainer.innerHTML = `
        <div class="login-container">
            <form class="register-form" id="registerForm">
                <img src="http://localhost/src/assets/logo.png" alt="Logo" style="width:60px; margin-bottom:16px;">
                <h2>Register to nolifepeople</h2>

                <input type="text" id="register-fullname" placeholder="Full Name" required>
                <input type="text" id="register-username" placeholder="Username" required>
                <input type="text" id="register-email" placeholder="Email" required>
                <input type="password" id="register-password" placeholder="Password" required>
                <button type="submit" class="login-btn">Register</button>

                <div id="register-error" style="color:#d32f2f; margin-top:10px; display:none;"></div>
                <div class="register-link" style="margin-top:12px;">
                    Already have an account? <a href="#" onclick="renderLoginPage();return false;">Login</a>
                </div>
            </form>
        </div>
    `;

    document.getElementById('registerForm').onsubmit = function(event) {
        event.preventDefault();
        localStorage.setItem('loggedIn', 'true');
        const leftContainer = document.querySelector('.left-container');
        if (leftContainer) leftContainer.style.display = '';
        renderFeed();
    };
}

window.onload = function () {
    // Check if user is already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        const leftContainer = document.querySelector('.left-container');
        if (leftContainer) leftContainer.style.display = '';
        renderFeed();
    } else {
        renderLandingPage();
    }
};