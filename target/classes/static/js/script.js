function connect() {
	if($("#message_input_value1").val()!=''){
	var socket = new SockJS('/WebChat/chat-messaging');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		console.log("connected: " + frame);
		alert("user Connected");
		console.log($("#message_input_value1").val());

		stompClient.subscribe('/chat/messages', function(response) {
			var data = JSON.parse(response.body);
			if ($("#message_input_value1").val() == data.from) {
				draw("right", data.message, 'You');
			} else {
				draw("left", data.message, data.from);
			}

		});
	});
	} else {
		alert("enter username");
	}
}

function draw(side, text, text1) {
	console.log(side);
	console.log(text);
	console.log(text1);
	console.log("drawing...");
	var $message;
	$message = $($('.message_template').clone().html());
	$message.addClass(side).find('.text').html(text);
	$message.addClass(side).find('.avatar').html(text1);
	$('.messages').append($message);
	return setTimeout(function() {
		return $message.addClass('appeared');
	}, 0);

}
function disconnect() {
	stompClient.disconnect();
}
function sendMessage() {
	
	stompClient.send("/app/message", {}, JSON.stringify({
		'from' : $("#message_input_value1").val(),
		'message' : $("#message_input_value").val()
	}));

}
