// Import stylesheets
import './style.css';
import './gallery.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Gallery Excercise</h1>`;

//a closure is a function that has scope


function Gallery(gallery){
  if(!gallery){
    throw new Error('No Gallery Champ');
  }
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;
  
  function openModal(){
    console.info('opening modal..');
    //check if modal is open for in and out animation
    if(modal.matches('.open')){
      console.info('model open');
      return;
    }
    modal.classList.add('open');
    //event listeners to be bound on modal open
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }
  function closeModal(){
    modal.classList.remove('open');
    //TODO add event listeners
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e){
    if(e.target === e.currentTarget){
      closeModal();
    }
  }
  function handleKeyUp(event){
    if(event.key === 'Escape') return closeModal();
    if(event.key === 'ArrowRight') return showNextImage();
    if(event.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage(){
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage(){
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(el){
    if(!el){
      console.info('no image to show');
      return ;
    }
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  } 
  
  images.forEach(image => image.addEventListener('click', (e) => showImage(e.currentTarget))
  );
  //loop over every image
  images.forEach(image => {
    //add listener to each
    image.addEventListener('keyup', e => {
      //when key up check if enter key
      if(e.key === 'Enter') {
        // if yes, show image
        showImage(e.currentTarget);
      }
    })
  });

  modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));