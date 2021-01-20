const socket = io(); //this bcz of the frontend end library that is been added
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);
    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //Getting the message Text
    const msg = e.target.elements.msg.value;
    //EMIT message to server
    socket.emit('chatMessage',msg);

})
function outputMessage(message)
{
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}