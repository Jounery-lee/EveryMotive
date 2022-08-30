const body = document.querySelector('body')
const modeBtn = document.getElementById('modeBtn')
function changeMode(){
    console.log(modeBtn.value)
    let mode = body.style.backgroundColor
    if(mode === 'bisque'){
        body.style.backgroundColor = 'gray';
    }else{
        body.style.backgroundColor = 'bisque';
    }
    
}

modeBtn.addEventListener('click', changeMode)