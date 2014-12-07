document.onkeydown = KeyCheckKeyDown;
document.onkeyup = KeyCheckKeyUp;

window.onload = function()
                {
                   document.getElementById("imagesrc").src="http://" + window.location.hostname + ":8090/?action=stream";
                };

var checkifactive = false;
var checkdebug = false;
var checkextra = false;
var keyNUM = 00;

var enabledE = false;
var enabledQ = false;

function Reboot(){
	new Ajax.Request('control.py?q=reboot', {method: 'GET'});
	debug_text.value += "Rebooting Device..." + "\n";
	
	document.getElementById('actiontext').innerHTML = 'Current action:';
	var textarea = document.getElementById('debug_text');
	textarea.scrollTop = textarea.scrollHeight- textarea.clientHeight;
}

function ResetTextarea(){

	debug_text.value = '';

}
function ResetOutputs(){
	new Ajax.Request('control.py?q=halt', {method: 'GET'});
	debug_text.value += "FORCE STOP" + "\n";
	
	document.getElementById('actiontext').innerHTML = 'Current action:';
	var textarea = document.getElementById('debug_text');
	textarea.scrollTop = textarea.scrollHeight- textarea.clientHeight;
}
function CamPosi0(){
	new Ajax.Request('control.py?q=posi0', {method: 'GET'});
	debug_text.value += "Cam Posi 0" + "\n";
	
	document.getElementById('actiontext').innerHTML = 'Current action:';
	var textarea = document.getElementById('debug_text');
	textarea.scrollTop = textarea.scrollHeight- textarea.clientHeight;
}
function CamPosi1(){
	new Ajax.Request('control.py?q=posi1', {method: 'GET'});
	debug_text.value += "Cam Posi 1" + "\n";
	
	document.getElementById('actiontext').innerHTML = 'Current action:';
	var textarea = document.getElementById('debug_text');
	textarea.scrollTop = textarea.scrollHeight- textarea.clientHeight;
}

//
// General controls
//

function GoForward(){

	document.getElementById('actiontext').innerHTML = 'Current action: Going Forward';
	document.getElementById('keyboard_button_w').style.backgroundColor='#4D4D4D';
	new Ajax.Request('control.py?q=w', {method: 'GET'});
	debug_text.value += "Current action: Going Forward" + "\n";
}
function TurnLeft(){

	document.getElementById('actiontext').innerHTML = 'Current action: Turning Left';
	document.getElementById('keyboard_button_a').style.backgroundColor='#4D4D4D';
	new Ajax.Request('control.py?q=a', {method: 'GET'});
	debug_text.value += "Current action: Turning Left" + "\n";
}
function Reverse(){

	document.getElementById('actiontext').innerHTML = 'Current action: Reversing';
	document.getElementById('keyboard_button_s').style.backgroundColor='#4D4D4D';
	new Ajax.Request('control.py?q=s', {method: 'GET'});
	debug_text.value += "Current action: Reversing" + "\n";
}
function TurnRight(){

	document.getElementById('actiontext').innerHTML = 'Current action: Turning Right';
	document.getElementById('keyboard_button_d').style.backgroundColor='#4D4D4D';
	new Ajax.Request('control.py?q=d', {method: 'GET'});
	debug_text.value += "Current action: Turning Right" + "\n";
	
}

//
//Using Keyboard
//

function UseQ(){

	document.getElementById('actiontext').innerHTML = 'Current action: Enable Q';
	document.getElementById('keyboard_button_placeholder_q').style.backgroundColor='#4D4D4D';
	new Ajax.Request('control.py?q=q', {method: 'GET'});
	debug_text.value += "Current action: Enable Q" + "\n";
	
}
function UseE(){

	document.getElementById('actiontext').innerHTML = 'Current action: Enable E';
	document.getElementById('keyboard_button_placeholder_e').style.backgroundColor='#4D4D4D';
	document.getElementById('video_stream').style.display='block';
	new Ajax.Request('control.py?q=e', {method: 'GET'});
	debug_text.value += "Current action: Enable E" + "\n";
	
}
function EnableQE(){

	document.getElementById('keyboard_button_placeholder_q').style.backgroundColor='#858585';
	document.getElementById('keyboard_button_placeholder_e').style.backgroundColor='#858585';
	
	document.getElementById('extra_button_text_q').innerHTML = 'Q';
	document.getElementById('extra_button_text_e').innerHTML = 'E';
	
	document.getElementById('keyboard_button_placeholder_q').style.border='1px solid';
	document.getElementById('keyboard_button_placeholder_e').style.border='1px solid';
	
	document.getElementById('extra_button_text_q').style.color='#000000';
	document.getElementById('extra_button_text_e').style.color='#000000';
	document.getElementById('keyboard_button_placeholder_q').style.margin='5px';
	document.getElementById('keyboard_button_placeholder_e').style.margin='5px';
}
function ResetQE(){

	document.getElementById('keyboard_button_placeholder_q').style.backgroundColor='#fff';
	document.getElementById('keyboard_button_placeholder_e').style.backgroundColor='#fff';
	
	document.getElementById('keyboard_button_placeholder_q').style.margin='6px';
	document.getElementById('keyboard_button_placeholder_e').style.margin='6px';
	
	document.getElementById('keyboard_button_placeholder_q').style.border='none';
	document.getElementById('keyboard_button_placeholder_e').style.border='none';
	
	document.getElementById('extra_button_text_q').style.color='#fff';
	document.getElementById('extra_button_text_e').style.color='#fff';
}
function RevertText(){

	document.getElementById('keyboard_button_w').style.backgroundColor='#858585';
	document.getElementById('keyboard_button_a').style.backgroundColor='#858585';
	document.getElementById('keyboard_button_s').style.backgroundColor='#858585';
	document.getElementById('keyboard_button_d').style.backgroundColor='#858585';
	
	new Ajax.Request('control.py?q=release', {method: 'GET'});

}

function KeyCheckKeyDown(){

	var KeyID = event.keyCode;
	
	/*if(KeyID==87 && checkifactive != true) //W
	{
		checkifactive = true;
		keyNUM = event.keyCode;
		GoForward();
	} */

	if(KeyID==65 && checkifactive != true)//A
	{ 
		checkifactive = true;
		keyNUM = event.keyCode;
		TurnLeft();
	}
	
	else if(KeyID==83 && checkifactive != true)//S
	{ 
		checkifactive = true;
		keyNUM = event.keyCode;
		Reverse();
	}
	
	else if(KeyID==68 && checkifactive != true)//D
	{ 
		checkifactive = true;
		keyNUM = event.keyCode;
		TurnRight();
	}
	
	else if(KeyID==81 && checkextra == true)
	{
		if(enabledQ == false)
		{
			UseQ();
			enabledQ = true;
		}

		else if(enabledQ = true)
		{
			document.getElementById('keyboard_button_placeholder_q').style.backgroundColor='#858585';
			new Ajax.Request('control.py?q=q_release', {method: 'GET'});
			enabledQ = false;
			debug_text.value += "Current action: Disable Q" + "\n";
			document.getElementById('actiontext').innerHTML = 'Current action: Disable Q';
		}
	}

	else if(KeyID==69 && checkextra == true)
	{
		if(enabledE == false)
		{
			UseE();
			enabledE = true;
		}
		else if(enabledE = true)
		{
			document.getElementById('keyboard_button_placeholder_e').style.backgroundColor='#858585';
			document.getElementById('video_stream').style.display='none';
			new Ajax.Request('control.py?q=e_release', {method: 'GET'});
			enabledE = false;
			document.getElementById('actiontext').innerHTML = 'Current action: Disable E';
			debug_text.value += "Current action: Disable E" + "\n";
		}
	}

	else if(KeyID==16) //Shift
	{
		if(checkextra == false)
		{
			EnableQE();
			checkextra = true;
		}
		else if(checkextra == true)
		{
			ResetQE();
			document.getElementById('extra_button_text_e').innerHTML = '';
			document.getElementById('extra_button_text_q').innerHTML = '';
			checkextra = false;
		}
	}
	
	else if(KeyID==220) //§§§§
	{	
		if(checkdebug == false)
		{
			document.getElementById('debug').style.display='block';
			checkdebug = true;
		}
		else if(checkdebug == true)
		{
			document.getElementById('debug').style.display='none';
			checkdebug = false;
		}		
	}
	
	var textarea = document.getElementById('debug_text');
	textarea.scrollTop = textarea.scrollHeight- textarea.clientHeight;
}

function KeyCheckKeyUp(){
	var KeyID = event.keyCode;
	
	if(KeyID==keyNUM)
	{
		RevertText();
		checkifactive = false;
		keyNUM == 00;
	}
	
	document.getElementById('actiontext').innerHTML = 'Current action:';
	var textarea = document.getElementById('debug_text');
	textarea.scrollTop = textarea.scrollHeight- textarea.clientHeight;
}