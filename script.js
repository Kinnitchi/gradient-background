const styles = JSON.parse(localStorage.getItem('styles'));

const checkedInput = element => element === '' || element === null;
const checkedFontSize = fontSize =>  (fontSize < 24 || fontSize > 50) ? 24 : fontSize; 
const checkedGraus = graus => (graus < 0 || graus > 365) ? 180 : graus;

const saveToStorage = () => {
    const color1 = document.getElementById('color1').value;
    const color2 = document.getElementById('color2').value;
    const graus = document.getElementById('graus').value;
    const texto = document.getElementById('texto').value;
    const fontColor = document.getElementById('font-color').value;
    const fontSize = document.getElementById('font-size').value;

    if (!checkedInput(graus) && !checkedInput(texto) && !checkedInput(fontSize)) {
        const elements = setElements(color1, color2, checkedGraus(graus), texto, fontColor, checkedFontSize(fontSize));
        localStorage.setItem('styles', JSON.stringify(elements));
        resetInputs();
    } else alert('Preencha todos os campos!');

}

const setElements = (cor1, cor2, graus, texto, fontColor, fontSize) => {
    const obj = {
        cor1,
        cor2,
        graus,
        texto,
        fontColor,
        fontSize
    }

    return obj;
}

const addGradient = () => {
    const body = document.querySelector('body');

   if(styles)
    body.style.backgroundImage = `linear-gradient(${styles.graus}deg, ${styles.cor1}, ${styles.cor2})`;
   else
    body.style.backgroundImage =  `linear-gradient(${190}deg, #90a799, #21554e`;

}

const addAnimation = () => {
    let count = 1.5;

    const container = document.querySelectorAll('.container-content');
    
    for(let item of container){
        item.style.animation = `animation ${1*count}s ease`;
        count+=0.2;
    }
        
    const controlGroup = document.querySelectorAll('.control-group');
    
    for(let item of controlGroup){
        item.style.animation = `animation ${1*count}s ease`;
        count+=0.3;
    }

    const textControl = document.querySelectorAll('.text-control');

    for(let item of textControl){
        item.style.animation = `animation ${1*count}s ease`;
        count+=0.5;
    }

}

const addText = () => {
    const text = document.getElementById('text');
    if(styles){
        text.innerHTML = `${styles.texto}`;
        text.style.fontSize = `${styles.fontSize}px`;
        text.style.color = `${styles.fontColor}`;
    } else {
        text.innerHTML = 'Seu texto aqui';
        text.style.fontSize = '24px';
        text.style.color = '#000';
    }
}

const resetInputs = () => {
    const colorDefault = '#ffffff';
    document.getElementById('color1').value = colorDefault;
    document.getElementById('color2').value = colorDefault;
    document.getElementById('graus').value = '';
    document.getElementById('texto').value = '';
    document.getElementById('font-color').value = colorDefault;
    document.getElementById('font-size').value = '';
}

const app = () => {

    addAnimation();
    addGradient();
    addText();
 
    const add = document.getElementById('added');

    add.addEventListener('click', () => {
        saveToStorage();
        app();
    });

    const reset = document.getElementById('reset');

    reset.addEventListener('click', () => {
     localStorage.clear();
     app();
    });

}

app();