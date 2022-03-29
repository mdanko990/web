let nameInput = document.getElementById('name');
let imageInput = document.getElementById('image');
let timeInput = document.getElementById('time');
let difficultyInput = document.getElementById('difficulty');
let typeInput = document.getElementById('type');
let textareaInput = document.querySelector('input[type]="radio"');
let submitBtn = document.getElementById('submit');
let form = document.getElementById('form');

nameInput.addEventListener('change', validateName);
imageInput.addEventListener('change',validateImage);
timeInput.addEventListener('change', validateTime);
difficultyInput.addEventListener('change', validateDifficulty);
typeInput.addEventListener('change', validateDifficulty);
textareaInput.addEventListener('change', validateTextarea);
submitBtn.addEventListener('click', validation);


function validateName(){
  if(nameInput.value === '' || nameInput.value.length > 50){
    nameInput.style.borderBottomColor = 'red';
  }else{
    nameInput.style.borderBottomColor = 'green';
  }
}


function validateImage(){
  var ext = imageInput.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      console.log('image success');
      return true;
    default:
      imageInput.value = '';
      getError('Choose another type of image: .img .jpeg .png');
  }
}

function validateTime(){
  if(timeInput.value === '--:--' || timeInput.value === ''){
    return false;
  }else{
    return true;
  }
  //console.log(timeInput.value);
}

function validateDifficulty(){
  let opt;
        for ( var i = 0, len = difficultyInput.options.length; i < len; i++ ) {
            opt = difficultyInput.options[i];
            if ( opt.selected === true ) {
                break;
            }
        }
        
  console.log(opt.value);
}

function validateType()
{
  let group = document.radioBlock.type;
  let checked = 0;
  for (var i=0; i<group.length; i++) {
    if (group[i].checked){
      checked++;
    }
  }
  if (checked===0){
    return false;
  }else{
    return true;
  }
}

function validateTextarea(){
  if(textareaInput.innerHTML === ''){
    textareaInput.style.borderColor = 'red';
    return false;
  }else{
    return true;
  }
}

/*if(!validateName() || !validateImage() || !validateTime() || !validateDifficulty() || !validateType() || !validateTextarea()){
  submitBtn.disabled = true;
}else{
  submitBtn.disabled = false;
}
*/