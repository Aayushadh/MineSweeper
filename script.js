document.addEventListener('DOMContentLoaded', function () {

    const grid = document.querySelector('.grid');
    let width = 10;
    let bombs = 20;
    let square = [];
    let isGameOver = false;
    // shuffle array to set bombs 

    function shuffle(arra1) {
        let ctr = arra1.length;
        let temp;
        let index;

        // While there are elements in the array
        while (ctr > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * ctr);
            // Decrease ctr by 1
            ctr--;
            // And swap the last element with it
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }

    // creating grid 

    function createGrid() {

        // creating blueprint and assigning bombs

        let bomb = Array(bombs).fill("bomb");
        let safe = Array(100 - bombs).fill("safe");
        let bluePrint = bomb.concat(safe);
        bluePrint = shuffle(bluePrint);
        console.log(bluePrint);



        // adding box to grid
        for (let i = 0; i < 100; i++) {
            let box = document.createElement('div');
            box.id = i;
            box.classList.add(bluePrint[i]);
            grid.appendChild(box);
            square.push(box);
        }

        // adding number to each box
        for (let i = 0; i < 100; i++) {
            let count = 0;
            let isLeft = (i % 10 == 0);
            let isRight = (i % 10 == 9);
            let isTop = (i < 10)
            let isBottom = (i >= 90);


            if ((!isLeft) && square[i - 1].classList.contains('bomb')) count++;
            if ((!isRight) && square[i + 1].classList.contains('bomb')) count++;
            if ((!isBottom) && square[i + 10].classList.contains('bomb')) count++;
            if ((!isTop) && square[i - 10].classList.contains('bomb')) count++;
            if ((!isTop) && (!isRight) && square[i - 10 + 1].classList.contains('bomb')) count++;
            if ((!isBottom) && (!isRight) && square[i + 10 + 1].classList.contains('bomb')) count++;
            if ((!isTop) && (!isLeft) && square[i - 10 - 1].classList.contains('bomb')) count++;
            if ((!isBottom) && (!isLeft) && square[i + 10 - 1].classList.contains('bomb')) count++;
            square[i].setAttribute('data', count);

            // adding event to display number 

            square[i].addEventListener('click', function () {
                clicking(square[i]);
            });




        }

    }

    createGrid();
    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
      }

    function clicking(ele) {
        
        if(isGameOver)return;
        if(ele.classList.contains('clicked'))return;
        if (ele.classList.contains('bomb')) {
          //  alert('game over');
          isGameOver=true;
          for(let r=0;r<100;r++)
          {
              if(square[r].classList.contains('bomb'))
              {
                  square[r].innerHTML="💣";
                  square[r].style.backgroundColor="#FFDEAD";
              }
          }
           
            return;
        } else {
            let total = ele.getAttribute('data');
            ele.classList.add('clicked');
            if (total != 0) {

                ele.innerHTML = total;
                return;
            }
           doCheck(ele);
         
        }
       

    }

    // 

    function doCheck(ele)
    {
     
        setTimeout(()=>{
          
            let i=parseInt(ele.id);
            if(i<0)
            {
                return;
            }
            console.log(i);
            let isLeft = ((i % 10) == 0);
            let isRight = ((i % 10) == 9);
            let isTop = (i < 10)
            let isBottom = (i >= 90);
            
            if ((!isLeft) && square[i - 1].classList.contains('safe')) 
            {
                clicking(square[i-1]);
                
                
            }
            if ((!isRight) && square[i + 1].classList.contains('safe')) 
            {
                clicking(square[i+1]);
                
            }
            if ((!isBottom) && square[i + 10].classList.contains('safe')) 
            {
                clicking(square[i+10]);
                
            }
            if ((!isTop) && square[i - 10].classList.contains('safe')) 
            {
                clicking(square[i-10]);
                
            }
            if ((!isTop) && (!isRight) && square[i - 10 + 1].classList.contains('safe')) 
            {
                clicking(square[i-10+1]);
               
            }
            if ((!isBottom) && (!isRight) && square[i + 10 + 1].classList.contains('safe')) 
            {
                clicking(square[i+10+1]);
                
            }
            if ((!isTop) && (!isLeft) && square[i - 10 - 1].classList.contains('safe')) 
            {
                clicking(square[i-1-10]);
                
            }
            if ((!isBottom) && (!isLeft) && square[i + 10 - 1].classList.contains('safe')) 
            {
                clicking(square[i-1+10]);
                
            }


        },10);
       

        
    }





});