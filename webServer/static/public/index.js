let urlSocket = 'http://127.0.0.1:3000/';
let socket = io.connect(urlSocket);
let messageForm = document.querySelector('#chatForm');
let message = document.querySelector('#message');
let chatList = document.querySelector('#chatList');
let loginForm = document.querySelector('#loginForm');
let loginFailed = document.querySelector('#loginFailed');
let username = document.querySelector('#username');
let password = document.querySelector('#password')

const login = (e) => {
	e.preventDefault();
	socket.emit('newUser', { username: username.value, password: password.value }, response => {
		if (response) {
			let login = document.querySelector('#login')
			login.style.display = 'none';
			let chatWindow = document.querySelector('#chatWindow')
			chatWindow.style.display = 'block'
		} else {
			loginFailed.innerText = 'Username already exists.';
		}
	});
};
loginForm.addEventListener('submit', login);

socket.on('updateUserList', data => {
	let usersList = document.querySelector('#usersList');
	let usersFragment = document.createDocumentFragment();
	data.forEach(item => {
		let user = document.createElement('p');
		user.innerText = item;
		usersFragment.appendChild(user)
	})
	usersList.innerHTML = '';
	usersList.appendChild(usersFragment);
});
const sendMessage = (e) => {
	e.preventDefault();
	socket.emit('sendMessage', { 'message': message.value });
	message.value = '';
};
messageForm.addEventListener('submit', sendMessage)

socket.on('newMessage', function (data) {
	let msg = document.createElement('li');
	msg.innerText = data.user + ': ' + data.msg;
	chatList.appendChild(msg);
});
socket.on('showPrevMsg', function (data) {
	data.forEach(item => {
		let msg = document.createElement('li');
		msg.innerText = item.name + ': ' + item.msg;
		chatList.appendChild(msg);
	})
})