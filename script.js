let inputFile = document.getElementById('input');
let displayImg = document.getElementById('display-img');
const imgNames = document.querySelector('.uploaded-imgs');
const welText = document.querySelector('h4');

inputFile.addEventListener('change', displayImage);

function displayImage() {
	welText.style.display = 'none';

	displayImg.src = URL.createObjectURL(inputFile.files[0]);
	const fileName = inputFile.files[0].name;
	imgNames.innerHTML += `<li> <p>- ${fileName}</p> </li>`;

	const reader = new FileReader();
	reader.readAsDataURL(inputFile.files[0]);
	reader.addEventListener('load', () => {
		saveData(reader.result);
	});
}

function clearAll() {
	if (displayImg.src !== 'user-icon.png') {
		displayImg.src = 'user-icon.png';
		imgNames.innerHTML = '';
		welText.style.display = 'block';
		saveData();
	}
}

function saveData(imgData) {
	localStorage.setItem('displayedImg', imgData);
	localStorage.setItem('displayedImgNames', imgNames.innerHTML);
}

function getData() {
	if (displayImg.src !== 'user-icon.png') {
		displayImg.src = localStorage.getItem('displayedImg');
		imgNames.innerHTML = localStorage.getItem('displayedImgNames');
		if (imgNames.innerHTML != '') {
			welText.style.display = 'none';
		} else {
			displayImg.src = 'user-icon.png';
		}
	}
}
getData();

document.querySelector('.clear-all').addEventListener('click', clearAll);
