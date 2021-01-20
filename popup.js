const msg = new SpeechSynthesisUtterance();
const voice = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[name="text"]');
const range = document.getElementById("range");
const label = document.getElementById("interval");

function populateVoices(params) {
	voices = this.getVoices();
	voicesDropdown.innerHTML = voices.map((voice) => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join("");
}

function setVoice() {
	msg.voice = voices.find((voice) => voice.name === this.value);
	toggle();
}

function toggle(startOver = true) {
	speechSynthesis.cancel();
	if (startOver) {
		msg.text = document.querySelector(`#clock h3`).textContent;
		speechSynthesis.speak(msg);
	}
}

function setOption() {
	console.log(this.name, this.value);
	msg[this.name] = this.value;
	toggle();
}

function getInterval() {
	return range.value * 1000;
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);

voicesDropdown.addEventListener("change", setVoice);

options.forEach((option) => option.addEventListener("change", setOption));

//clock init

function speakTime() {
	msg.text = document.querySelector(`#clock h3`).textContent;
	speechSynthesis.speak(msg);
	console.log(msg);
}

function showTime() {
	const date = new Date();
	const h = date.getHours();
	const m = date.getMinutes();
	const s = date.getSeconds();

	const clock = `${h < 10 ? 0 : ""}${h}:${m < 10 ? 0 : ""}${m}:${s < 10 ? 0 : ""}${s}`;
	const time = `${h < 10 ? 0 : ""}${h}:${m < 10 ? 0 : ""}${m}`;

	document.querySelector(`#clock h2`).innerText = clock;
	document.querySelector(`#clock h3`).innerText = time;
}

setInterval(showTime, 1000);

var thisInterval = null;

range.addEventListener("input", () => {
	interval.innerText = range.value;
	const mult = range.value * 60000;

	if (thisInterval === null) {
		thisInterval = setInterval(speakTime, mult);
	} else {
		clearInterval(thisInterval);
		thisInterval = setInterval(speakTime, mult);
	}
});

showTime();

setTimeout(() => {
	var e = document.getElementById("voices");
	var strUser = (e.options[e.selectedIndex].text = "loremipsum");
	console.log(strUser);
}, 1000);
